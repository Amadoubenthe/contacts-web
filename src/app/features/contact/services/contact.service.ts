import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactPayload } from '../../models/contactPayload.model';

export interface Region {
  id: string;
  code: string;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _http = inject(HttpClient);
  private _contacts = signal<Contact[]>([]);
  public contacts = computed(() => this._contacts());
  // Region
  private _regions = signal<Region[]>([]);
  public regions = computed(() => this._regions());
  // end
  private _loading = signal<boolean>(false);
  public loading = computed(() => this._loading());
  private _error = signal<string | null>(null);
  public error = computed(() => this._error());
  private baseUrl: string = 'https://localhost:7067/api';

  // https://localhost:7281/api/Regions

  public getContacts(): Observable<Contact[]> {
    this._loading.set(true);
    this._error.set(null);
    return this._http.get<Contact[]>(`${this.baseUrl}/Contacts`).pipe(
      // Simulate a loading time
      delay(1000),
      catchError((error) => {
        console.error("Une erreur s'est produite:", error);
        this._error.set('Erreur lors de la récupération des données');
        this._loading.set(false);
        return of([]);
      }),
      tap((res) => {
        this._contacts.set(res);
        this._loading.set(false);
      })
    );
  }

  public addContact(payload: ContactPayload): Observable<Contact> {
    this._loading.set(true);
    this._error.set(null);
    return this._http.post<Contact>(`${this.baseUrl}/Contacts`, payload).pipe(
      catchError((error) => {
        console.error(`Error: ${error}`);
        this._error.set("Erreur lors de l'ajout du contact");
        this._loading.set(false);
        return of();
      }),
      tap((res) => {
        this._contacts.update((contact) => [res, ...contact]);
        this._loading.set(false);
      })
    );
  }

  public deleteContact(id: string): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);
    return this._http.delete<boolean>(`${this.baseUrl}/contacts/${id}`).pipe(
      catchError((error) => {
        this._error.set('Erreur lors de la suppressiondu contact');
        this._loading.set(false);
        return of(true);
      }),
      tap(() => {
        this._contacts.update((contacts) =>
          contacts.filter((contact) => contact.id !== id)
        );
        this._loading.set(false);
      })
    );
  }

  public getRegions(): Observable<Region[]> {
    this._loading.set(true);
    this._error.set(null);
    return this._http.get<Region[]>(`https://localhost:7281/api/Regions`).pipe(
      // Simulate a loading time
      delay(1000),
      catchError((error) => {
        console.error("Une erreur s'est produite:", error);
        this._error.set('Erreur lors de la récupération des données');
        this._loading.set(false);
        return of([]);
      }),
      tap((res) => {
        this._regions.set(res);
        this._loading.set(false);
      })
    );
  }
}
