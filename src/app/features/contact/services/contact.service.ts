import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _http = inject(HttpClient);

  public getContacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(`https://localhost:7067/api/Contacts`);
  }
}
