import { Component } from '@angular/core';
import { MainSectionComponent } from "./main-section/main-section.component";
import { ProductsSectionComponent } from "./products-section/products-section.component";
import { PerksSectionComponent } from "./perks-section/perks-section.component";

@Component({
  selector: 'app-homepage',
  imports: [MainSectionComponent, ProductsSectionComponent, PerksSectionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
