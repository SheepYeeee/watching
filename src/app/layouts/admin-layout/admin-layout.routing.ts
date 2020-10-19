import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OpenExamComponent } from '../../pages/openExam/openExam.compontent';
import { EnterExamComponent } from '../../pages/enterExam/enterExam.component';
import { TeacherExamScreenComponent } from '../../pages/teacherExamScreen/teacherExamScreen.component';
import { StudentRecordComponent } from '../../pages/studentRecord/studentRecord.component';
import { TeacherRecordComponent } from '../../pages/teacherRecord/teacherRecord.component';
import { StudentExamScreenComponent } from '../../pages/studentExamScreen/studentExamScreen.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'openExam',          component: OpenExamComponent },
    { path: 'enterExam',          component: EnterExamComponent },
    { path: 'teacherRecord',          component: TeacherRecordComponent },
    { path: 'studentRecord',          component: StudentRecordComponent },
    { path: 'teacherExamScreen',          component: TeacherExamScreenComponent },
    { path: 'studentExamScreen',          component: StudentExamScreenComponent },
];
