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
  isValid = false; // keep track if the form inside of dialog is valid

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { component: Type<any>, inputs: any }
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.viewContainerRef.createComponent<LoadableComponent>(this.data.component);

    // Set data
    if (this.data.inputs) {
      this.componentRef.instance.setData(this.data.inputs);
    }
    this.componentRef.instance.isValidEmitter.subscribe(isValid => {
      this.isValid = isValid
    })
  }

  onSubmit() {
    this.componentRef.instance.submit();
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
