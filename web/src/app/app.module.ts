import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material-module'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevicesComponent, UpdateDeviceModal, AddDeviceModal } from './devices/devices.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DevicesProvider, ConfigurationProvider,SensorsProvider } from './providers';

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    ConfigurationComponent,
    DashboardComponent,
    UpdateDeviceModal,
    AddDeviceModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DevicesProvider,
    ConfigurationProvider,
    SensorsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
