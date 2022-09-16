import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { alarm, alarmFill, alignBottom, thermometerHalf, thermometer, cloudRain, fan, lightbulb, dropletHalf, gearWideConnected, gear, hypnotize, moisture, snow3, thermometerSnow, thermometerSun, wind } from 'ngx-bootstrap-icons';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

const icons = {
  alarm,
  alarmFill,
  alignBottom,
  thermometerHalf,
  thermometer,
  cloudRain,
  fan,
  lightbulb,
  dropletHalf,
  gearWideConnected,
  gear,
  hypnotize,
  moisture,
  snow3,
  thermometerSnow,
  thermometerSun,
  wind
};

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    DashboardComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    NgxGaugeModule,
    NgxBootstrapIconsModule.pick(icons),
    ModalModule,
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
