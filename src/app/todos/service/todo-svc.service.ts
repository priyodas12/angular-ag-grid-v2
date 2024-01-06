import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoSvcService {

  todoApi: string = 'https://jsonplaceholder.typicode.com/todos'

  todoList!: Observable<any[]>;

  constructor(private http: HttpClient) {

  }

  getTodoList() {
    this.todoList = this.http.get<any[]>(this.todoApi);
    console.log(this.todoList.forEach(data => {
      console.log(data);
    }));
    return this.todoList;
  }
}
