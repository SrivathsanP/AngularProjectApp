import { Component } from '@angular/core';
import { CoreService } from 'src/app/_service/core.service';
import { FormComponent } from '../form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from '../../_service/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data: any = [];
  isDarkMode: boolean = false;
  
  constructor(
    private coreService: CoreService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.getDarkMode();
  }
  
  ngOnInit() {
    this.loadData();
  }
 
  
  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  
  loadData() {
    this.coreService.getData('loginActivity').subscribe(res => {
      this.data = res;
    });
  }
  
  edit(editData: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: { editData },
      width: '60%',
      panelClass: 'editForm'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  deleteData(id: string) {
    let text = 'Are you sure you want to delete?';
    if (confirm(text)) {
      this.coreService.deleteData('loginActivity/' + id).subscribe(res => {
        this.snackbar.open('Data deleted successfully', 'close');
        this.loadData();
      });
    }
  }
}
