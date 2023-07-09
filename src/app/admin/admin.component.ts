import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../_service/loader-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  count=0;
  theme='light';
  addItem(newItem: any) {
    this.count = newItem
  }
  isLoading: Subject<boolean> = this.loader.isLoading;
  constructor(private loader: LoaderService,) {

  }
}
