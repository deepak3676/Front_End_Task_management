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

  //variables
  isEditOpen: boolean = false;
  isDialogOpened: boolean = false;
  taskId: number = 0;
  tasks: any[] = [];
  completedTasks: any[] = [];
  userName: string = ''
  myuserId: string = '';
  editId: number = 0;
  store1: string = "";
  store2: string = "";
  store3: Date = new Date('2000-01-01');
  taskDetails: FormGroup

  //constructor
  constructor(private serve: TaskServiceService) {
    this.taskDetails = new FormGroup({
      id: new FormControl(),
      taskName: new FormControl(),
      taskDescription: new FormControl(),
      taskStartTime: new FormControl(new Date(), [Validators.required]),
      taskEndTime: new FormControl(new Date(), [Validators.required]),
      userId: new FormControl(),
    });
    this.myuserId=(localStorage.getItem('userId')||'')

    this.reloadSite();
  }


  //Functionality 
  deleteTask(data: number) {
    this.serve.delete(data).subscribe((result) => {
      this.reloadSite();
    })

  }
 
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


  moveToCompleted(task: any){
    const taskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }

    this.completedTasks.push(task);
  }

    //Reload After every functionality
    reloadSite() {
      this.serve.getTaskData().subscribe((result) => {
        
        this.tasks = result as any;
      })
      this.userName = localStorage.getItem('user') || ''
    }

}

