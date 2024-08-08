export interface MenuDataType {
  description: string;
  name: string;
  photo: string;
  price: number;
}

export interface CategoriesType {
  category_name: string;
  menu: MenuDataType[];
}

export interface PayloadMenuDataType {
  result: { categories: CategoriesType[] };
  status: string;
}
