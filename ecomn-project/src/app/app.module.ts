import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { authGuard } from './Gaurds/auth.guard';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SellerService } from './service/seller.service';
import { HttpClientModule } from '@angular/common/http';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';

const routes: Routes = [
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate:[authGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate:[authGuard],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers:[authGuard,SellerService]
})
export class AppModule { }
