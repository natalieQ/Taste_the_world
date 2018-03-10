import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingPosts = false;

  constructor() { }

  newRecipeForm(){
    this.newPost = true; //hide the button when user created new recipe post

  }

  reloadPosts(){
    this.loadingPosts = true;
    //retreive all the posts

    setTimeout(() => {
      this.loadingPosts = false;
    }, 4000);  //lock for 4 secs
  }

  ngOnInit() {
  }

}
