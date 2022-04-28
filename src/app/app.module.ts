import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { TestTableComponent } from "./test-table/test-table.component";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";

import "ag-grid-enterprise";
import { ServerDataComponent } from "./server-data/server-data.component";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ServerSideModelComponent } from './server-side-model/server-side-model.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import * as fromApp from './store/app.reducer'
import { EffectsModule } from "@ngrx/effects";
import { ProductEffects } from "./test-table/store/user-side-model.effects";

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    HomeComponent,
    TestTableComponent,
    ServerDataComponent,
    ServerSideModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot(fromApp.appReducer, {}),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    EffectsModule.forRoot([ProductEffects]),
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
