import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authServie: AuthService,
    private router: Router
  ) { }

  onLogout(){
    this.authServie.logout();
    //redirect to homepage after logout
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
