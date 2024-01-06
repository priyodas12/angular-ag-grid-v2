import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TemplateFormComponent } from '../form/template-form/template-form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { TodoDataComponent } from './todos/todo-data/todo-data.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TemplateFormComponent, HttpClientModule, AgGridModule, TodoDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private gridApi!: any;
  private gridColumnApi!: any;


  rowData!: any[];

  apiUrl: string = 'https://jsonplaceholder.typicode.com/todos'

  public rowDataObservable$!: Observable<any[]>;

  constructor(private http: HttpClient) {

  }

  //column defination 
  public columnDefs: ColDef[] = [
    { headerName: 'UserId', field: 'userId' },
    { headerName: 'ID', field: 'id' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Completed', field: 'completed' },
  ]


  onGridReady(params: any) {
    console.log(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnInit() {
    this.loadData();
  }

  //fetch data from API
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //load data from fetched API on demand.
  loadData() {
    this.rowDataObservable$ = this.getTodos();
    this.rowDataObservable$.subscribe((data) => {
      console.log(data);
      this.rowData = data;
    });
    // console.log("row Data:  " + this.rowData);
  }

}
