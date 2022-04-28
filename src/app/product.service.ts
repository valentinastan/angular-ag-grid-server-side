// import { Injectable } from "@angular/core";
// import { Subject } from "rxjs";
// import { Product } from "./product.model";

// @Injectable({ providedIn: "root" })
// export class ProductService {
//   newProductAdded = new Subject<Product>();
//   private products: Product[] = [
//     {
//       name: "Milk",
//       price: 7.99,
//     },
//     {
//       name: "Cheese",
//       price: 14.99,
//     },
//     {
//       name: "Cheese",
//       price: 19.99,
//     },
//   ];

//   constructor() {}

//   addProduct(product: Product) {
//     this.products.push(product);
//     this.newProductAdded.next(product);
//   }

//   getProducts() {
//     return [...this.products];
//   }
// }
