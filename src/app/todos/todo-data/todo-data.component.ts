import { Component } from '@angular/core';
import { TodoSvcService } from '../service/todo-svc.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
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

  public rowDataObservable$!: Observable<any[]>;

  constructor(private todoService: TodoSvcService) {

  }

  public ColumnDefs: ColDef[] = [
    { headerName: 'UserId', field: 'userId' },
    { headerName: 'ID', field: 'id' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Completed', field: 'completed' },
  ]

  ngOnInit() {
    this.rowDataObservable$ = this.todoService.getTodoList();
  }

  getTododListFromService(params: any) {
    console.log(params);
  }

}
