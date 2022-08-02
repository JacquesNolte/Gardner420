import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationProvider {

  constructor(public http: HttpClient) { }

  public get() {
    const url = '192.168.0.197:8080/api/conditions/retrieve'

    return this.http
      .post<any>('http://192.168.0.197:8080/api/conditions/retrieve', {})
  }
}
