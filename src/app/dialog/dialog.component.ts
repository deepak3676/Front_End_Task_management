import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { TaskServiceService } from '../task-service.service';
import { createClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  taskDetails: FormGroup | any;
  users: any[] = []
  isAdminLoggedIn=false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private serve: TaskServiceService
  ) {
    this.taskDetails = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskStartTime: ['', Validators.required],
      taskEndTime: ['', Validators.required],
      userName: ['', Validators.required],
    });
    this.loadUsernames();
    
  }

  async loadUsernames() {
    this.users = await this.getAllUsernames();
  }
  onSaveClick(data: any) {

    this.serve.addData(data).subscribe((result) => {
      console.log(result);
      
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
    console.log(usernames);
  
    return usernames;
  }
  


}
