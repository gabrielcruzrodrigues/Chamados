import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CreateUser, ResponseCreateUser, User } from '../types/User';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.apiUrl ?? 'https://localhost:7125/api'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(data: CreateUser): Observable<ResponseCreateUser> {
    const urlForRequest = this.url + '/Users';
    return this.http.post<ResponseCreateUser>(urlForRequest, data, { observe: 'response' }).pipe(
      map((response: HttpResponse<ResponseCreateUser>) => {
        if (!response.body) {
          throw new Error("A resposta do servidor foi nula ou inválida!")
        }
        return response.body;
      })
    )
  }

  getAll(): Observable<HttpResponse<User[]>> {
    const urlForRequest = this.url + '/Users';
    return this.http.get<User[]>(urlForRequest, { observe: 'response' });
  }
}
