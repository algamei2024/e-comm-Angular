import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import {IUserLogin, IUserSingUp } from '../Models/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  httpOption;
  constructor (private httpClient: HttpClient, private router: Router) { 
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

  }
  userSignUp(data:IUserSingUp) {
    this.httpClient.post('http://localhost:3000/seller', JSON.stringify(data),).pipe(
      retry(3)
    ).subscribe((result) => {
      if (result) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result));
        this.router.navigate(['seller/Home']);
      }
    });
  }
  reloadSeller() {
    if (localStorage.getItem('seller'))
    {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller/Home']);
    }
  }
  userLogin(data:IUserLogin) {
    this.httpClient.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, this.httpOption).subscribe((result) => {
      let dataJson = JSON.stringify(result);
      let dataResult = JSON.parse(dataJson);
      dataJson = JSON.stringify(dataResult[0]);
      if (dataResult && dataResult.length == 1) {
        localStorage.setItem('seller', dataJson);
        this.router.navigate(['seller/Home']);
      }
      else {
        console.warn('failed Login');
        this.isLoginError.emit(true);
      }
    });
  }
}
