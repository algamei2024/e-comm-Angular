import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { authGuard } from '../../Gaurds/auth.guard';
import { SellerService } from '../../service/seller.service';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { product } from '../../Models/iuser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers:[ProductService]
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  constructor (private router:Router,private product:ProductService) {
    
  }
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = JSON.parse(sellerStore || "");
            //console.log(sellerData.name);
              this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
          else {
            this.menuType = 'default';
          }
        }
      }
    }
    );
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  searchProduct(query:KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe(
        (result) => {
          this.product.searchProduct(element.value).subscribe(
            (result) => {
              // if (result.length > 5)
              //   result.length = length;
                
              this.searchResult = result;
            }
          );
        }
      );
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
}
