import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { Task } from '../dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  actionLabel: string = '';

  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }
  supabaseUrl = 'https://rcxluwjznbcobihhsest.supabase.co';
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGx1d2p6bmJjb2JpaGhzZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDg4MjAsImV4cCI6MjAxNTAyNDgyMH0.SGP-7qA-eix2uvwSL3wJNO-VCJSTN4gaMy0j2KzWh2s';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);

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
          alert('Email Already exists');
        } else if (usernameChecker.data) {
          alert('Username Already exists');
        } else {
          const { data, error } = await this.supabase.auth.signUp({
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
          });

          if (error) {
            alert(error.message);
          } else if (data) {
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
}