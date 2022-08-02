import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DevicesProvider } from '../providers';

export interface DeviceElement {
  name: string;
  type: string;
  pin: number;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  public dataSource: any

  displayedColumns: string[] = ['name', 'category', 'pin', 'gpioPin', 'active', 'update']

  constructor(
    public devicesProvider: DevicesProvider,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDevices()
  }

  public getDevices(){
    // this.devicesProvider.get().subscribe((res) => {
    //   this.dataSource = res.data.devices
    // })
    this.dataSource = [{name: 'Mars Hydro', category: 'Light', pin: 20, gpioPin: 20, active: false}]
  }

  openModal(data: any) {
    const dialogRef = this.dialog.open(UpdateDeviceModal, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'update-device-modal',
  templateUrl: 'update-device-modal.html',
})
export class UpdateDeviceModal {

  constructor(
    public dialogRef: MatDialogRef<UpdateDeviceModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log({ModalData: data})
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
