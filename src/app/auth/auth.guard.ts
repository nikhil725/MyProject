import { Injectable } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

     constructor(private router: Router) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('Authorization')) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
   

}
}
@Injectable()
export class LoggedInAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('Authorization')) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home/note']);
        return false;
    }
}