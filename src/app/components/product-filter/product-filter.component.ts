import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  // Emitir evento de filtro
  @Output() applyFilters: EventEmitter<any> = new EventEmitter<any>();

  //Funcion que se ejecuta en el submit donde recogemos la informacion del form
  getDataForm(filterForm: NgForm) {
    this.applyFilters.emit(filterForm.value);
  }
}
