import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactPayload } from '../../../models/contactPayload.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private _fb = inject(FormBuilder);
  private _contactService = inject(ContactService);
  public contactForm!: FormGroup;

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.contactForm = this._fb.group({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      favorite: new FormControl(false),
    });
  }

  public onSubmit(): void {
    const payload: ContactPayload = this.contactForm.value;

    this._contactService
      .addContact(payload)
      .pipe()
      .subscribe({
        next: (res) => {
          console.log(`Contact ajoute: ${res}`);
        },
        error: (error) => {
          console.log(`Error lors de l'ajout: ${JSON.stringify(error)}`);
        },
      });
  }
}
