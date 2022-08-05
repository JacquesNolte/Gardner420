import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DevicesProvider {

  constructor(public http: HttpClient) { }

  public get() {
    // Types
    // 'switch',
    // 'extractor_fan',
    // 'circulation_fan',
    // 'heater',
    // 'humidifier',
    // 'heating_pad',
    // 'pump',
    // 'air_pump',
    // 'light'

    return this.http
      .post<any>('http://192.168.0.105:8080/api/devices/retrieve', {})
  }

  public update(payload: any) {
    
  }

  public create(payload: any) {

    return this.http
      .post<any>('http://192.168.0.105:8080/api/devices/create', payload)
  }

  public delete(payload: any) {

    return this.http
      .post<any>('http://192.168.0.105:8080/api/devices/delete', payload)
  }

  public setState(payload: any){

    return this.http
      .post<any>('http://192.168.0.105:8080/api/devices/set-state', payload)
  }
}
