import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OpenExamComponent } from 'app/pages/openExam/openExam.compontent';
import { EnterExamComponent } from 'app/pages/enterExam/enterExam.component';
import { TeacherExamScreenComponent } from 'app/pages/teacherExamScreen/teacherExamScreen.component';
import { StudentRecordComponent } from 'app/pages/studentRecord/studentRecord.component';
import { TeacherRecordComponent } from 'app/pages/teacherRecord/teacherRecord.component';
import { StudentExamScreenComponent } from 'app/pages/studentExamScreen/studentExamScreen.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'openExam',          component: OpenExamComponent },
    { path: 'enterExam',          component: EnterExamComponent },
    { path: 'teacherRecord',          component: TeacherRecordComponent },
    { path: 'studentRecord',          component: StudentRecordComponent },
    { path: 'teacherExamScreen',          component: TeacherExamScreenComponent },
    { path: 'studentExamScreen',          component: StudentExamScreenComponent },
];
