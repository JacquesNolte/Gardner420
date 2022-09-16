import { Component, OnInit } from '@angular/core';
import { DevicesProvider, ConfigurationProvider, SensorsProvider } from '../providers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public devices: any
  public sensors: any
  public configuration: any

  constructor(
    public sensorsProvider: SensorsProvider,
    public configurationProvider: ConfigurationProvider,
    public devicesProvider: DevicesProvider
  ) { }

  ngOnInit() {
    this.getConfiguration()
    this.getSensors()
    this.getDevices()    
  }

  public getDevices(){
    this.devicesProvider.get().subscribe((res) => {
      this.devices = res.data.devices
    })
  }

  public getSensors(){
    this.sensorsProvider.get().subscribe((res) => {
      this.sensors = res.data
      this.sensors.temperature = this.sensors.temperature.toFixed(2)
      this.sensors.humidity = this.sensors.humidity.toFixed(2)
      this.sensors.pressure = this.sensors.pressure.toFixed(2)
      this.sensors.vpd = this.sensors.vpd.toFixed(2)
    })
  }

  public getConfiguration(){
    this.configurationProvider.get().subscribe((res) => {
      this.configuration = res.data
    })
  }

  public setDeviceState(device: any){
    this.devicesProvider.setState({ name: device.name, active: device.active, keepActive: device.keepActive }).subscribe((res: any) => {
    })
  }

}
