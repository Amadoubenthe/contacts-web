import { Component, inject, input } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-element',
  standalone: true,
  imports: [],
  templateUrl: './contact-element.component.html',
})
export class ContactElementComponent {
  readonly contact = input<Contact>();
  private _contactService = inject(ContactService);

  onDelete(id: string | undefined) {
    if (id === undefined) {
      return;
    }
    console.log('Method not implemented.', id);
    this._contactService.deleteContact(id).subscribe();
  }
}
