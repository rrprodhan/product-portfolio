import { Component, computed, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { IProduct } from "../../models/IProduct";
import { MatChipsModule } from "@angular/material/chips";
import { ResizableDirective } from "../../directives/resizable.directive";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [
    MatCardModule,
    AsyncPipe,
    MatChipsModule,
    CurrencyPipe,
    ResizableDirective,
  ],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent {
  productList = input<IProduct[]>([]);
  selectedCategory = input<string>("All Products");
  filteredProductList = computed(() => {
    return this.selectedCategory() === "All Products"
      ? this.productList()
      : this.productList().filter(
          (product: IProduct) => product.category === this.selectedCategory()
        );
  });
}
