import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl; //url user will be redirected to when authguard is on

    constructor(
        private authService: AuthService,
        private router: Router
      ) { }

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if(this.authService.loggedIn()){
            return true;
        } else{
            // when not logged in, nevigate to login page
            this.redirectUrl = state.url;     //get previous url
            this.router.navigate(['/login']);
            return false;
        }
    }
}