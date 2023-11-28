import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { TaskServiceService } from '../../services/task-service.service';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { createClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  taskDetails: FormGroup | any;
  users: any[] = []
  isAdminLoggedIn = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private serve: TaskServiceService
  ) {
    // Initialize form controls
    this.taskDetails = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskStartTime: ['', Validators.required],
      taskEndTime: ['', Validators.required],
      userName: ['', Validators.required],
    });
    // Load usernames based on user role
    this.loadUsernames();

  }

  async loadUsernames() {
    const isAdmin = localStorage.getItem('user') === 'admin';

    if (isAdmin) {
      this.users = await this.getAllUsernames();
    } else {
      const currentUser = localStorage.getItem('user');
      // If not admin, set the current user as the only option
      this.users = [{ value: currentUser, viewValue: currentUser }];
      // Set the initial value of the "userName" form control
      this.taskDetails.patchValue({ userName: currentUser });
      // Disable the dropdown for non-admin users
      this.taskDetails.get('userName')
    }
  }


  onSaveClick(data: any) {
    // Save data and close the dialog
    this.serve.addData(data).subscribe((result) => {
      this.dialogRef.close(result);
    });

  }


  onCancelClick() {
    // Close the dialog without saving
    this.dialogRef.close();
  }


  async getAllUsernames(): Promise<any[]> {
    const supabaseUrl = 'https://rcxluwjznbcobihhsest.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGx1d2p6bmJjb2JpaGhzZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDg4MjAsImV4cCI6MjAxNTAyNDgyMH0.SGP-7qA-eix2uvwSL3wJNO-VCJSTN4gaMy0j2KzWh2s'; // Replace with your Supabase key
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: users, error } = await supabase
      .from('usertable')
      .select('username');

    if (error) {
      console.error('Error fetching users:', error.message);
      return [];
    }

    const usernames = users.map(user => ({ value: user.username, viewValue: user.username }));
    if (localStorage.getItem('user') === 'admin') {
      this.users = usernames;
    } else {
      // If not admin, set the current user
      this.users = [localStorage.getItem('user')];
    }
    return this.users;
  }
}