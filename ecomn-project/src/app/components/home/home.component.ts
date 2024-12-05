import { Component, OnInit ,viewChild} from '@angular/core';
import { ProductService } from '../../service/product.service';
import { product } from '../../Models/iuser';
import { NgbCarousel, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, FormsModule,CommonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[ProductService]
})
export class HomeComponent implements OnInit{
  popularProduct: undefined | product[];
  trendyProducts: undefined | product[];
  constructor (private product:ProductService) {
    
  }
  ngOnInit(): void {
    this.product.popularProductsE().subscribe((data) => {
      this.popularProduct = data;
    });
    this.product.trendyProducts().subscribe(
      (data) => {
        this.trendyProducts = data;
      }
    );
  }
}
