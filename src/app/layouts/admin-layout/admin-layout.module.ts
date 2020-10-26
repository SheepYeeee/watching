import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCraftPortfolioComponent } from '../../pages/addCraftPortfolio/addCraftPortfolio.component';
import { OpenExamComponent } from '../../pages/openExam/openExam.compontent';
import { EnterExamComponent } from '../../pages/enterExam/enterExam.component';
import { TeacherExamScreenComponent } from '../../pages/teacherExamScreen/teacherExamScreen.component';
import { StudentRecordComponent } from '../../pages/studentRecord/studentRecord.component';
import { TeacherRecordComponent } from '../../pages/teacherRecord/teacherRecord.component';
import { StudentExamScreenComponent } from '../../pages/studentExamScreen/studentExamScreen.component';
import { CommonModule } from '@angular/common';
import { IndexComponent } from '../../pages/index/index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    OpenExamComponent,
    IndexComponent,
    EnterExamComponent,
    StudentRecordComponent,
    TeacherRecordComponent,
    TeacherExamScreenComponent,
    StudentExamScreenComponent,
    UserComponent,
    AddCraftPortfolioComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
