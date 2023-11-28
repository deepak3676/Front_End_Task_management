import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private route: Router) { }
  pageSelection()
  {
    if (localStorage.getItem('user')) {
      //if user already logged in Redirect to dashboard
      this.route.navigate(['/dashboard'])
    }
    else{
      this.route.navigate(['/signUp'])
    }
  }
}
