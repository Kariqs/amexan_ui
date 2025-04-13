import { Component } from '@angular/core';
import { MainSectionComponent } from "./main-section/main-section.component";
import { ProductsSectionComponent } from "./products-section/products-section.component";
import { PerksSectionComponent } from "./perks-section/perks-section.component";
import { CategoriesSectionComponent } from "./categories-section/categories-section.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ContactSectionComponent } from "./contact-section/contact-section.component";
import { FaqSectionComponent } from "./faq-section/faq-section.component";

@Component({
  selector: 'app-homepage',
  imports: [MainSectionComponent, ProductsSectionComponent, PerksSectionComponent, CategoriesSectionComponent, FooterComponent, ContactSectionComponent, FaqSectionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
