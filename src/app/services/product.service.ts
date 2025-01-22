import { Injectable } from "@angular/core";
import { IProduct } from "../interfaces/iproduct";
import { PRODUCTS } from "../db/products.db";
import { IFilter } from "../interfaces/ifilter";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private arrProducts: IProduct[];
    //Si no cargan datos igual ha caducado la api
    private api: string = "https://jsonblob.com/api/1330626915941408768";

    constructor() {
        // this.arrProducts = PRODUCTS;
        this.arrProducts = [];
    }
    //Metodo asincrono que espera la carga de datos de la api
    async getAllProducts(): Promise<IProduct[]> {
        const response = await fetch(this.api);
        const data = await response.json();
        this.arrProducts = data;
        return this.arrProducts;
    }
    // getAllProducts(): IProduct[] {
    //   return this.arrProducts;
    // }
    //Buscamos productos por id
    getProductById(_id: String): IProduct | undefined {
        return this.arrProducts.find((product) => product._id === _id);
    }
    //Borramos el producto por id
    deleteProduct(_id: String): IProduct[] {
        //Buscamos producto
        const productSearch = this.getProductById(_id);
        //Creamos una nueva lista, cuando se cumple la condicion mete ese producto a la lista
        this.arrProducts = this.arrProducts.filter((product) => product !== productSearch);
        return this.arrProducts;
    }
    //Filtramos por los diferentes paámetros utilizando el .filter que construye una nueva lista con los objetos que cumplen las condiciones
    getProductsByFilters(filters: IFilter): IProduct[] {
        const { name, category, minPrice, maxPrice, active } = filters;
        let arrProductsFilter: IProduct[] = [];

        // Convertir active a booleano si es un string
        const activeFilter = active === "true" ? true : active === "false" ? false : undefined;
        // Filtrar los productos
        arrProductsFilter = this.arrProducts.filter((product) => {
            return (
                (!name || product.name.toLowerCase().includes(name.toLowerCase())) && // Filtrar por nombre
                (!category || product.category === category) && // Filtrar por categoría
                (!minPrice || product.price >= minPrice) && // Filtrar por precio mínimo
                (!maxPrice || product.price <= maxPrice) && // Filtrar por precio máximo
                (activeFilter === undefined || product.active === activeFilter) // Filtrar por estado activo
            );
        });
        return arrProductsFilter;
    }
    //Generamos un id único con esto algoritmo
    generateCustomId(): string {
        return Array.from(crypto.getRandomValues(new Uint8Array(12)))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    }
    //Insertamos un producto en la lista
    insertProduct(product: IProduct): void {
        const newId = this.generateCustomId();

        product._id = newId;
        product.active = true;

        this.arrProducts.push(product);
    }
}
