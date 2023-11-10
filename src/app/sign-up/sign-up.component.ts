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

        const { data, error } = await this.supabase.auth.signUp({
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        })
        if (error) {
          alert(error);
        }
        else if (data) {

          const { userName, email, password } = this.signupForm.value;
          this.signUpToSupabase(userName, email, password);

          this.route.navigate(['/login'])
        }
      }
      catch {
        console.log("error");
      }

    }
  }
  async signUpToSupabase(username: string, useremail: string, password: string) {
    // Use your Supabase project URL and API key

    // Call the Supabase insert method to store user data in a table
    const { data, error } = await this.supabase
      .from('usertable')
      .insert([
        { username: username, useremail: useremail, password: password },
      ])
      .select()

  }
}