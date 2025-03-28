import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CreateUser, ResponseCreateUser, UpdateUser, User } from '../types/User';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl ?? 'https://localhost:7125/api'
  url: string = this.baseUrl + '/Users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(data: CreateUser): Observable<ResponseCreateUser> {
    return this.http.post<ResponseCreateUser>(this.url, data, { observe: 'response' }).pipe(
      map((response: HttpResponse<ResponseCreateUser>) => {
        if (!response.body) {
          throw new Error("A resposta do servidor foi nula ou inválida!")
        }
        return response.body;
      })
    )
  }

  getAll(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.url, { observe: 'response' });
  }

  search(param: string): Observable<HttpResponse<User[]>> {
    const urlForRequest = this.url + `/search/${param}`;
    return this.http.get<User[]>(urlForRequest, { observe: 'response' });
  }

  delete(id: number): Observable<any> {
    const urlForRequest = this.url + `/${id}`;
    return this.http.delete(urlForRequest, { observe: 'response' });
  }

  getById(id: string): Observable<HttpResponse<User>> {
    const urlForRequest = this.url + `/${id}`;
    return this.http.get<User>(urlForRequest, { observe: 'response' });
  }

  update(user: UpdateUser): Observable<HttpResponse<any>> {
    const urlForRequest = this.url;
    return this.http.put(urlForRequest, user, { observe: 'response' });
  }
}
