import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>([]);


  //get all product list
  getCart() {
    return this.cart$.asObservable();
  }


  //check product has or not
  hasItems() {
    console.log('has item', this.cart$.value.length > 0)
    return this.cart$.value.length > 0;
  }


  //add cart product
  add(product: any) {
    const cart = this.cart$.value;
    const item = cart.find(i => i.product.id === product.id);

    if (item) item.qty++;
    else cart.push({ product: product, qty: 1 });

    this.cart$.next([...cart]);
  }


  //update qty product
  // updateQty(productId: number, qty: number) {
  //   const cart = this.cart$.value.map(i =>
  //     i.product.id === productId ? { ...i, qty } : i
  //   ).filter(i => i.qty > 0);

  //   this.cart$.next(cart);
  // }
  

  updateQty(productId: number, qty: number, productData?: any) {
    let cart = this.cart$.value;
    const index = cart.findIndex(i => i.product.id === productId);

    if (index !== -1) {
      // Update existing product
      cart[0].qty = qty;
    } else if (productData) {
      // Add new product if provided
      cart.push({ product: productData, qty });
    }

    // Remove items with qty 0
    cart = cart.filter(i => i.qty > 0);

    this.cart$.next([...cart]);
  }


  //total price product
  total() {
    const totalPrice = this.cart$.pipe(
      map(items => items.reduce((sum, item) => {
        const price = Number(item.product.price) || 0;
        return sum + (item.qty * price);
      }, 0))
    );
    console.log('total price', totalPrice)
  }


  //count product
  count() {
    return this.cart$.value.reduce((sum, i) => sum + i.qty, 0);
  }


  // Clear all items from cart
  clear() {
    this.cart$.next([]);
    console.log('Cart cleared');
  }

}
