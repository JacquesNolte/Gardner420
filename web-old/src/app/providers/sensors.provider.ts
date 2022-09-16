import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SensorsProvider {

  constructor (
    public http: HttpClient,
  ) { }

  public get () {

    return this.http
      .post<any>(environment.apiHost + `/api/sensors/retrieve`, {})
  }
}
