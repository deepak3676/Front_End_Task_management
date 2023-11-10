import { Component, Input } from '@angular/core';
import { Task } from '../dataType';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { PopupSettings } from "@progress/kendo-angular-dateinputs";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  isEditOpen: boolean = false;
  isDialogOpened: boolean = false;
  taskId: number = 0;
  tasks: any[] = [];
  taskDetails: FormGroup
  constructor(private serve: TaskServiceService) {
    this.taskDetails = new FormGroup({
      id: new FormControl(),
      taskName: new FormControl(),
      taskDescription: new FormControl(),
      taskStartTime: new FormControl(new Date(), [Validators.required]),
      taskEndTime: new FormControl(new Date(), [Validators.required]),
      userId: new FormControl(),
    });

    this.reloadSite();
  }
  deleteTask(data: number) {
    this.serve.delete(data).subscribe((result) => {
      this.reloadSite();
    })

  }
  userName: string = ''
  myuserId: number = 0;
  editId: number = 0;
  store1: string = "";
  store2: string = "";
  store3: Date = new Date('2000-01-01');
  editTask(task: any) {

    console.log(task);
    this.editId = task.id
    this.store1 = task.taskName;
    this.store2 = task.taskDescription;
    this.store3 = task.taskStartTime;
    this.myuserId = task.userId;
    this.isEditOpen = true;
    this.isDialogOpened = true;
    this.reloadSite();
  }
  //ends here
  reloadSite() {
    this.serve.getTaskData().subscribe((result) => {
      this.tasks = result as any;
    })
    this.userName = localStorage.getItem('user') || ''
  }
  openDialog() {
    this.isDialogOpened = true;
  }

  closeDialog() {
    this.isEditOpen = false;
    this.isDialogOpened = false;
  }
  updateForm(data: Task) {
    data.userId = 0;
    console.log(data);

    this.serve.putData(data).subscribe((result) => {
    })
    this.isDialogOpened = false;
    this.reloadSite();
  }
  submitForm(data: any) {
    debugger;
    data.id = 0;
    data.userId = 0;
    this.serve.addData(data).subscribe((result) => {

      this.tasks.push(result);

      this.isDialogOpened = false;
    })

  }
  public kendokaAvatar =
    "https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png";


  public popupSettings: PopupSettings = {
    appendTo: "component",
    animate: false,
    popupClass: "crimson",
  };
  receiveId(dataId: number) {

  }

}

