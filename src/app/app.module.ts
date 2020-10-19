import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from './sidebar/sidebar.module';
import { MessageModalModule } from './message_modal/message_modal.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './middlewares/http-error.interceptor';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment.prod';

import { ModalService } from './services/modal.service';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authGuard.service';

export function tokenGetter() {
  return localStorage.getItem(`${environment.keyOfToken}`);
}


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAccordionModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    HttpClientModule,
    MessageModalModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthGuard,
    ModalService,
    TeacherService,
    StudentService,
    AuthService,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
