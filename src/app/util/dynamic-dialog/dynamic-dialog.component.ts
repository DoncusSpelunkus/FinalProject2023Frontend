import {Component, ComponentRef, Inject, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoadableComponent} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html'
})
export class DynamicDialogComponent implements OnInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  componentRef: ComponentRef<LoadableComponent>;

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { component: Type<any>, inputs: any }
  ) {}

  ngOnInit() {
    const componentRef = this.viewContainerRef.createComponent<LoadableComponent>(this.data.component);
    this.componentRef = componentRef;

    // Assign input data to the dynamically loaded component
    Object.assign(componentRef.instance, this.data.inputs);

    this.componentRef.instance.submit.subscribe(data => this.onSubmit(data));
    this.componentRef.instance.cancel.subscribe(() => this.onCancel());
  }

  private onSubmit(data: any) {
    // Handle submit logic
    this.dialogRef.close(data);
  }

  private onCancel() {
    // Handle cancel logic
    this.dialogRef.close();
  }
}
