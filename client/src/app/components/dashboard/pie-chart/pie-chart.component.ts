
import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { SumPipe } from '../_pipes/sum.pipe';
import * as _ from 'underscore';

@Component({
    selector: 'app-pie-chart',
    styleUrls: ['./pie-chart.component.scss'],
    templateUrl: './pie-chart.component.html'
})


export class PieChartComponent implements OnInit, OnChanges {
  @ViewChild('containerPieChart') chartContainer: ElementRef;
  @Input() data: any;
  @Input() colours: Array<string>;

  hostElement: any;
  svg: any;
  radius: number;
  innerRadius: number;
  outerRadius: number;
  htmlElement: HTMLElement;
  arcGenerator: any;
  arcHover: any;
  pieGenerator: any;
  path: any;
  values: Array<number>;
  labels: Array<string>;
  tooltip: any;
  centralLabel: any;
  pieColours: any;
  slices: Array<any>;
  selectedSlice: any;
  colourSlices: Array<string>;
  arc: any;
  arcEnter: any;

  constructor(
    private elRef: ElementRef
  ) {}

  ngOnInit() {

    this.createChart();

    // Initial update
    this.updateChart(true);

    // animation(load the data after a second)
    setTimeout(() => this.updateChart(false), 50);
  }

  ngOnChanges() {
    
    if (this.svg) this.updateChart(false);
  }

  createChart = () => {
    // chart config
    this.hostElement = this.chartContainer.nativeElement;

    this.radius = Math.min(this.hostElement.offsetWidth, this.hostElement.offsetHeight) / 2;
    const innerRadius = this.radius - 80;
    const outerRadius = this.radius - 15;
    const hoverRadius = this.radius - 5;
    this.pieColours = this.colours ? d3.scaleOrdinal().range(this.colours) : d3.scaleOrdinal();
    this.tooltip = this.elRef.nativeElement.querySelector('.tooltip');

  
    this.pieGenerator = d3.pie().sort(null).value((d: number) => d)([0, 0, 0]);

    //arc generator
    this.arcGenerator = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    this.arcHover = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(hoverRadius);

    // crate svg and add to dom
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('viewBox', '0, 0, ' + this.hostElement.offsetWidth + ', ' + this.hostElement.offsetHeight)
      .append('g')
      .attr('transform', `translate(${this.hostElement.offsetWidth / 2}, ${this.hostElement.offsetHeight / 2})`);
  }

  updateChart = (firstRun: boolean) => {
    const vm = this;

    this.slices = this.data;
    this.labels = this.slices.map(slice => slice.name);
    this.colourSlices = this.slices.map(slice => this.pieColours(slice.name));

    this.values = firstRun ? [0, 0, 0] : _.toArray(this.slices).map(slice => slice.count);

    this.pieGenerator = d3.pie().sort(null).value((d: number) => d)(this.values);

    const arc = this.svg.selectAll('.arc')
      .data(this.pieGenerator);

    arc.exit().remove();

    const arcEnter = arc.enter().append('g')
      .attr('class', 'arc');

    arcEnter.append('path')
      .attr('d', this.arcGenerator)
      .each((values) => firstRun ? values.storedValues = values : null)
      .on('mouseover', this.mouseover)
      .on('mouseout', this.mouseout);

    d3.select(this.hostElement).selectAll('path')
      .data(this.pieGenerator)
      .attr('fill', (datum, index) => this.pieColours(this.labels[index]))
      .attr('d', this.arcGenerator)
      .transition()
      .duration(750)
      .attrTween('d', function(newValues, i){
        return vm.arcTween(newValues, i, this);
      });
  }

  arcTween(newValues, i, slice) {
    const interpolation = d3.interpolate(slice.storedValues, newValues);
    slice.storedValues = interpolation(0);

    return (t) => {
      return this.arcGenerator(interpolation(t));
    };
  }

  mouseover = (d, i) => {
    this.selectedSlice = this.slices[i];

    d3.select(d3.event.currentTarget).transition()
      .duration(200)
      .attr('d', this.arcHover);

    this.svg.append('text')
      .attr('dy', '-10px')
      .style('text-anchor', 'middle')
      .attr('class', 'label')
      .attr('fill', '#57a1c6')
      .text(this.labels[i]);

    this.svg.append('text')
      .attr('dy', '20px')
      .style('text-anchor', 'middle')
      .attr('class', 'percent')
      .attr('fill', '#57a1c6')
      .text(this.toPercent(this.values[i], new SumPipe().transform(this.values)));

    // Tooltip
    this.tooltip.style.visibility = 'visible';
    this.tooltip.style.opacity = 0.9;
    this.tooltip.style.top = (d3.event.pageY) + 'px';
    this.tooltip.style.left = (d3.event.pageX - 100 ) + 'px';
  }

  mouseout = () => {
    this.svg.select('.label').remove();
    this.svg.select('.percent').remove();

    d3.select(d3.event.currentTarget).transition()
     .duration(100)
     .attr('d', this.arcGenerator);

    this.tooltip.style.visibility = 'hidden';
    this.tooltip.style.opacity = 0;
  }

  toPercent = (a: number, b: number): string => {
    return Math.round( a / b * 100) + '%';
  }

}
