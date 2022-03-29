import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Product';
import { ProductSService } from '../product-s.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private serv:ProductSService,private route:Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  products!:Product[]
  getProducts(){
    this.serv.get().subscribe(data=>{
      this.products=data;
    })
  }

  productD!:Product
  delete(data:any){
    this.productD=data;
  }
  deletedata(){
      this.serv.deleteProduct(this.productD);
      let del=document.getElementById('cancel3');
      del?.click();
      this.products;
  }

   

  edit(prod:any){
   this.route.navigate(['/update-product',{id:prod.productId}]);
  }

  productName!:string
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
