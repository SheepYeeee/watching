import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    constructor(
        public jwtHelper: JwtHelperService
    ) {}

    public isAuthenticated(): boolean {
        if (!localStorage.getItem(`${environment.keyOfToken}`)) {
            return false;
        }else {
            return true
        }

    }


}
