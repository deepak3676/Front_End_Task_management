import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostgrestError, SupabaseClient, createClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) {
    this.loginForm = this.fb.group({
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  async onSubmit() {

    const supabaseUrl = 'https://rcxluwjznbcobihhsest.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGx1d2p6bmJjb2JpaGhzZXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDg4MjAsImV4cCI6MjAxNTAyNDgyMH0.SGP-7qA-eix2uvwSL3wJNO-VCJSTN4gaMy0j2KzWh2s';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('usertable')
      .select()
      .eq('useremail', this.loginForm.value.useremail)
      .eq('password', this.loginForm.value.password)
      .single();
    if (error && (error as PostgrestError).code !== '23505') {
      console.error('Error fetching user:', error.message);
    }

    if (data) {
      localStorage.setItem('userId',data.id)
      // User found, you can now proceed with the login logic
      localStorage.setItem('user', data.username);
      this.route.navigate(['/dashboard']);
    }
    else {
      // User not found or credentials are incorrect
      console.log('Invalid credentials. Please try again.');
    }
  }
}