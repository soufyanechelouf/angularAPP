import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users:User[]=[];
 
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, role:string[]): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      role
    }, httpOptions);

  }

  users1(): Observable<User[]> {
    return this.http.get<User[]>(AUTH_API + 'users');/*.pipe(
      map((response: any)=>response

    ));*/
  }
remove(user:User){
  return this.http.delete(AUTH_API+'delete/'+user.id).subscribe(data => {

  console.log(data);
});}

update(user:User ,username:string,email:string, password:string): Observable<any> {
  return this.http.put(AUTH_API + 'update2/'+user.id, {
    username,
    email,
    password
    
    
  }, httpOptions);

}
 
  
}
