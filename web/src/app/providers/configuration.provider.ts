import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationProvider {

  constructor(public http: HttpClient) { }

  public get() {
    return this.http
      .post<any>('http://192.168.0.105:8080/api/conditions/retrieve', {})
  }

  public setTemperature(payload: any) {
    return this.http
      .post<any>('http://192.168.0.105:8080/api/conditions/set-temperature', payload)
  }

  public setHumidity(payload: any) {
    return this.http
      .post<any>('http://192.168.0.105:8080/api/conditions/set-humidity', payload)
  }

  public setLightCycle(payload: any) {
    return this.http
      .post<any>('http://192.168.0.105:8080/api/conditions/set-light-cycle', payload)
  }
}
