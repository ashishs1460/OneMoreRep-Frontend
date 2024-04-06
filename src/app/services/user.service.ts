import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileRequest } from '../model/profile.model';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../model/auth.model';
import { Route, Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 


  constructor(
    private http : HttpClient,
    private router:Router
  ) { }

  getUserDetails(userId:string):Observable<User> {
    const url = `api/v1/user/getDetails?userId=${userId}`;
   return this.http.get<User>(url)
  }

  updateProfile(profileRequest:ProfileRequest,file:File): Observable<LoginResponse>{
    const formData: FormData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('profileRequest', JSON.stringify(profileRequest));
   
    return this.http.post<LoginResponse>("api/v1/user/add",formData).pipe(
      tap(response=>{
        const user = response?.user;
        console.log(response.user);
        this.router.navigateByUrl('/user/profile')
     
      },error=>{

      })
    )
  }
}
