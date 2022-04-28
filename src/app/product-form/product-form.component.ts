import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
// import { ProductService } from "../product.service";

import * as fromApp from '../store/app.reducer'
import * as ProductActions from '../test-table/store/user-side-model.actions'

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });
  }

  onSubmit() {
    // this.prService.addProduct({ ...this.productForm.value });
    this.store.dispatch(ProductActions.startAddProduct({product: {...this.productForm.value}}))
    this.onClear();
  }

  onClear() {
    this.productForm.reset();
  }
}
