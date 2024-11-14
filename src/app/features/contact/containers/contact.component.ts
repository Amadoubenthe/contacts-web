import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private contactService = inject(ContactService);

  public contacts$: Observable<Contact[]> = this.contactService.getContacts();
  public contacts = toSignal(this.contacts$);

  ngOnInit(): void {}
}

export default ContactComponent;
