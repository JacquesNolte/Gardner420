import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  type: string;
  pin: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Light', type: 'Hardware', pin: 1},
  {name: 'Humidifier', type: 'Hardware', pin: 2},
  {name: 'Fan', type: 'Hardware', pin: 3}
];

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'type', 'pin'];
  dataSource = ELEMENT_DATA;

}
