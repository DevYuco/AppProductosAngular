import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { IFilter } from '../../interfaces/ifilter';
import { InsertProductComponent } from '../insert-product/insert-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    ProductFilterComponent,
    InsertProductComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: IProduct[];
  // Inyectar el servicio
  private productService = inject(ProductService);
  isFormFilterVisible: boolean = false;
  isFormAltaVisible: boolean = false;

  constructor() {
    this.products = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.products = this.productService.getAllProducts();
    }, 150); // Retraso para no tener que implementar promesas
  }

  onDeleteProduct(productId: String): void {
    this.products = this.productService.deleteProduct(productId);
  }

  onApplyFilters(filter: IFilter): void {
    const { name, category, minPrice, maxPrice, active } = filter;
    // const myUUID = crypto.randomUUID();
    // console.log('Generated UUID:', myUUID);
    // function generateCustomId(): string {
    //   return Array.from(crypto.getRandomValues(new Uint8Array(12)))
    //     .map((byte) => byte.toString(16).padStart(2, '0'))
    //     .join('');
    // }

    // Ejemplo de uso
    // const newId = generateCustomId();a
    // console.log('Generated ID:', newId);
    //Rellenamos el array por cada busqueda
    this.products = this.productService.getAllProducts();

    // Convertir active a booleano si es un string
    const activeFilter =
      active === 'true' ? true : active === 'false' ? false : undefined;
    console.log(activeFilter);
    // Filtrar los productos
    this.products = this.products.filter((product) => {
      return (
        (!name || product.name.toLowerCase().includes(name.toLowerCase())) && // Filtrar por nombre
        (!category || product.category === category) && // Filtrar por categoría
        (!minPrice || product.price >= minPrice) && // Filtrar por precio mínimo
        (!maxPrice || product.price <= maxPrice) && // Filtrar por precio máximo
        (activeFilter === undefined || product.active === activeFilter) // Filtrar por estado activo
      );
    });
  }

  filterForm(): void {
    this.isFormFilterVisible = !this.isFormFilterVisible;
  }
  insertForm(): void {
    this.isFormAltaVisible = !this.isFormAltaVisible;
  }
}
