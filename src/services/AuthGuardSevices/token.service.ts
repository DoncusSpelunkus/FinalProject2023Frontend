import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {Token} from "../../entities/Token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): Token | null {
    let localToken = localStorage.getItem('auth');
    if (localToken) { // checks if the local token exist at all
      const decodedToken = jwtDecode(localToken) as Token;
      return decodedToken;
    }
    return null;
  }
}
