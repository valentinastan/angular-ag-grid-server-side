import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FakeServer } from './fakeServer'


@Component({
  selector: 'app-server-side-model',
  templateUrl: './server-side-model.component.html',
  styleUrls: ['./server-side-model.component.css']
})
export class ServerSideModelComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowModelType;
  private serverSideStoreType;
  private paginationPageSize;
  private cacheBlockSize;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'id',
        maxWidth: 75,
      },
      {
        field: 'athlete',
        minWidth: 190,
      },
      { field: 'age' },
      { field: 'year' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 90,
      resizable: true,
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.paginationPageSize = 10;
    this.cacheBlockSize = 10;
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data: any) => {
        var idSequence = 1;
        data.forEach(function (item) {
          item.id = idSequence++;
        });
        var fakeServer = FakeServer(data);
        var datasource = ServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
      });
  }

}

function ServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 200);
    },
  };
}
