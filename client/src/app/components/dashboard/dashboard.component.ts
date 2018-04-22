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

  data = [];
  colours = ['#ff9999', '#ffb399', '#ffcc99', '#ffe699',
              '#e6ff99', '#b3ff99', '#99ffb3', '#99ffe6', '#99e6ff',
              '#99b3ff', '#b399ff', '#e699ff', '#ff99cc'];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
  ) { }

  //get recipe origins and the count
  getAllOrigins() {
    this.recipeService.getAllOrigins().subscribe(res => {
      this.data = res.origins;
    });
  }


  ngOnInit() {
    this.getAllOrigins();
  }

}
