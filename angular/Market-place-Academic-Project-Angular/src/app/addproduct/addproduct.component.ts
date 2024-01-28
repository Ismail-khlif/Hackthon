import { Component, OnInit } from '@angular/core';
import {ProductsComponent} from "../products/products.component";
import {Product} from "../core/product";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
import {ConsumerProductService} from "../services/consumer-product.service";


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  product!:Product;


  constructor(private ps:ProductService,private route:Router , private consumerProduct: ConsumerProductService) { }

  ngOnInit(): void {
    this.product = new Product();

  }
  ajouter(product:Product){
    //this.ps.addProduct(product);
    //this.route.navigateByUrl("/products")
    this.product.like = 10;
    this.consumerProduct.PostProduct(this.product).subscribe({
      next:()=>this.route.navigateByUrl("/products")
    })
  }
}
