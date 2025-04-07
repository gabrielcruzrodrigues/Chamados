import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallTable, CreateCall, HistoryCallTable, MyCallTable } from '../types/Call';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  baseUrl: string = environment.apiUrl ?? 'https://localhost:7125/api'
  url: string = this.baseUrl + '/Call';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }
  
  create(data: CreateCall): Observable<HttpResponse<any>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(this.url, data, { headers: headers, observe: 'response' });
  }
  
  getAll(): Observable<HttpResponse<CallTable[]>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<CallTable[]>(this.url, { headers: headers, observe: 'response' });
  }

  getByUserId(userId: string): Observable<HttpResponse<MyCallTable[]>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/user/${userId}`;
    return this.http.get<MyCallTable[]>(urlForRequest, { headers: headers, observe: 'response' });
  }

  resolved(callId: number, userId: string): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/resolved/${callId}/${userId}`;
    const data = ['conteudo'];
    return this.http.put(urlForRequest, data, { headers: headers, observe: 'response' });
  }

  getResolvedCalls(page: number, size: number): Observable<HttpResponse<HistoryCallTable>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/resolved/${page}/${size}`;
    return this.http.get<HistoryCallTable>(urlForRequest, { headers: headers, observe: 'response' });
  }
}
