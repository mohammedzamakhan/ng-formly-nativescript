import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyValidationMessages } from '../core/core';

@Component({
  selector: 'formly-validation-message',
  template: `<Label [text]="errorMessage" class="formly-validation-message"></Label>`,
})
export class FormlyValidationMessage {
  @Input() fieldForm: FormControl;
  @Input() field: FormlyFieldConfig;

  constructor(private formlyMessages: FormlyValidationMessages) {}

  get errorMessage() {
    for (let error in this.fieldForm.errors) {
      if (this.fieldForm.errors.hasOwnProperty(error)) {
        let message = this.formlyMessages.getValidatorErrorMessage(error);
        ['validators', 'asyncValidators'].map(validators => {
          if (this.field[validators] && this.field[validators][error] && this.field[validators][error].message) {
            message = this.field.validators[error].message;
          }
        });

        if (typeof message === 'function') {
          return message(this.fieldForm.errors[error], this.field);
        }

        return message;
      }
    }
  }
}
