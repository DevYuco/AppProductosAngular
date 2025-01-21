import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-insert-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insert-product.component.html',
  styleUrl: './insert-product.component.css',
})
export class InsertProductComponent {
  modelForm!: FormGroup<any>;

  constructor() {
    this.modelForm = new FormGroup({
      name: new FormControl(null, []),
      description: new FormControl(null, []),
      price: new FormControl(0, []),
      category: new FormControl(null, []),
      image: new FormControl(null, []),
    });
  }
  getDataForm() {
    let product: IProduct = this.modelForm.value as IProduct;
    this.modelForm.reset();
  }
}
