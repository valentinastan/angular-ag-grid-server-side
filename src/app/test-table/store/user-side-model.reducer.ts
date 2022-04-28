import { Action, createReducer, on } from "@ngrx/store";
import { Product } from "src/app/product.model";
import * as productActions from "./user-side-model.actions";

export interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

const _productReducer = createReducer(
  initialState,
  on(productActions.addProduct, (state, action) => ({
    ...state,
    products: [...state.products, action.product],
  })),

  on(productActions.setProducts, (state, action) => ({
    ...state,
    products: [...action.products],
  })),

  on(productActions.UpdateProductSuccess, (state, action) => ({
    ...state,
    products: state.products.filter((prod) =>
      prod.id === action.product.id ? action.product : prod
    ),
  }))
);

export function productReducer(state: State, action: Action) {
  console.log("action =====", action);
  return _productReducer(state, action);
}
