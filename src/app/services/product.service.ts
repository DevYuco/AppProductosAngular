import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { PRODUCTS } from '../db/products.db';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private arrProducts: IProduct[];
  private id: number;
  //private apiUrl: String;

  constructor() {
    // this.arrProducts = PRODUCTS;
    this.arrProducts = [];
    this.id = PRODUCTS.length + 1;
    this.loadProducts();
  }
  private loadProducts(): void {
    fetch('https://jsonblob.com/api/1330626915941408768')
      .then((response) => response.json())
      .then((data) => {
        this.arrProducts = data;
      });
  }
  getAllProducts(): IProduct[] {
    return this.arrProducts;
  }
  getProductById(_id: String): IProduct | undefined {
    return this.arrProducts.find((product) => product._id === _id);
  }

  deleteProduct(_id: String): IProduct[] {
    //Buscamos producto
    const productSearch = this.getProductById(_id);
    //Creamos una nueva lista, cuando se cumple la condicion mete ese producto a la lista
    this.arrProducts = this.arrProducts.filter(
      (product) => product !== productSearch
    );
    return this.arrProducts;
  }
}
