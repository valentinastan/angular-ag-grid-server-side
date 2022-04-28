import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ServerDataComponent } from "./server-data/server-data.component";
import { ServerSideModelComponent } from "./server-side-model/server-side-model.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "data", component: ServerSideModelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
