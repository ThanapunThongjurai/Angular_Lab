import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName = ""
  passWord = ""
  isDup = false
  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.httpClient
      .post(`${environment.API_URL}/user/register`, { "userName": this.userName, "passWord": this.passWord })
      .subscribe((res: any) => {
        console.log(res['data']);
        if (res['data'] == 1) {
          console.log(res)
          Swal.fire(
            'Success','ลงทะเบียนสำเร็จ','success'
          )
          this.router.navigate(['/login'])
        }
        else {
          Swal.fire(
            'Error','ลงทะเบียนไม่สำเร็จ','error'
          )
          this.isDup = true;
        }
      })
  }
}
