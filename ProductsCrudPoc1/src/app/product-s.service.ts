import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductSService {

  constructor() { }

  products:Array<Product>=[
    {
      productId:1,
      productName:"coconut oil",
      productPrice:100.00,
      brandName:"parachute",
      manufactureDate:'2022-09-14',
      expiryDate:"2022-09-16"
    },
    {
      productId:2,
      productName:"laptop",
      productPrice:100000.00,
      brandName:"dell",
      manufactureDate:"2022-03-16",
      expiryDate:"2043-09-16"
    }

  ]

  get(){
    return of(this.products)
  }

  addProduct(product:Product){
    this.products.push(product);
  }

  updateProduct(product:Product){
    const index=this.products.findIndex(prod=>product.productId===prod.productId);
    this.products[index]=product;
  }

  deleteProduct(product:Product){
    this.products.splice(this.products.indexOf(product),1);
  }


  dateLessThan(manufactureDate:string,expiryDate:string){
    return(group:FormGroup)=>{
      let man=group.controls[manufactureDate];
      let exp=group.controls[expiryDate];
      if(man.value>exp.value){
        exp.setErrors({expirydateLess:true})
      }else{
        exp.setErrors(null);
      }
    }
  }
}
