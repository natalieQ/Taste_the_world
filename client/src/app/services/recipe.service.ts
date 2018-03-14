import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class RecipeService {

  domain = this.authService.domain;
  options;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // authenticate routes
  // create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); 
    // config
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', 
        'authorization': this.authService.authToken // include token
      })
    });
  }

  newRecipe(recipe) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'recipes/newRecipe', recipe, this.options).map(res => res.json());
  }

  getAllRecipes() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'recipes/allRecipes', this.options).map(res => res.json());
  }

  //retrieve single recipe by id
  getSingleRecipe(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'recipes/singleRecipe/' + id, this.options).map(res => res.json());
  }

  //edit and update recipe
  editRecipe(recipe) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'recipes/updateRecipe', recipe, this.options).map(res => res.json());
  }

}
