import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../Gaurds/auth.guard';
import { SellerService } from '../../service/seller.service';
import { ProductService } from '../../service/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const routes: Routes = [
  { path: '', redirectTo: 'seller-auth', pathMatch: 'full' },
  { path: 'seller-auth', component: SellerAuthComponent},
  { path: 'Home', component: SellerHomeComponent,canActivate:[authGuard]},
]

@NgModule({
  declarations: [SellerAuthComponent,SellerHomeComponent],
  imports: [
    FontAwesomeModule,
    CommonModule,FormsModule, HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers:[SellerService,ProductService,authGuard]
})
export class SellerModule { 
}
