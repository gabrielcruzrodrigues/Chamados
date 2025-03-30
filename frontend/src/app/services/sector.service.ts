import { Injectable, OnInit } from '@angular/core';
import { CreateSector, Sector, UpdateSector } from '../types/Sector';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  baseUrl: string = environment.apiUrl ?? 'https://localhost:7125/api'
  url: string = this.baseUrl + '/Sector';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  create(data: CreateSector): Observable<HttpResponse<any>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(this.url, data, { headers: headers, observe: 'response' });
  }

  getAll(): Observable<HttpResponse<Sector[]>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Sector[]>(this.url, { headers: headers, observe: 'response' });
  }

  delete(sectorId: number): Observable<HttpResponse<any>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/${sectorId}`;
    return this.http.delete(urlForRequest, { headers: headers, observe: 'response' });
  }

  search(param: string): Observable<HttpResponse<Sector[]>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/search/${param}`;
    return this.http.get<Sector[]>(urlForRequest, { headers: headers, observe: 'response' });
  }

  getById(sectorId: string): Observable<HttpResponse<Sector>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/${sectorId}`;
    return this.http.get<Sector>(urlForRequest, { headers: headers, observe: 'response' });
  }

  update(sector: UpdateSector): Observable<HttpResponse<any>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/${sector.id}`;
    return this.http.put(urlForRequest, sector, { headers: headers, observe: 'response' });
  }
}
