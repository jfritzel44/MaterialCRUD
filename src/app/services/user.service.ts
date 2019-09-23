import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  add(user: any) {
    return this.http.post<any>(`${config.apiUrl}/users`, user).pipe(map(data => {
        return data;
    }));    
  }

  update(user: any) {
    return this.http.patch<any>(`${config.apiUrl}/users/` + user.id, user).pipe(map(data => {
        return data;
    }));    
  }

  get(id: any) {
    return this.http.get<any>(`${config.apiUrl}/users/` + id).pipe(map(data => {
        return data;
    })); 
  }

  getAll() {
    return this.http.get<any>(`${config.apiUrl}/users`).pipe(map(data => {
        return data;
    })); 
  }
}
