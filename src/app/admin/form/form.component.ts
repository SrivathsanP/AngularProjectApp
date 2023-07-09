import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/_service/core.service';
import { ThemeService } from '../../_service/theme.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  editForm !: FormGroup;
  isLoading = false;
  isDarkMode: boolean = false;
  constructor(public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private coreService: CoreService, private snackBar: MatSnackBar) {
}

  ngOnInit() {
    this.initForm()
  }
 
  initForm() {
    this.editForm = this.fb.group({
      user_name: [this.data.editData.name ?? '', [Validators.required, Validators.email]],
      date: [new Date(this.data.editData.date) ?? '', [Validators.required]],
      type: [this.data.editData.type ?? '', [Validators.required]],
    })
  }
  formSubmitHandler() {
    var sendData = {
      name: this.editForm.value.user_name,
      date: new Date(this.editForm.value.date).toISOString(),
      type: this.editForm.value.type,
    }
    this.coreService.patchData('loginActivity/' + this.data.editData.id, sendData).subscribe((res) => {
      this.snackBar.open('Data Updated Successfully!', 'Success');
      this.dialogRef.close(true)
    }, () => {
      this.snackBar.open('Something went Wrong!', 'Error');
      this.dialogRef.close(false)

    })
  }
}
