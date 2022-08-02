import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  public getDevices() {
    this.devicesProvider.get().subscribe((res) => {
      this.dataSource = res.data.devices
    })
  }

  openModal(data: any) {
    const dialogRef = this.dialog.open(UpdateDeviceModal, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddDeviceModal, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'update-device-modal',
  templateUrl: 'update-device-modal.html',
})
export class UpdateDeviceModal implements OnInit {

  form!: FormGroup
  name!: string
  category!: string
  pin!: number
  gpioPin!: number

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateDeviceModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.name, []],
      category: [this.data.category, []],
      pin: [this.data.pin, []],
      gpioPin: [this.data.gpioPin, []]
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'add-device-modal',
  templateUrl: 'add-device-modal.html',
})
export class AddDeviceModal implements OnInit {

  form!: FormGroup
  name!: string
  category!: string
  pin!: number
  gpioPin!: number

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDeviceModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.name, []],
      category: [this.data.category, []],
      pin: [this.data.pin, []],
      gpioPin: [this.data.gpioPin, []]
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}