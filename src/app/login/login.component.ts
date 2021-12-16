import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = ""
  passWord = ""
  isDup = false
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onRegister() {
    this.httpClient
      .post(`${environment.API_URL}/auth/login`, { "userName": this.userName, "passWord": this.passWord })
      .subscribe((res: any) => {
        console.log(res['data']);
        console.log(res['data']);
        if (res['data']['loginStatus'] === "0") {
          this.cookie.put('token', res.data.token)
          console.log(res.data.token)
          Swal.fire(
            'Success','เข้าสู่ระบบสำเร็จ','success'
          )
          this.router.navigate(['/landing'])
        }
        else {
          Swal.fire(
            'Error','เข้าสู่ระบบไม่สำเร็จ','error'
          )
          this.isDup = true;
        }
      })
  }

}
