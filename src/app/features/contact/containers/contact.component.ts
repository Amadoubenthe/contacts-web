import { Component, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactElementComponent } from '../components/contact-element/contact-element.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, ContactElementComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private contactService = inject(ContactService);
  public contacts = this.contactService.contacts;
  public loading = this.contactService.loading;
  public error = this.contactService.error;
}

export default ContactComponent;
