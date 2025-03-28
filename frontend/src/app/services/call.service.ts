import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CallTable, CreateCall } from '../types/Call';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  baseUrl: string = environment.apiUrl ?? 'https://localhost:7125/api'
  url: string = this.baseUrl + '/Call';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(data: CreateCall): Observable<HttpResponse<any>> {
    return this.http.post(this.url, data, { observe: 'response' });
  }

  getAll(): Observable<HttpResponse<CallTable[]>> {
    return this.http.get<CallTable[]>(this.url, { observe: 'response' });
  }
}
