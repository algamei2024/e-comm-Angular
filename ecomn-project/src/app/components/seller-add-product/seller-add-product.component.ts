import { Component } from '@angular/core';
import { authGuard } from '../../Gaurds/auth.guard';
import { SellerService } from '../../service/seller.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { product } from '../../Models/iuser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule,FontAwesomeModule,CommonModule,HttpClientModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss',
  providers:[ProductService]
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  checkIcon = faCheckCircle;
  constructor (private product:ProductService) {
    
  }
  Submit(data: product) {
    this.product.addProduct(data).subscribe(
      (result) => {
        console.log(result);
        this.addProductMessage = 'product is added successfully';
      },
      (error) => {
        console.log('product not add');
      }
    );
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
