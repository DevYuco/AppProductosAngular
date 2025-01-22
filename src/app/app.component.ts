import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductFilterComponent } from "./components/product-filter/product-filter.component";
import { InsertProductComponent } from "./components/insert-product/insert-product.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, ProductListComponent, InsertProductComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "actividad03MMA";
    isFormAltaVisible: boolean = false;
    insertFormVisible(): void {
        this.isFormAltaVisible = !this.isFormAltaVisible;
    }
}
