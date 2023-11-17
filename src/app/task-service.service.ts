import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './dataType';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  getTaskData() {
    return this.http.get("https://localhost:7242/api/TaskManagement/GetAll");
  }
  delete(id: number) {
    return this.http.delete(`https://localhost:7242/api/TaskManagement/Delete/${id}`)
  }
  addData(data: any) {
    return this.http.post(`https://localhost:7242/api/TaskManagement/Create`, data)
  }
  putData(data: any) {
    return this.http.put(`https://localhost:7242/api/TaskManagement/Update`, data)
  }
  getUserTasksDetails(use:string){
    return this.http.get(`https://localhost:7242/api/TaskManagement/GetByUserName?userName=${use}`)
  }
  getTaskById(use:number){
    return this.http.get(`https://localhost:7242/api/TaskManagement/GetById?Id=${use}`)
  }
}
