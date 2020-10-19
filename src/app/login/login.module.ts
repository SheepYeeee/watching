import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})

export class LoginModule {}
