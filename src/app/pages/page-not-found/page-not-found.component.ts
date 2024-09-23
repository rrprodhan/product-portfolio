import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.scss",
})
export class PageNotFoundComponent {
  router = inject(Router);

  onGoBackButtonClick() {
    this.router.navigateByUrl("products");
  }
}
