import { Component } from '@angular/core';
import { LoaderService } from './_service/loader-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-project';

  isLoading: Subject<boolean> = this.loader.isLoading;
  constructor(private loader: LoaderService,) {

  }
}
