import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,  Router,  RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard{
    constructor(private auth: AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean |  Promise<boolean> {
        if (this.auth.isAuthenticated()){
            return true;
        }else{
          this.auth.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
                loginAgain: true
            }
          })  
          return false
        }
       
    }

}