import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn:boolean=false;
  userName: string = ''
  constructor(private route:Router){}

  isLoggedIn=false;

    ngOnInit(){
      if(localStorage.getItem('userEmail')=='d.rawat2002@gmail.com')
      {
        this.isLoggedIn=true;
        this.loggedIn=true;
      }
      else if(localStorage.getItem('user'))
      {
        this.isLoggedIn=true;
  
      }
      this.userName=(localStorage.getItem('user')||'')
    }
  logOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('userEmail')
    this.route.navigate(['/home']);
  }
}
