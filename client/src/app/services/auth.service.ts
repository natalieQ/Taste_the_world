import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
 

@Injectable()
export class AuthService {

  domain = "http://localhost:3000";
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  // authenticate routes
  // create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); 
    // config
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', 
        'authorization': this.authToken // include token
      })
    });
  }

  //get token from browser(local storage)
  loadToken() {
    this.authToken = localStorage.getItem('token');
  } 

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get(this.domain + '/authentication/checkEmail/' + email ).map(res => res.json());
  }

  checkUsername(username){
    return this.http.get(this.domain + '/authentication/checkUsername/' + username ).map(res => res.json());
  }

  //login
  login(user) {
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  //logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; 
    localStorage.clear(); 
  }

  // store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // as string
    this.authToken = token; 
    this.user = user; 
  }

  // retrieve user's profile data from token
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers and then send to backend
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }

  //checking authentication to hide/show routing
  loggedIn() {
    return tokenNotExpired();
  }

}
