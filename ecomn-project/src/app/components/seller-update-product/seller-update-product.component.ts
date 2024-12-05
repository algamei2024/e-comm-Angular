import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { product } from '../../Models/iuser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule,HttpClientModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss',
  providers:[ProductService]
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;
  checkIcon = faCheckCircle;
  constructor (private route:ActivatedRoute,private product:ProductService) {
    
  }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
     productId && this.product.getProductById(productId).subscribe(
        (data) => {
           this.productData = data;
        }
      );
  }
  Submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe(
      (result) => {
        this.productMessage = 'product has updated';
      }
    );
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
