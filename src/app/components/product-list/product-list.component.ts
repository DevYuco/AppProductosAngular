import { Component, inject } from "@angular/core";
import { IProduct } from "../../interfaces/iproduct";
import { ProductService } from "../../services/product.service";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { IFilter } from "../../interfaces/ifilter";
import { InsertProductComponent } from "../insert-product/insert-product.component";

@Component({
    selector: "app-product-list",
    standalone: true,
    imports: [ProductCardComponent, ProductFilterComponent],
    templateUrl: "./product-list.component.html",
    styleUrl: "./product-list.component.css",
})
export class ProductListComponent {
    // Inyectar el servicio
    private productService = inject(ProductService);

    products: IProduct[];
    filters!: IFilter;
    isFormFilterVisible: boolean = false;

    constructor() {
        this.products = [];
    }
    //método asincrono que espera la carga de datos de la api
    async ngOnInit(): Promise<void> {
        this.products = await this.productService.getAllProducts();
    }
    //borramos productos, si estas haciendo busquedas y borras un producto te mantiene las busquedas de ahí el poner el if
    onDeleteProduct(productId: string): void {
        if (this.isFormFilterVisible) {
            this.products = this.productService.deleteProduct(productId);
            this.onApplyFilters(this.filters);
        } else {
            this.products = this.productService.deleteProduct(productId);
        }
    }
    //Realizar busquedas
    onApplyFilters(filters: IFilter): void {
        this.filters = filters;
        this.products = this.productService.getProductsByFilters(filters);
    }
    //Función para conmutar la variable que oculta y muestra el formulario de busquedas
    filterForm(): void {
        this.isFormFilterVisible = !this.isFormFilterVisible;
    }
}
