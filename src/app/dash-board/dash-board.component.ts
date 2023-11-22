import { Component, Input } from '@angular/core';
import { Task } from '../dataType';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskServiceService } from '../task-service.service';
import { PopupSettings } from "@progress/kendo-angular-dateinputs";
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
 
  
  taskId: number = 0;
  tasks: any[] = [];
  completedTasks: any[] = [];
  isAdminLoggedIn=true;
  isAnyTaskCompleted:boolean=false;
  store3: Date = new Date();
  myuserName: string='';
  userTaskBollean=false;
  
  materialDialog=false;
  //constructor
  constructor(private serve: TaskServiceService, private route : Router,private dialog:MatDialog) {
    this.reloadSite();
  }

  userTaskTab(){
    this.userTaskBollean=true;
  }


  //Functionality 
  deleteTask(data: number) {
    this.isAnyTaskCompleted=false;
    this.serve.delete(data).subscribe((result) => {
      this.reloadSite();
    })

  }
 
  editTask(task: any) {
  const dialogRef = this.dialog.open(UpdateDialogComponent, {
 
    width: '600px',
    data: {
      data: task,
      // Add more fields as needed
    },
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      // Handle the result data (new project details)
      console.log('New project data:', result);
      const index=this.tasks.findIndex(p=>p.id===result.id)
      if(index !== -1)
      {
        this.tasks[index]=result;
      }
      // You can add logic to save the new project data
    }
  });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        console.log('New project data:', result);
        this.tasks.push(result);
        // You can add logic to save the new project data
      }
    });
    this.reloadSite();
  }

user:string=''
    //Reload After every functionality
    reloadSite() {
      if(localStorage.getItem('user')=='admin')
      {
        this.serve.getTaskData().subscribe((result) => {
          this.tasks = result as any;
        })
      }
      else{
        this.isAdminLoggedIn=false;
        this.user=localStorage.getItem('user')||'';
        this.serve.getUserTasksDetails(this.user).subscribe((result)=>{
          this.tasks=result as any;
        })
      }
      
    }
    

    

}

