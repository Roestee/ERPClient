import { CustomerModel } from './customer.model';
import { InvoiceDetailModel } from './invoice-detail.model';

export class InvoiceModel {
  id: string = '';
  invoiceNumber: string = '';
  date: string = '';
  invoiceType: InvoiceType = new InvoiceType();
  invoiceTypeValue: number = 1;
  customerId: string = '';
  customer: CustomerModel = new CustomerModel();
  details: InvoiceDetailModel[] = [];
}

export class InvoiceType {
  value: number = 1;
  name: string = '';
}
