import { Component, inject, OnInit, signal } from "@angular/core";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { IProduct } from "../../models/IProduct";
import { ProductService } from "../../services/product.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  from,
  merge,
  of,
  switchMap,
  tap,
  toArray,
} from "rxjs";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    ProductCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);

  productCategories = ["Electronics", "Appliances", "Fitness", "Accessories"];
  productList = signal<IProduct[]>([]);
  filteredProductList = signal<IProduct[]>([]);
  selectedCategory = signal<string>("All Products");
  searchFormControl = new FormControl();

  ngOnInit(): void {
    this.getProductList();

    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return of(this.filterProductList(searchTerm));
        })
      )
      .subscribe((productList) => {
        this.filteredProductList.set(productList);
      });
  }

  getProductList() {
    this.productService
      .getProductList()
      .subscribe((productList: IProduct[]) => {
        this.productList.set(productList);
        this.filteredProductList.set(productList);
      });
  }

  getProductListByName(name: string) {
    this.productService
      .getProductList()
      .subscribe((productList: IProduct[]) => {
        this.productList.set(productList);
      });
  }

  filterProductList(searchTerm: string): IProduct[] {
    return searchTerm === ""
      ? this.productList()
      : this.productList().filter((product: IProduct) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }

  onCategoryChange(event: MatSelectChange) {
    this.selectedCategory.set(event.value);
  }
}
