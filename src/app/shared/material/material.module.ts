import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, MatChipsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,MatProgressSpinnerModule],
  exports: [MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, MatChipsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,MatProgressSpinnerModule],
})
export class MaterialModule { }
