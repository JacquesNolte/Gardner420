import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationProvider {

  constructor (public http: HttpClient) { }

  public get () {
    return this.http
      .post<any>(environment.apiHost + '/api/conditions/retrieve', {})
  }

  public setTemperature (payload: any) {
    return this.http
      .post<any>(environment.apiHost + '/api/conditions/set-temperature', payload)
  }

  public setHumidity (payload: any) {
    return this.http
      .post<any>(environment.apiHost + '/api/conditions/set-humidity', payload)
  }

  public setLightCycle (payload: any) {
    return this.http
      .post<any>(environment.apiHost + '/api/conditions/set-light-cycle', payload)
  }
}
