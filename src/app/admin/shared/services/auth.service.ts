import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { Observable, Subject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({providedIn:'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>()
    constructor(private http: HttpClient){}

get token(): any {
    const expDate = new Date(Date.parse(localStorage.getItem('fb-token-exp')!))
    if (new Date() > expDate){
        this.logout()
       return null 
    }
    return localStorage.getItem('fb-token')
}

    login(user: User): Observable<any>{
        user.returnSecureToken = true
       return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
            )
    }

    logout(){
this.setToken(null)
    }

    isAuthenticated(): boolean{
        return !!this.token
    }

    private handleError(error: HttpErrorResponse){
const {message} = error.error.error
switch(message){
    case 'INVALID_EMAIL':
        this.error$.next('INVALID EMAIL')
        break
    case 'INVALID_PASSWORD':
        this.error$.next('INVALID PASSWORD')
        break
    case 'EMAIL_NOT_FOUND':
        this.error$.next('EMAIL NOT FOUND')
        break
    
}
return throwError(() => new Error(message))
    }

    private setToken(response: FbAuthResponse | null){
        if (response){
            const expDate = new Date(new Date().getTime() + Number(response.expiresIn)*1000)
            localStorage.setItem('fb-token', response.idToken!)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
       
    }
}