import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from "./layout/layout.module";
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadInterceptor } from '../_service/load-interceptor';
import { AuthInterceptor } from '../_service/auth-interceptor';


@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        FormComponent
    ],
    imports: [
        CommonModule, SharedModule,
        AdminRoutingModule, ReactiveFormsModule,
        LayoutModule
    ],
    providers:[

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadInterceptor, multi: true }

    ]
})
export class AdminModule { }
