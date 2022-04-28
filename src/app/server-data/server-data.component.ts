import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


@Component({
  selector: "app-server-data",
  templateUrl: "./server-data.component.html",
  styleUrls: ["./server-data.component.css"],
})
export class ServerDataComponent implements OnInit {
 @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  gridApi;
  gridColumnApi;

  columnDefs;
  defaultColDef;
  components;
  rowBuffer;
  rowSelection;
  rowModelType;
  paginationPageSize;
  pagination;
  private cacheBlockSize;
  cacheOverflowSize;
  maxConcurrentDatasourceRequests;
  infiniteInitialRowCount;
  maxBlocksInCache;
  rowData: [];
  serverSideStoreType: string;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "ID",
        maxWidth: 100,
        valueGetter: "node.id",
        cellRenderer: "loadingRenderer",
      },
      {
        field: "athlete",
        minWidth: 150,
      },
      { field: "age" },
      {
        field: "country",
        minWidth: 150,
      },
      { field: "year" },
      {
        field: "date",
        minWidth: 150,
      },
      {
        field: "sport",
        minWidth: 150,
      },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      minWidth: 100,
    };
    this.components = {
      loadingRenderer: function (params) {
        console.log('LOADING RENDERER', params.value)
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
        }
      },
    };
    this.rowBuffer = 0;
    this.rowSelection = "multiple";
    this.rowModelType = "infinite";
    this.pagination = true;
    this.paginationPageSize = 10;
    this.cacheBlockSize = 10;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
   this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;
  }

  ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data: any) => {
        // console.log('data:',  data.slice(0, 100))
        console.log('THIS IS THE DATA')
        var dataSource = {
          rowCount: null,
          getRows: function (params) {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow
            );
            setTimeout(function () {
              console.log('in settimeout')
              var rowsThisPage = data.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              console.log('rows this page', rowsThisPage, params)
              params.successCallback(rowsThisPage, lastRow);
            }, 5000);
          },
        }
        console.log(params.api.setDatasource);
        params.api.setDatasource(dataSource);
        console.log('ultimul', dataSource)
      });
  }

}



// function createServerSideDatasource(server: any) {
//   console.log(server)
//   return {
//     getRows: function (params: any) {
//       console.log(params)
//       console.log('[Datasource] - rows requested by grid: ', params.request);
//       var response = server.getData(params.request);
//       setTimeout(function () {
//         if (response.success) {
//           params.success({ rowData: response.rows });
//         } else {
//           params.fail();
//         }
//       }, 500);
//     },
//   };
// }

// function createFakeServer(allData: any) {
//   return {
//     getData: function () {
//       var requestedRows = allData.slice();
//       return {
//         success: true,
//         rows: requestedRows,
//       };
//     },
//   };
// }
