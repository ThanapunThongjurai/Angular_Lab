import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut(){
    Swal.fire(
      'Success', 'Logout', 'success'
    )
    console.log('logout')
    this.cookie.removeAll()
    this.router.navigate(['/login'])
  }
}
