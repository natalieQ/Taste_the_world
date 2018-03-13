import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';

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
  username;
  recipePosts;  //all recipe posts in database

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private recipeService: RecipeService
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
      ])],
      origin: ["", Validators.compose([
        Validators.required
      ])],
      imagePath: ["", Validators.compose([
        Validators.required
      ])]
    });
  }

  enableFormNewRecipeForm() {
    this.form.get('name').enable(); 
    this.form.get('description').enable(); 
    this.form.get('imagePath').enable(); 
    this.form.get('origin').enable(); 
  }

  disableFormNewRecipeForm() {
    this.form.get('name').disable(); 
    this.form.get('description').disable(); 
    this.form.get('imagePath').disable(); 
    this.form.get('origin').disable(); 
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

    this.getAllRecipes();

    setTimeout(() => {
      this.loadingPosts = false;
    }, 4000);  //lock for 4 secs
  }

  onRecipeSubmit() {
    console.log('form submitted');
    this.processing = true;
    this.disableFormNewRecipeForm();

    //create recipe 
    const recipe = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      imagePath: this.form.get('imagePath').value,
      origin: this.form.get('origin').value,
      createdBy: this.username
    }

    //send recipe to backend through recipeService
    this.recipeService.newRecipe(recipe).subscribe(data => {
      // Check if recipe is saved to database
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
        this.processing = false; 
        this.enableFormNewRecipeForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        //re-retrieve all recipe posts after adding new recipe
        this.getAllRecipes();
        // refresh form after two seconds
        setTimeout(() => {
          this.newPost = false; 
          this.processing = false; 
          this.message = false; 
          this.form.reset(); 
          this.enableFormNewRecipeForm(); 
        }, 2000);
      }
    });   

  }

  goBack() {
    window.location.reload();
  }

  getAllRecipes() {
    this.recipeService.getAllRecipes().subscribe(data => {
      this.recipePosts = data.recipes;
    });
  }

  ngOnInit() {
    // Get profile username when page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; 
    });

    //get all recipe posts
    this.getAllRecipes();
  }

}


//for ref
// var recipeSchema = new Schema({
//   name: { type: String, required: true, validator: nameValidators },
//   description: { type: String, validator: descriptionValidators },
//   origin: { type: String, required: true },
//   imagePath: { type: String },
//   createdBy: { type: String },
//   createdAt: { type: Date, default: Date.now() },
//   likes: { type: Number, default: 0 },
//   likedBy: { type: Array },
//   dislikes: { type: Number, default: 0 },
//   dislikedBy: { type: Array }
// });