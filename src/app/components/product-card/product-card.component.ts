import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() miProduct!: IProduct;
  @Output() deleteProduct: EventEmitter<String> = new EventEmitter<String>();

  onClickDelete(): void {
    this.deleteProduct.emit(this.miProduct._id);
  }
}
