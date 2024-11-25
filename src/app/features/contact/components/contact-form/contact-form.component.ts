import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactPayload } from '../../../models/contactPayload.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
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
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      favorite: new FormControl(false),
    });
  }

  public onSubmit(): void {
    if (!this.contactForm.valid) {
      console.log('Le form est inValid');
      return;
    } else {
      console.log('Le formulaire est Vaalid: ', this.contactForm.valid);
      const payload: ContactPayload = this.contactForm.value;

      this._contactService
        .addContact(payload)
        .pipe()
        .subscribe({
          next: (res) => {
            console.log(`Contact ajoute: ${res}`);
            this.contactForm.reset();
          },
          error: (error) => {
            console.log(`Error lors de l'ajout: ${JSON.stringify(error)}`);
          },
        });
    }
  }
}
