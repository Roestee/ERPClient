import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ProductPipe } from '../pipes/product.pipe';
import {
  ProductModel,
  ProductType,
  productTypes,
} from '../../models/product.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule, ProductPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  createModel: ProductModel = new ProductModel();
  updateModel: ProductModel = new ProductModel();

  search: string = '';
  types = productTypes;

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  constructor(private http: HttpService, private swal: SwalService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.post<ProductModel[]>('Products/GetAll', {}, (res) => {
      this.products = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Products/Create', this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new ProductModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model: ProductModel) {
    this.swal.callSwal(
      'Ürünü Sil?',
      `${model.name} ürünü silmek istiyor musunuz?`,
      () => {
        this.http.post<string>(
          'Products/DeleteById',
          { id: model.id },
          (res) => {
            this.getAll();
            this.swal.callToast(res, 'info');
          }
        );
      }
    );
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Products/Update', this.updateModel, (res) => {
        this.swal.callToast(res, 'info');
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  get(model: ProductModel) {
    this.updateModel = { ...model };
    this.updateModel.typeValue = model.type.value;
  }
}
