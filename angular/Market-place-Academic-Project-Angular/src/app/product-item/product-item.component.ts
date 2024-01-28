import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../core/product";
import {ConsumerProductService} from "../services/consumer-product.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {


  @Input() p !:Product;
  @Output() incrementEvent = new EventEmitter()
  @Output() decrementEvent = new EventEmitter()

  @Output() deleteProd = new EventEmitter()
  constructor(private consumerProduct: ConsumerProductService) { }


  ngOnInit(): void {
  }

  sendNotif(){
    this.incrementEvent.emit(this.p)
  }

  sendNotif1(){
    this.decrementEvent.emit(this.p)
  }



  deleteProductt(id: any) {
    this.deleteProd.emit(this.p.id)
  }

}
