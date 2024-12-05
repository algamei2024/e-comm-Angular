import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { SellerService } from '../service/seller.service';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor (private sellerService:SellerService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log(this.sellerService.isSellerLoggedIn);
    if (localStorage.getItem('seller'))
    {
      return true;
    }
    return this.sellerService.isSellerLoggedIn;
  }
};
