import { Component, OnInit } from '@angular/core';
import { power } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public togglePropVpd: boolean = false
  public toggleVegVpd: boolean = false
  public toggleFlowVpd: boolean = false
  public toggleLFlowVpd: boolean = false

  public activeGrow = {
    _id: "62fd1a3791f027ca13e07d8b",
    grow_name: "Test Grow",
    start_date: "12-09-2022:00:00:00",
    strains: [
      "AK-47",
      "Wedding Gelato"
    ],
    plant_type: "clones/seeds",
    pot_size: "15l",
    pot_count: 4,
    pot_type: "Auto Pots/Fabric Pots",
    nutrients: "Terra Aquatica Coco",
    substrate: "Atami High-Porosity Coco",
    active: true,
    feeding: [
      {
        _id: "62fd1a3791f027ca13e07d8b",
        date: "12-09-2022:00:00:00",
        nutrients: [
          {
            name: "Coco A Part",
            ml_dose_per_liter: 2
          },
          {
            name: "Coco B Part",
            ml_dose_per_liter: 2
          }
        ],
        ph: 5.9,
        ml_dose_per_plant: 1500,
        ml_total_feeding_dose: 20000
      }
    ],
    cycles: [
      {
        _id: "62e664ea5a82c7d5363daa4d",
        name: "Propagation",
        conditions: {
          day: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          night: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          light_schedule: {
            day: 20,
            night: 8
          },
          cycle_duration: {
            start: 1,
            end: 14
          },
          active: true,
          start_date: "12-09-2022:00:00:00"
        },
        actions: []
      },
      {
        _id: "62e664ea5a82c7d5363daa4d",
        name: "Vegetation",
        conditions: {
          day: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          night: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          light_schedule: {
            day: 20,
            night: 8
          },
          cycle_duration: {
            start: 1,
            end: 14
          },
          active: true,
          start_date: "12-09-2022:00:00:00"
        },
        actions: []
      },
      {
        _id: "62e664ea5a82c7d5363daa4d",
        name: "Flower",
        conditions: {
          day: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          night: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          light_schedule: {
            day: 20,
            night: 8
          },
          cycle_duration: {
            start: 1,
            end: 14
          },
          active: true,
          start_date: "12-09-2022:00:00:00"
        },
        actions: []
      },
      {
        _id: "62e664ea5a82c7d5363daa4d",
        name: "Late Flower",
        conditions: {
          day: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          night: {
            temperature: 25,
            temperature_offset: 2,
            humidity: 65,
            humidity_offset: 5
          },
          light_schedule: {
            day: 20,
            night: 8
          },
          cycle_duration: {
            start: 1,
            end: 14
          },
          active: true,
          start_date: "12-09-2022:00:00:00"
        },
        actions: []
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  public setToggleVpd(toggle: boolean, phase: string) {

    if (phase === 'togglePropVpd') {
      this.togglePropVpd = !toggle
    } else if (phase === 'toggleVegVpd') {
      this.toggleVegVpd = !toggle
    } else if (phase === 'toggleFlowVpd') {
      this.toggleFlowVpd = !toggle
    } else if (phase === 'toggleLFlowVpd') {
      this.toggleLFlowVpd = !toggle
    }

  }

  public calculateVpd(payload: any) {
    const HUMIDITY = payload.humidity
    const TEMPERATURE_CELCIUS = payload.temperature

    const VP_SAT = 610.7 * Math.pow(10, (7.5 * TEMPERATURE_CELCIUS / (237.3 + TEMPERATURE_CELCIUS)))
    const VPD = ((100 - HUMIDITY) / 100.0) * VP_SAT

    return VPD
  }

  calculateHumidity(payload: any) {
    const VPD_AIR = payload.vpd
    const TEMPERATURE_CELCIUS = payload.temperature
    const TEMPERATURE_FARENHEIT = this.convertCelciusToFarenheit(TEMPERATURE_CELCIUS)

    const HUMIDITY = 100 * (1 - VPD_AIR / (3.386 * Math.exp(17.863 - 9621 / (TEMPERATURE_FARENHEIT + 460))))

    return HUMIDITY
  }

  public convertCelciusToFarenheit(celcius: any) {
    return celcius * 9 / 5 + 32
  }

}
