import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './dataType';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  getTaskData() {
    return this.http.get("https://localhost:7242/api/TaskManagement/GetAllTask");
  }
  delete(id: number) {
    return this.http.delete(`https://localhost:7242/api/TaskManagement/Delete/${id}`)
  }
  addData(data: any) {
    return this.http.post(`https://localhost:7242/api/TaskManagement/CreateTask`, data)
  }
  putData(data: any) {
    return this.http.put(`https://localhost:7242/api/TaskManagement/UpdateStudent`, data)
  }
}
