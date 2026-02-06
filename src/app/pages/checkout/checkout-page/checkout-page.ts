import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { PaymentMethod } from '../../../core/services/payment-method';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage {
  CartData: any;
  TotalPrice: any;
  selectedMethod: any;

   payment_method:any;

  constructor(
    private cartService: CartService,
    private paymentMethod: PaymentMethod
  ){
    
  }

  ngOnInit(){
    this.getPaymentMethod()
    this.getData();
    this.totalPrice();
  }

  getData(){
    this.cartService.getCart().subscribe(
      (respone:any) =>{
        console.log('data cart', respone);
        this.CartData = respone[0]?.product; 
      }
    )
  }


  getPaymentMethod(){
    this.payment_method = this.paymentMethod.getMethods();
    console.log('payment method', this.payment_method)
  }


  //show total price 
  totalPrice(){
    this.TotalPrice = this.cartService.total();
  }


  //increase cart
  increase(p: any) {
    p.qty++;
  }


  //decrease cart
  decrease(p: any) {
    if (p.qty > 0) p.qty--;
  }

  //on input in or de cart
  onQtyChange(event: Event, p: any) {
    const value = Number((event.target as HTMLInputElement).value);
    console.log('qty number', p)

    if (isNaN(value) || value < 0) {
      p.qty = 0;
    } else {
      p.qty = value;
    }
  }


  selectPaymentMethod(method: any) {
    this.selectedMethod = method;
  }

  // get totalItems() {
  //   return this.products.reduce((a, b) => a + b.qty, 0);
  // }

  // get totalPrice() {
  //   return this.products.reduce((a, b) => a + (b.qty * b.price), 0);
  // }
}
