import { Component, OnInit } from '@angular/core';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {

  temperatureThreshold = {
    '10': {color: 'blue'},
    '20': {color: 'green'},
    '30': {color: 'red'}
  }

  humidityThreshold = {
    '0': {color: 'blue'},
    '40': {color: 'green'},
    '75': {color: 'red'}
  }

  constructor() { }

  ngOnInit(): void {
  }



}
