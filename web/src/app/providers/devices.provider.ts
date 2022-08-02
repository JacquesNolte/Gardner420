import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DevicesProvider {

  constructor(public http: HttpClient) { }

  public get() {
    const url = '192.168.0.197:8080/api/devices/retrieve'

    console.log({URL: url})

    return this.http
      .post<any>('http://192.168.0.197:8080/api/devices/retrieve', {})
  }
}
