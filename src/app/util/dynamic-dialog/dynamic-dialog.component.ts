import {AfterViewInit, Component, ComponentRef, Inject, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoadableComponent} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html'
})
export class DynamicDialogComponent implements AfterViewInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef,static: false }) viewContainerRef: ViewContainerRef;

  componentRef: ComponentRef<LoadableComponent>;

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { component: Type<any>, inputs: any }
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.viewContainerRef.createComponent<LoadableComponent>(this.data.component);

    // Set data
    this.componentRef.instance.setData(this.data.inputs);
  }

  onSubmit() {
    this.dialogRef.close(DialogResponse.NO);
  }

  handleNo() {
    this.dialogRef.close(DialogResponse.YES)
  }
}

export enum DialogResponse {
  YES = "YES",
  NO = "NO"
}
