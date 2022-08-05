import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SensorsProvider {

  constructor(
    public http: HttpClient,
  ) { }

  public get() {

    return this.http
      .post<any>(`http://192.168.0.105:8080/api/sensors/retrieve`, {})
  }
}
