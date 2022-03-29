import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Product';
import { ProductSService } from '../product-s.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private actroute:ActivatedRoute,private serv:ProductSService) { }

  product!:Product;
  productId!:any;
 
  ngOnInit(): void {

    this.actroute.paramMap.subscribe(data=>{
     this.productId=data.get('id');
    let products=this.serv.products;
     this.product=products.find(p => p.productId==this.productId) as Product; 
    })
  }

}
