import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IProduct } from "../../interfaces/iproduct";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "app-insert-product",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./insert-product.component.html",
    styleUrl: "./insert-product.component.css",
})
export class InsertProductComponent {
    //Inyeccion del servicio
    private productService = inject(ProductService);

    modelForm: FormGroup;

    constructor() {
        //Creamos las validaciones
        this.modelForm = new FormGroup(
            {
                name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
                description: new FormControl(null, [Validators.required, Validators.minLength(15)]),
                price: new FormControl(null, [Validators.required, Validators.min(0.1)]),
                category: new FormControl(null, [Validators.required]),
                image: new FormControl(null, [Validators.required, Validators.pattern(/^(https?:\/\/)[\w\-]+(\.[\w\-]{2,})+[/#?]?.*$/)]),
            },
            []
        );
    }
    //Obtenemos los datos del formulario
    getDataForm() {
        let product: IProduct = this.modelForm.value as IProduct;
        this.productService.insertProduct(product);
        this.modelForm.reset();
    }
    //Función para mostrar un mensaje en caso de no cumplir con los validadores
    checkControl(formControlName: string, validador: string): boolean | undefined {
        return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
    }
}
