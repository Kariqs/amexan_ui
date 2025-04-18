import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { DetailsComponent } from "./details/details.component";
import { SpecificationsComponent } from "./specifications/specifications.component";

@Component({
  selector: 'app-product-info',
  imports: [FooterComponent, DetailsComponent, SpecificationsComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {

}
