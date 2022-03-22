import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {

  constructor(private http:HttpClient) { }

  getProdcuts():Observable<Product[]>{
    return  this.http.get<Product[]>('http://localhost:8989/products/getAll');
   }
 
   addProduct(prod:Product):Observable<Product>{
     return this.http.post<Product>('http://localhost:8989/products/add',prod);
   }
 
   deleteProductById(id:number){
     return  this.http.delete(`http://localhost:8989/products/delete/${id}`);
   }
 
   updateProduct(prod:Product):Observable<Product>{
    return this.http.put<Product>(`http://localhost:8989/products/update`,prod);
  }
   
}
