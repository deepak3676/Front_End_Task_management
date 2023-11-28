import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  // Properties for form control and Supabase configuration
  actionLabel: string = '';
  signupForm: FormGroup;

  // Supabase configuration
  supabaseUrl = 'https://rcxluwjznbcobihhsest.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGx1d2p6bmJjb2JpaGhzZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDg4MjAsImV4cCI6MjAxNTAyNDgyMH0.SGP-7qA-eix2uvwSL3wJNO-VCJSTN4gaMy0j2KzWh2s';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);


  // Constructor to initialize form controls
  constructor(private fb: FormBuilder, private route: Router, private _snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
          Validators.pattern(/^[^\s]+$/), // No spaces allowed
        ],
      ],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),
    });

  }

  // Method to handle form submission
  async onSubmit() {
    if (this.signupForm.valid) {
      try {
        // Check if the email already exists
        const emailChecker = await this.supabase
          .from('usertable')
          .select('*')
          .eq('useremail', this.signupForm.value.email)
          .single();

        // Check if the username already exists
        const usernameChecker = await this.supabase
          .from('usertable')
          .select('*')
          .eq('username', this.signupForm.value.userName)
          .single();

        if (emailChecker.data) {
          //alert('Email Already exists');
          this._snackBar.open('Email already exist', 'Close', {
            duration: 3000
          });
        } else if (usernameChecker.data) {
          //alert('Username Already exists');
          this._snackBar.open('UserName already exist', 'Close', {
            duration: 3000
          });
        } else {
          const { data, error } = await this.supabase.auth.signUp({
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
          });

          if (error) {
            alert(error.message);
          } else if (data) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'right';

            this._snackBar.open('Sign Up successful! Please verify your email Address before logging in', 'Close', {
              duration: 3000, // 3 seconds
              ...config, // Spread the config to apply position settings
            });
            const { userName, email, password } = this.signupForm.value;
            this.signUpToSupabase(userName, email, password);
            this.route.navigate(['/login']);
          }
        }
      } catch {
        console.log('error');
      }
    }
  }

  // Method to sign up user to Supabase
  async signUpToSupabase(username: string, useremail: string, password: string) {
    try {
      // Call the Supabase insert method to store user data in a table
      const { data, error } = await this.supabase
        .from('usertable')
        .insert([{ username, useremail, password }])
        .select();

      if (error) {
        console.error('Error inserting data into usertable:', error.message);
      }
    } catch (error) {
      console.error('Error signing up to Supabase:');
    }
  }


  //Custom validation
  customEmailValidator(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value as string;
    // Check if the email starts with only numbers before the @ symbol
    if (/^\d+@/.test(email)) {
      return { 'invalidEmail': true };
    }
    return null;
  }


}