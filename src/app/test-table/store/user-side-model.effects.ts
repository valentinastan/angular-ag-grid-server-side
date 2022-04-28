import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Product } from "src/app/product.model";
import * as fromApp from "../../store/app.reducer";
import * as ProductActions from "./user-side-model.actions";

@Injectable()
export class ProductEffects {
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.fetchProducts),
      switchMap(() => {
        return this.http.get<Product[]>(
          "https://angularaggridproject-default-rtdb.europe-west1.firebasedatabase.app/products.json"
        );
      }),
      map((products) => {
        if (products !== null) {
          return Object.keys(products).map((key) => {
            return {
              id: key,
              ...products[key],
            };
          });
        } else return [];
      }),
      map((productsWithId) => {
        return ProductActions.setProducts({ products: productsWithId });
      })
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.startAddProduct),
      switchMap((actionData: { product: Product }) => {
        console.log("request", actionData);
        return this.http
          .post(
            "https://angularaggridproject-default-rtdb.europe-west1.firebasedatabase.app/products.json",
            actionData.product
          )
          .pipe(
            map((productId: { name: string }) => {
              console.log("response", productId);
              let createdProduct = {
                ...actionData.product,
                id: productId.name,
              };
              return ProductActions.addProduct({ product: createdProduct });
            })
          );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap((actionData) => {
        console.log("dates update", actionData);
        return this.http
          .put<Product>(
            `https://angularaggridproject-default-rtdb.europe-west1.firebasedatabase.app/products/${actionData.product.id}.json/`,
            {
              name: actionData.product.name,
              price: actionData.product.price
            }
          )
          .pipe(
            // withLatestFrom(actionData.product),
            map((updatedData: Product) => {
              return ProductActions.UpdateProductSuccess({
                product: {
                  ...updatedData,
                  id: actionData.product.id
                }
              })
            })
          );
      })
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
