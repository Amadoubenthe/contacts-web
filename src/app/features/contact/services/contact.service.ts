import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactPayload } from '../../models/contactPayload.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _http = inject(HttpClient);
  contacts = signal<Contact[]>([]);
  private baseUrl: string = 'https://localhost:7067/api';

  constructor() {
    this.getContacts().subscribe();
  }

  public getContacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(`${this.baseUrl}/Contacts`).pipe(
      tap((res) => {
        this.contacts.set(res);
        return res;
      })
    );
  }

  public addContact(payload: ContactPayload): Observable<Contact> {
    return this._http.post<Contact>(`${this.baseUrl}/Contacts`, payload).pipe(
      tap((res) => {
        this.contacts.update((contact) => [res, ...contact]);
        return res;
      })
    );
  }

  public deleteContact(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`${this.baseUrl}/contacts/${id}`).pipe(
      tap(() => {
        this.contacts.update((contacts) =>
          contacts.filter((contact) => contact.id !== id)
        );
      })
    );
  }
}
