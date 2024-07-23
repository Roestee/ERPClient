import { CustomerModel } from './customer.model';
import { OrderDetailModel } from './order-detail.model';

export class OrderModel {
  id: string = '';
  orderNumber: number = 0;
  orderNumberYear: number = 0;
  number: string = '';
  date: string = '';
  deliveryDate: string = '';
  status: OrderStatus = new OrderStatus();
  customerId: string = '';
  customer: CustomerModel = new CustomerModel();
  details: OrderDetailModel[] = [];
}

export class OrderStatus {
  value: number = 1;
  name: string = '';
}
