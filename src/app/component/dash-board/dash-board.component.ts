// Importing Angular modules and components
import { Component, Input } from '@angular/core';
import { TaskServiceService } from '../../services/task-service.service';
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
  isAdminLoggedIn = true;
  isAnyTaskCompleted = false;
  store3: Date = new Date();
  myuserName: string = '';
  userTaskBoolean = false;

  materialDialog = false;

  // Constructor
  constructor(private serve: TaskServiceService, private route: Router, private dialog: MatDialog) {
    this.reloadSite();
  }

  // Toggle to show user-specific tasks
  userTaskTab() {
    this.userTaskBoolean = true;
  }

  // Function to delete a task
  deleteTask(data: number) {
    this.isAnyTaskCompleted = false;
    this.serve.delete(data).subscribe((result) => {
      this.reloadSite();
    });
  }

  // Function to edit a task
  editTask(task: any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px',
      data: {
        data: task,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        const index = this.tasks.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.tasks[index] = result;
        }
      }
    });
  }

  // Function to open a dialog for adding a new task
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        this.tasks.push(result);
      }
    });

    this.reloadSite();
  }

  user: string = '';

  // Reload site data after every functionality
  reloadSite() {
    if (localStorage.getItem('user') == 'admin') {
      this.serve.getTaskData().subscribe((result) => {
        this.tasks = result as any;
      });
    } else {
      this.isAdminLoggedIn = false;
      this.user = localStorage.getItem('user') || '';
      this.serve.getUserTasksDetails(this.user).subscribe((result) => {
        this.tasks = result as any;
      });
    }
  }
}
