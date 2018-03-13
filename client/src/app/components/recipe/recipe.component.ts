import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  newPost = false;
  loadingPosts = false;
  processing = false;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.createNewRecipeForm();
  }

  createNewRecipeForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.validateName
      ])],
      description: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ])]
    });
  }

  validateName(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if(regExp.test(controls.value)) {
      return null;
    }else{
      return { 'validateName': true };
    }
  }

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

  onRecipeSubmit() {
    console.log('form submitted');
  }

  ngOnInit() {
  }

}
