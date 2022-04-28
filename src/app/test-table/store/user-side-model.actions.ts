import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/product.model";

export const startAddProduct = createAction(
  '[Product] Start Add Product',
  props<{
    product: Product
  }>()
)

export const addProduct = createAction(
  '[Product] Add Product',
  props<{
    product: Product
  }>()
)

export const fetchProducts = createAction(
  '[Product] Fetch Products'
)

export const setProducts = createAction(
  '[Product] Set Products',
  props<{
    products: Product[]
  }>()
)

export const UpdateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{
    product: Product
  }>()
)

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{
    product: Product
  }>()
)
