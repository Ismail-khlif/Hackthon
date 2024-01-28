import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../core/product";

@Injectable({
  providedIn: 'root',

})
export class ConsumerProductService {

  url:String ="http://localhost:3000/products";
  constructor(private http:HttpClient) { }


  GetProducts(){
    return this.http.get<Product[]>(this.url+"");
  }

  PostProduct(product : Product){
    return this.http.post(this.url+"",product)
  }

  DeleteProduct(id : number){

    return this.http.delete(this.url+"/"+id)
  }

  UpdateProduct(product :Product, id:number){
    return this.http.put(this.url+"/"+id,product)
  }
}
