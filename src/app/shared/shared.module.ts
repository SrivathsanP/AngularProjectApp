import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,MaterialModule
  ],
  exports:[ChatComponent,MaterialModule],
})
export class SharedModule { }
