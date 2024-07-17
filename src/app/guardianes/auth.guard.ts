import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private router: Router
    ){ }

  canActivate(): Observable<boolean>{
    return this.afAuth.authState.pipe(
      map(auth => {
        if(!auth){
          this.router.navigate(['/']);
          return false;
        }else{
          return true;
        }
      })
    );
  }
  
}
