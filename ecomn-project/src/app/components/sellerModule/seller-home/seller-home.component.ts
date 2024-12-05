import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../Models/iuser';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import {faBell } from '@fortawesome/free-solid-svg-icons';
import {faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  //standalone: true,
  //imports: [],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconbell = faBell;
  editIcon = faEdit;
  constructor (private product:ProductService) {
   
  }
  ngOnInit(): void {
    this.product.productList().subscribe(
      (result) => {
        if(result)
        this.productList = result;
      }

    );
  }

  deleteProduct(id:string) {
    this.product.deleteProduct(id).subscribe(
      (result) => {
        if (result)
          this.productMessage = "product is deleted";
      }
    );
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  
}
