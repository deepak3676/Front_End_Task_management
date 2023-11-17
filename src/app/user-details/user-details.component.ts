import { Component } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  userTasks:FormGroup | any;
  dataCame:boolean=false;
constructor(private serve : TaskServiceService, private fb: FormBuilder,private dialog:MatDialog){
  this.userTasks = this.fb.group({
    userName:['',Validators.required],
  });
}
moveToCompleted(_t14: any) {
throw new Error('Method not implemented.');
}
deleteTask(arg0: any) {
throw new Error('Method not implemented.');
}

userTasksDetails:any[]=[]

getUserTasks(use:string){
  
  const userName = encodeURIComponent(use);
  console.log(userName);
  this.serve.getUserTasksDetails(userName).subscribe((result)=>{
    console.log(result);
    this.dataCame=true;
    this.userTasksDetails=result as any;
    
  })
}
editTask(task: any) {
  const dialogRef = this.dialog.open(UpdateDialogComponent, {
 
    width: '400px',
    data: {
      data: task,
      // Add more fields as needed
    },
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      // Handle the result data (new project details)
      console.log('New project data:', result);
      // You can add logic to save the new project data
    }
  });
  }

}
