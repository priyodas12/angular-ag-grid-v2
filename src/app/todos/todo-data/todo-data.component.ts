import { Component, ViewChild } from '@angular/core';
import { TodoSvcService } from '../service/todo-svc.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-data',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './todo-data.component.html',
  styleUrl: './todo-data.component.css'
})
export class TodoDataComponent {

  rowData!: any[];

  @ViewChild(AgGridAngular)
  agGrid!: AgGridAngular;

  public rowDataObservable$!: Observable<any[]>;

  constructor(private todoService: TodoSvcService) {

  }

  public columnDefinitions: ColDef[] = [
    { headerName: 'UserId', field: 'userId' },
    { headerName: 'ID', field: 'id' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Completed', field: 'completed' },
  ]

  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  }

  ngOnInit() {
    this.rowDataObservable$ = this.todoService.getTodoList();
  }

  getTododListFromService(params: any) {
    this.rowDataObservable$.subscribe(data => {
      this.rowData = data;
    })
    console.log(params);
  }

  onCellClickEvent(e: CellClickedEvent) {
    console.log(e);
  }

  clearSelection() {
    console.log(this.agGrid);
    this.agGrid.api.deselectAll();
  }

}