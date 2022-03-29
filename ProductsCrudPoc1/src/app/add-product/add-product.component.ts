import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../Product';
import { ProductSService } from '../product-s.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb:FormBuilder,private serv:ProductSService,private route:Router) { }

  productP!:FormGroup
  products!:Product[]
  ngOnInit(): void {
    this.getProducts();

    this.productP=this.fb.group({
      productId:[''],
      productName:['',Validators.required],
      productPrice:['',Validators.required],
      brandName:['',Validators.required],
      manufactureDate:['',Validators.required],
      expiryDate:['',Validators.required]
    },{validator:this.serv.dateLessThan('manufactureDate','expiryDate')})
  }

  addProdut(){
    const prod1:Product={
       productId:this.products.length+1,
       productName:this.productP.value.productName,
       productPrice:this.productP.value.productPrice,
       brandName:this.productP.value.brandName,
       manufactureDate:this.productP.value.manufactureDate,
       expiryDate:this.productP.value.expiryDate
     }


     this.serv.addProduct(prod1);
     const can=document.getElementById('cancel1');
     can?.click();
     this.productP.reset();
     this.getProducts();
 }

 getProducts(){
    this.products=this.serv.products;
 }

 cancelBtn(){
   this.productP.reset();
   this.route.navigate(['/products'])
 }

}
