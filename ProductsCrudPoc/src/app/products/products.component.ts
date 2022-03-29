import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductslistService } from '../productslist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private serv:ProductslistService,private fb:FormBuilder) { }

  productP!:FormGroup

  productName!:string
  ngOnInit() {
    this.getProducts();

   this.productP=this.fb.group({
     productId:[''],
     productName:['',Validators.required],
     productPrice:['',Validators.required],
     brandName:['',Validators.required],
     manufactureDate:['',Validators.required],
     expiryDate:['',Validators.required]
   }, {validator: this.dateLessThan('manufactureDate', 'expiryDate')})
  }
  products!:Product[]

  getProducts(){
    this.serv.get().subscribe(data=>{
      this.products=data;
    })
  }


  edit(prod:Product){
    this.productP.controls['productId'].setValue(prod.productId);
    this.productP.controls['productName'].setValue(prod.productName);
    this.productP.controls['productPrice'].setValue(prod.productPrice);
    this.productP.controls['brandName'].setValue(prod.brandName);
    this.productP.controls['manufactureDate'].setValue(prod.manufactureDate);
    this.productP.controls['expiryDate'].setValue(prod.expiryDate);
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
      this.getProducts();
  }

  delete(data:any){
    const tt=confirm("are you sure?")
    if(tt){
      this.serv.deleteProduct(data);
    }
   
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

  cancelBtn(){
    this.productP.reset();
  }

  dateLessThan(manufactureDate: string, expiryDate: string) {
    return (group: FormGroup) => {
      let f = group.controls[manufactureDate];
      let t = group.controls[expiryDate];
      if ( (f.value > t.value)){
       t.setErrors({expirydateLess:true})
      }else{
        t.setErrors(null)
      }
    }
}

search(){
  if(this.productName==''){
  
    this.ngOnInit()

  }else{

    this.products = this.products.filter(res=>{

      return res.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());

    })

  }
}

}
