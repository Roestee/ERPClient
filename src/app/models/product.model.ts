export class ProductModel {
  id: string = '';
  name: string = '';
  type: ProductType = new ProductType();
  typeValue: number = 1;
}

export class ProductType {
  name: string = '';
  value: number = 1;
}

export const productTypes: ProductType[] = [
  {
    name: 'Mamül',
    value: 1,
  },
  {
    name: 'Yarı Mamül',
    value: 2,
  },
];
