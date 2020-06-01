import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import { CraftPortfolioComponent } from 'app/pages/craftList/craftPortfolio.component';
import { AddCraftPortfolioComponent } from 'app/pages/addCraftPortfolio/addCraftPortfolio.component';
import { OpenExamComponent } from 'app/pages/openExam/openExam.compontent';
import { EnterExamComponent } from 'app/pages/enterExam/enterExam.component';
import { TeacherExamScreenComponent } from 'app/pages/teacherExamScreen/teacherExamScreen.component';
import { StudentRecordComponent } from 'app/pages/studentRecord/studentRecord.component';
import { TeacherRecordComponent } from 'app/pages/teacherRecord/teacherRecord.component';
import { StudentExamScreenComponent } from 'app/pages/studentExamScreen/studentExamScreen.component';

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
    EnterExamComponent,
    StudentRecordComponent,
    TeacherRecordComponent,
    TeacherExamScreenComponent,
    StudentExamScreenComponent,
    UserComponent,
    CraftPortfolioComponent,
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
