import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
})
export class ContactSectionComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Here you would implement your form submission logic
      console.log('Form submitted:', this.contactForm.value);
      // Reset form after submission
      this.contactForm.reset();
    }
  }
}
