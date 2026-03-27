export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  imagePublicId?: string;
}

export type UpdateProductInput = {
  id: string;
  data: FormData;
};
