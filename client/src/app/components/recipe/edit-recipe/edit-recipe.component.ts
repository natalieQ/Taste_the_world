import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';  //get current page url
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  loading = true;
  recipe = {
    name: String,
    description: String,
    imagePath: String,
    origin: String
  }
  curUrl;


  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  updateRecipeSubmit() {
    this.processing = true;
    this.recipeService.editRecipe(this.recipe).subscribe(data => {
      if (!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        //enable form again
        this.processing = false;       
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;

        //navigate to view recipes after 2 secs
        setTimeout(() => {
          this.router.navigate(['/recipe']);
        }, 2000);
      }
    });

  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.curUrl = this.activatedRoute.snapshot.params;
    this.recipeService.getSingleRecipe(this.curUrl.id).subscribe (data => {
      if( !data.success ){
        this.messageClass = 'alert alert-danger';
        this.message = 'Recipe not found';
      } else {
        this.recipe = data.recipe;
        //load page only when recipe is found
        this.loading = false;
      }
    });
  }

}
