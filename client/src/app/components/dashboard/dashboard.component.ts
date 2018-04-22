import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import * as d3 from "d3";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Array<any>;
  colours = ['#ff9999', '#ffb399', '#ffcc99', '#ffe699', '#e6ff99', '#99ffb3', '#99ffe6', '#99e6ff','#99b3ff', '#b399ff', '#ff99e6'];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
  ) { }

  //get recipe origins and the count
  getAllOrigins() {
    this.recipeService.getAllOrigins().subscribe(data => {
      console.log(data);
      this.data = data.origins;
    });
  }


  ngOnInit() {
    this.getAllOrigins();
    console.log('Hello');
    console.log(this.data);
  }

}
