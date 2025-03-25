import { Injectable } from '@angular/core';
import { CreateSector, Sector } from '../types/Sector';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  baseUrl: string = environment.apiUrl ?? 'https://localhost:7125/api'
  url: string = this.baseUrl + '/Sector';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(data: CreateSector): Observable<HttpResponse<any>> {
    return this.http.post(this.url, data, { observe: 'response' });
  }

  getAll(): Observable<HttpResponse<Sector[]>> {
    return this.http.get<Sector[]>(this.url, { observe: 'response' });
  }

  delete(sectorId: number): Observable<HttpResponse<any>> {
    const urlForRequest = this.url + `/${sectorId}`;
    return this.http.delete(urlForRequest, { observe: 'response' });
  }
}
