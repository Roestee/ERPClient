import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { SharedModule } from '../../modules/shared.module';
import { OrderPipe } from '../pipes/order.pipe';
import { CustomerModel } from '../../models/customer.model';
import { ProductModel } from '../../models/product.model';
import { OrderDetailModel } from '../../models/order-detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule, OrderPipe],
  providers: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: OrderModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  createModel: OrderModel = new OrderModel();
  updateModel: OrderModel = new OrderModel();
  detail: OrderDetailModel = new OrderDetailModel();

  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private date: DatePipe
  ) {
    this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
    this.createModel.deliveryDate =
      this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllProducts();
    this.getAllCustomers();
  }

  addDetail() {
    const product = this.products.find((x) => x.id === this.detail.productId);
    if (product) {
      this.detail.product = product;
    }

    this.createModel.details.push(this.detail);
    this.detail = new OrderDetailModel();
  }

  removeDetail(index: number) {
    this.createModel.details.splice(index, 1);
  }

  getAll() {
    this.http.post<OrderModel[]>('Orders/GetAll', {}, (res) => {
      this.orders = res;
    });
  }

  getAllProducts() {
    this.http.post<ProductModel[]>('Products/GetAll', {}, (res) => {
      this.products = res;
    });
  }

  getAllCustomers() {
    this.http.post<CustomerModel[]>('Customers/GetAll', {}, (res) => {
      this.customers = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Orders/Create', this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new OrderModel();
        this.createModel.date =
          this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
        this.createModel.deliveryDate =
          this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model: OrderModel) {
    this.swal.callSwal(
      'Siparişi Sil?',
      `${model.customer.name} - ${model.number} numaralı siparişi silmek istiyor musunuz?`,
      () => {
        this.http.post<string>('Orders/DeleteById', { id: model.id }, (res) => {
          this.getAll();
          this.swal.callToast(res, 'info');
        });
      }
    );
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Orders/Update', this.updateModel, (res) => {
        this.swal.callToast(res, 'info');
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  get(model: OrderModel) {
    this.updateModel = { ...model };
  }
}
