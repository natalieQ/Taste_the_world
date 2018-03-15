import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent implements OnInit {

  message;
  messageClass;
  foundRecipe = false;
  processing = false;
  recipe;
  curUrl;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteRecipe() {
    //prevent user from multiple - clicking the button
    this.processing = true;
    this.recipeService.deleteRecipe(this.curUrl.id).subscribe( data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        //after 2 sec, navigate to previous page
        setTimeout(() => {
          this.router.navigate(['/recipe']);
        }, 2000);
      }
    });

  }

  ngOnInit() {
    this.curUrl = this.activatedRoute.snapshot.params;
    //retrieve recipe by id via cur url 
    //load html content 
    this.recipeService.getSingleRecipe(this.curUrl.id).subscribe(data => {
      if( !data.success ){
        this.messageClass = 'alert alert-danger';
        this.message = 'Recipe not found';
      } else {
        this.recipe = data.recipe;
        this.foundRecipe = true;
      }
    });
  }

}
