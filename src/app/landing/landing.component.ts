import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  detail = ""
  name = ""
  price: number | undefined;
  productId: number | undefined;
  //userId = ""

  productList = []
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.cookie.get('token') != null) {
      console.log('have key ' + this.cookie.get('token'))
      this.httpClient
        .post(`${environment.API_URL}/product/list`, {}, { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } })
        .subscribe((res: any) => {
          console.log(res)
          this.productList = res.data
        })
    }
    else {
      console.log('not have key ')
      this.router.navigate(['/login'])
    }



  }
  onAdd() {
    this.httpClient
      .post(`${environment.API_URL}/product/save`, {
        "detail": this.detail,
        "name": this.name,
        "price": this.price,
        "productId": this.productId
      }, { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } })
      .subscribe((res: any) => {
        console.log(res['status']);
        Swal.fire(
          'Success','บันทึกสำเร็จ','success'
        )
        if (res['status'] == "0") {
          //reload page
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }
      })
  }
  onDetail(product: any) {
    console.log(product);
    let productId = product.productId
    this.httpClient
      .post(`${environment.API_URL}/product/detail`,
        productId
        , { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } })
      .subscribe((res: any) => {
        console.log(res)
        let mes = 'productId: ' + res.data.productId + '\n'
        mes += 'name: ' + res.data.name + '\n'
        mes += 'price: ' + res.data.price + '\n'
        mes += 'detail: ' + res.data.detail
        Swal.fire(mes)
      })

  }
}
