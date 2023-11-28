import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Properties to track user login status and username
  loggedIn: boolean = false;
  userName: string = '';

  // Constructor to inject the Router service
  constructor(private route: Router) {}

  // Flag to track user login status
  isLoggedIn = false;

  // Lifecycle hook called after the component is initialized
  ngOnInit() {
    // Check if the user is an admin (replace with your admin email)
    if (localStorage.getItem('userEmail') === 'd.rawat2002@gmail.com') {
      this.isLoggedIn = true;
      this.loggedIn = true;
    } else if (localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }

    // Set the username from local storage
    this.userName = localStorage.getItem('user') || '';
  }

  // Method to handle user logout
  logOut() {
    // Remove user-related data from local storage and navigate to the home route
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    this.route.navigate(['/home']);
  }
}
