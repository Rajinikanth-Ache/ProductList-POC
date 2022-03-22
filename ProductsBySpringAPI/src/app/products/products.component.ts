import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../product';
import { ProductlistService } from '../productlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private serv:ProductlistService,private fb:FormBuilder) { }

  products:any;

  productDet!:FormGroup;
  ngOnInit(){
    this.getProducts();

    this.productDet=this.fb.group({
      id:[''],
      name:[''],
      price:[''],
      brandName:[''],
      manufactureDate:[''],
      expiryDate:['']
    })
   }

   getProducts(){
    this.serv.getProdcuts().subscribe(data=>{
       this.products=data;

    })
  }

  addProduct(){
    const prod:Product={
        name:this.productDet.value.name,
        price:this.productDet.value.price,
        brandName:this.productDet.value.brandName,
        manufactureDate:this.productDet.value.manufactureDate,
        expiryDate:this.productDet.value.expiryDate
    }

    this.serv.addProduct(prod).subscribe(data=>{
      console.log(data),
      alert("product added successfully");
      const can=document.getElementById('cancel');
      can?.click();
      this.productDet.reset();
      this.getProducts();
    },
    err=>{
      alert("something went wrong");
    })
  }

  delete(prod:any){
    this.serv.deleteProductById(prod.id).subscribe(
      res=>{
        alert("product deleted successfully"),
        this.getProducts();
      }
    )
  }
  
  edit(prod:Product){
    this.productDet.controls['id'].setValue(prod.id);
    this.productDet.controls['name'].setValue(prod.name);
    this.productDet.controls['price'].setValue(prod.price);
    this.productDet.controls['brandName'].setValue(prod.brandName);
    this.productDet.controls['manufactureDate'].setValue(prod.manufactureDate);
    this.productDet.controls['expiryDate'].setValue(prod.expiryDate);
  }

  updateProduct(){
    const prod:Product={
      id:this.productDet.get('id')?.value,
      name:this.productDet.value.name,
      price:this.productDet.value.price,
      brandName:this.productDet.value.brandName,
      manufactureDate:this.productDet.value.manufactureDate,
      expiryDate:this.productDet.value.expiryDate
    }

    this.serv.updateProduct(prod).subscribe(
      res=>{
        alert("updated sucessfully");
        const can=document.getElementById('cancel1');
        can?.click();
        this.productDet.reset();
        this.getProducts();
      },
      err=>{
        console.log("something is wrong");
      }
    )
  }


}
