import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DevicesProvider {

  constructor (public http: HttpClient) { }

  public get () {
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
      .post<any>(environment.apiHost + '/api/devices/retrieve', {})
  }

  public create (payload: any) {

    return this.http
      .post<any>(environment.apiHost + '/api/devices/create', payload)
  }

  public update (payload: any) {

    return this.http
      .post<any>(environment.apiHost + '/api/devices/update', payload)
  }

  public delete (payload: any) {

    return this.http
      .post<any>(environment.apiHost + '/api/devices/delete', payload)
  }

  public setState (payload: any) {

    return this.http
      .post<any>(environment.apiHost + '/api/devices/set-state', payload)
  }

  public getTypes () {

    return this.http
      .post<any>(environment.apiHost + '/api/devices/retrieve-types', {})
  }
}
