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

  onEdit(id: string | undefined) {
    if (!id) {
      return;
    }
    console.log(`Update contact with id: ${id}`);
  }

  onDelete(id: string | undefined) {
    if (!id) {
      return;
    }
    console.log(`Delete contact with id: ${id}`);
    this._contactService.deleteContact(id).subscribe();
  }
}
