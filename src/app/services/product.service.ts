import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { IProduct } from "../models/IProduct";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  http = inject(HttpClient);

  getProductList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("product_list.json").pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }
}
