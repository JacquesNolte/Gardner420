import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationProvider } from '../providers'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public configuration: any
  public temperatureForm!: FormGroup
  public humidityForm!: FormGroup
  public scheduleForm!: FormGroup

  constructor(
    public configurationProvider: ConfigurationProvider,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getConfiguration()
  }

  public getConfiguration(){
    this.configurationProvider.get().subscribe((res) => {
      this.configuration = res.data.conditions

      console.log(this.configuration)

      this.temperatureForm = this.fb.group({
        min: [this.configuration.temperature.min, []],
        max: [this.configuration.temperature.max, []]
      })
  
      this.humidityForm = this.fb.group({
        min: [this.configuration.humidity.min, []],
        max: [this.configuration.humidity.max, []]
      })

      this.scheduleForm = this.fb.group({
        day: [this.configuration.dayNightCycle.day, []],
        night: [this.configuration.dayNightCycle.night, []]
      })
    })
  }

  public setTemperature(){
    const formData = this.temperatureForm.value
    this.configurationProvider.setTemperature({min: formData.min, max: formData.max}).subscribe(() => {
      this.getConfiguration()
    })
  }

  public setHumidity(){
    const formData = this.humidityForm.value
    this.configurationProvider.setHumidity({min: formData.min, max: formData.max}).subscribe(() => {
      this.getConfiguration()
    })
  }

  public setSchedule(){
    const formData = this.scheduleForm.value
    this.configurationProvider.setLightCycle({day: formData.day, night: formData.night}).subscribe(() => {
      this.getConfiguration()
    })
  }

}
