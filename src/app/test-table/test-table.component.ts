import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { Subscription } from "rxjs";
import { AgGridAngular } from "ag-grid-angular";
// import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { ColDef } from "ag-grid-community";

import * as productActions from "../test-table/store/user-side-model.actions";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-test-table",
  templateUrl: "./test-table.component.html",
  styleUrls: ["./test-table.component.css"],
})
export class TestTableComponent implements OnInit, OnDestroy {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  rowData: Product[];
  subcription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: "name",
      rowGroup: true,
      hide: true,
    },
    {
      headerName: "Price",
      field: "price",
      filter: "agNumberColumnFilter",
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    floatingFilter: true,
    sortable: true,
    filter: true,
    editable: true,
    singleClickEdit: true,
  };

  autoGroupColumnDef: ColDef = {
    headerName: "Name",
    field: "name",
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      checkbox: true,
    },
    filter: "agTextColumnFilter",
    filterValueGetter: (params) => params.data.name,
  };

  groupDisplayType: "multipleColumns";
  groupMaintainOrder: true;
  animateRows: true;

  ngOnInit() {
    this.store.dispatch(productActions.fetchProducts());
    this.subcription = this.store
      .select("products")
      .subscribe((storeData) => (this.rowData = [...storeData.products]));
    // this.rowData = this.prService.getProducts();
    // this.subcription = this.prService.newProductAdded.subscribe(
    //   (newProduct: Product) => {
    //     this.rowData = [...this.rowData, newProduct];
    //   }
    // );
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.name} ${node.price}`)
      .join(", ");

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onBtExport() {
    const selectedOnlyInput = document.getElementById(
      "selectedOnly"
    ) as HTMLInputElement;

    this.agGrid.api.exportDataAsExcel({
      onlySelected: selectedOnlyInput.checked,
    });
  }

  getContextMenuItems(params) {
    console.log("params", params);
    var result = [
      {
        name: "Alert " + params.value,
        action: function () {
          window.alert("Alerting about " + params.value);
        },
        cssClasses: ["redFont", "bold"],
      },
      {
        name: "More info",
        subMenu: Object.keys(params.node.data)
          .filter(
            (key: string) => key !== params.column.colDef.field && key !== "id"
          )
          .map((key: string) => {
            return { name: key.toUpperCase() + ": " + params.node.data[key] };
          }),
      },
      "separator",
      "expandAll",
      "copy",
      "separator",
      "export",
      "separator",
      "chartRange",
    ];
    return result;
  }

  onCellValueChanged(event) {
    console.log("Data after change is", event.data);
    console.log(event)

    if (!isNaN(Number(event.data.price)) && event.data.price > 0 && event.data.name !== '') {
      this.store.dispatch(
        productActions.updateProduct({
          product: {
            ...event.data,
            price: Number(event.data.price),
          },
        })
      );
    } else {
      event.api.undoCellEditing();
      alert("Price is not a Number");
    }
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}

// meniu cu 2 optiuni (routing)
//1)o opt: gridul, meniu cu afiseaza
//2)un grid: server side loading (inreg lor) - la vertical scroll se incarca si mai multe rows
//-nu treb sa fie grupat
// +paginare
//ag grid entreprise :
// -la click dreapta se afis un meniu contextual in functie de linia din tabel selectata (contextual)
// -buton export => excel, csv, etc

//pt meniu: angular-material

//IN PLUS:
//serviciu rest free
//call uri catre service, cu async
