import { Component, OnInit } from '@angular/core';
import { PieDataService } from './_services/pie-data.service';
import * as d3 from "d3";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Array<any>;
  colours = ['#57A1C6', '#4FC3F7', '#36D7B7'];

  constructor(
    private pieDataService: PieDataService
  ) { }



  ngOnInit() {
    this.data = this.pieDataService.generateData(30);
  }

}
