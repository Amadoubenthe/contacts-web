import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactElementComponent } from '../components/contact-element/contact-element.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, ContactElementComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  private _contactService = inject(ContactService);
  public contacts = this._contactService.contacts;
  public loading = this._contactService.loading;
  public error = this._contactService.error;

  public regions = this._contactService.regions;

  ngOnInit(): void {
    // this._contactService.getContacts().subscribe();
    this._contactService.getRegions().subscribe();
  }
}

export default ContactComponent;
