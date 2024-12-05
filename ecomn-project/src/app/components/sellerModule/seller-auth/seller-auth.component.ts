//import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { SellerService } from '../../../service/seller.service';
//import { HttpClientModule } from '@angular/common/http';
import {IUserLogin, IUserSingUp } from '../../../Models/iuser';

@Component({
  selector: 'app-seller-auth',
  //standalone: true,
  //imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss',
  providers: [SellerService]
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor (private sellerService: SellerService
  ) {

  }
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }
  openLogOrSign() {
    this.showLogin = !this.showLogin;
  }
  signUp(seller: IUserSingUp): void {
    this.sellerService.userSignUp(seller);
  }
  login(seller: IUserLogin) {
    this.sellerService.userLogin(seller);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not correct';
      }
    });
  }
}
