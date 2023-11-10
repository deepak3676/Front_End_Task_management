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
  onSubmit() {
    if (this.signupForm.valid) {
      const { userName, email, password } = this.signupForm.value;

      // Call a function to save the data to Supabase
      this.signUpToSupabase(userName, email, password);

      this.route.navigate(['/login'])
    }
  }
  async signUpToSupabase(username: string, useremail: string, password: string) {
    // Use your Supabase project URL and API key
    const supabaseUrl = 'https://rcxluwjznbcobihhsest.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGx1d2p6bmJjb2JpaGhzZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDg4MjAsImV4cCI6MjAxNTAyNDgyMH0.SGP-7qA-eix2uvwSL3wJNO-VCJSTN4gaMy0j2KzWh2s';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call the Supabase insert method to store user data in a table
    const { data, error } = await supabase
      .from('usertable')
      .insert([
        { username: username, useremail: useremail, password: password },
      ])
      .select()

  }
}