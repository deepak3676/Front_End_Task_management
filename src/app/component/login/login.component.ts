import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostgrestError, SupabaseClient, createClient } from '@supabase/supabase-js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = ''
  invalidCredentials: boolean = false;
  loginForm: FormGroup;

  // Constructor to initialize form and check if the user is already logged in
  constructor(private fb: FormBuilder, private route: Router, private _snackBar: MatSnackBar) {
    // Redirect to the dashboard if the user is already logged in
    if (localStorage.getItem('userId')) {
      route.navigate(['dashboard']);
    }

    // Initialize login form with form controls and validation
    this.loginForm = this.fb.group({
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  // Method to handle form submission
  async onSubmit() {
    // Supabase configuration
    const supabaseUrl = 'https://rcxluwjznbcobihhsest.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGx1d2p6bmJjb2JpaGhzZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDg4MjAsImV4cCI6MjAxNTAyNDgyMH0.SGP-7qA-eix2uvwSL3wJNO-VCJSTN4gaMy0j2KzWh2s';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.loginForm.value.useremail,
      password: this.loginForm.value.password
    })
    // Handle authentication result
    if (data) {

      // Fetch user data from the database
      const { data, error } = await supabase
        .from('usertable')
        .select()
        .eq('useremail', this.loginForm.value.useremail)
        .eq('password',this.loginForm.value.password)
        .single();
      // Handle database fetch result
      if (error && (error as PostgrestError).code !== '23505') {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
      else {
        //SnackBar
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';

        const snackbarRef = this._snackBar.open('Log In successful!', 'Close', {
          ...config,
        });
        setTimeout(() => {
          snackbarRef.dismiss();
        }, 3000);
        // Store user data in local storage and navigate to the default route
        localStorage.setItem('user', data.username);
        localStorage.setItem('userEmail', data.useremail);
        this.route.navigate(['/default']);
      }
    }
    else {
      // Handle authentication failure
      alert('Invalid credentials. Please try again.');
    }
  }
}