import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CreateUser, ResponseCreateUser, UpdateUser, User } from '../types/User';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl ?? 'https://localhost:7125/api'
  url: string = this.baseUrl + '/Users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  create(data: CreateUser): Observable<ResponseCreateUser> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
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
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<User[]>(this.url, { headers: headers, observe: 'response' });
  }

  search(param: string): Observable<HttpResponse<User[]>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/search/${param}`;
    return this.http.get<User[]>(urlForRequest, { headers: headers, observe: 'response' });
  }

  delete(id: number): Observable<any> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/${id}`;
    return this.http.delete(urlForRequest, { headers: headers, observe: 'response' });
  }

  getById(id: string): Observable<HttpResponse<User>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url + `/${id}`;
    return this.http.get<User>(urlForRequest, { headers: headers, observe: 'response' });
  }

  update(user: UpdateUser): Observable<HttpResponse<any>> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const urlForRequest = this.url;
    return this.http.put(urlForRequest, user, { headers: headers, observe: 'response' });
  }
}
