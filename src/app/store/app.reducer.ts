import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from '../test-table/store/user-side-model.reducer'

export interface AppState {
  products: fromProducts.State
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productReducer
};
