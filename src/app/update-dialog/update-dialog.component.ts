import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskServiceService } from '../task-service.service';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  isAdminLoggedIn=false;

  updateDetails: FormGroup | any;
  users: any[] = []
  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder, private serve:TaskServiceService) {
    if(localStorage.getItem('user')=='admin'){
      this.isAdminLoggedIn=true;
    }
  }
    ngOnInit() {
    this.loadUsernames(); // Wait for usernames to be loaded
    this.initializeForm();
     this.populateForm();
  }
 
  async loadUsernames() {
    this.users = await this.getAllUsernames();
 // Log the usernames array
  }
  initializeForm() {
    this.updateDetails = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskStartTime: ['', Validators.required],
      taskEndTime: ['', Validators.required],
      userName:['',Validators.required],
    });
  }
  populateForm() {
  
    this.serve.getTaskById(this.data.data.id).subscribe((result) => {
      console.log(result);
      // Assuming result.userName is the default value you want for userName
      const defaultUserName = (result as any).userName;
  
      // Patch the form with the retrieved data and set the default value for userName
      this.updateDetails.patchValue({
        taskName: (result as any).taskName,
        taskDescription: (result as any).taskDescription,
        taskStartTime: (result as any).taskStartTime,
        taskEndTime: (result as any).taskEndTime,
        userName: defaultUserName
      });
    });
  }
  
  onSaveClick(data1:any) {
    data1.id=this.data.data.id;
    this.serve.putData(data1).subscribe((result)=>{
      this.dialogRef.close(result);
    });
    }
 
  onCancelClick() {
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
