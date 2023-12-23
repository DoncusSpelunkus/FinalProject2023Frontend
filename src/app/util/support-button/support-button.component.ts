import {Component, ElementRef, HostListener} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {emailValidator, valueRequired} from "../../../util/form-control-validators";

@Component({
  selector: 'app-support-button',
  templateUrl: './support-button.component.html'
})
export class SupportButtonComponent extends FormBuilding{
  isOpened = false;
  isSending = false;

  formGroup: FormGroup

  constructor(private elRef: ElementRef,
              private formBuiler: FormBuilder) {
    super();
    this.initializeFormGroup();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpened = false;
    }
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuiler.group({
      [FormControlNames.EMAIL]: ['',[emailValidator,valueRequired(FormControlNames.EMAIL)]],
      [FormControlNames.DESCRIPTION]: ['',[valueRequired(FormControlNames.DESCRIPTION)]]
    })
  }

  handleSendEmail() {
    if (!this.formGroup.valid) {
      return;
    }
    this.isSending = true;
    this.formGroup.reset();
    setTimeout(() => {
      this.isOpened = false;
      this.isSending = false;
    },3000);
  }
}
