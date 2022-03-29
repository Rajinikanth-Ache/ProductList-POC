import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Product';
import { ProductSService } from '../product-s.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private fb:FormBuilder,private route:Router,private serv:ProductSService,private activ:ActivatedRoute) { }

  product!:Product
  productP!:FormGroup
  id!:any
  ngOnInit(): void {

    this.activ.paramMap.subscribe(data=>{
      this.id=data.get('id');
    let products=this.serv.products;
     this.product=products.find(p => p.productId==this.id) as Product;
    })

    this.productP=this.fb.group({
      productId:[this.product.productId],
      productName:[this.product.productName,Validators.required],
      productPrice:[this.product.productPrice,Validators.required],
      brandName:[this.product.brandName,Validators.required],
      manufactureDate:[this.product.manufactureDate,Validators.required],
      expiryDate:[this.product.expiryDate,Validators.required]
    },{validator:this.serv.dateLessThan('manufactureDate','expiryDate')})
  }

  update(){
    const prod:Product={
      productId:this.productP.get('productId')?.value,
      productName:this.productP.value.productName,
      productPrice:this.productP.value.productPrice,
      brandName:this.productP.value.brandName,
      manufactureDate:this.productP.value.manufactureDate,
      expiryDate:this.productP.value.expiryDate
    }


    this.serv.updateProduct(prod);
    const can=document.getElementById('cancel2');
      can?.click();
      this.productP.reset();
      this.serv.products;
  }

  cancelBtn(){
    this.productP.reset();
    this.route.navigate(['/products'])
  }

}
