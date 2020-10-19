import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Teacher } from '../models/teacher.model';
import { Validators, FormBuilder } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    /** 引入 Student model 的資料型別 */
    student: Student = {
      token: ''
    }

    /** 引入 Teacher model 的資料型別 */
    teacher: Teacher = {
      token: ''
    }

    /** 學生登入的表單 */
    studentForm: any = this.fb.group({
      studentName: ['', Validators.required],
      studentId: ['', Validators.required],
    });

    /** 老師登入的表單 */
    teacherForm: any = this.fb.group({
      teacherName: ['', Validators.required],
    });

    /** 標題 */
    title: String = '選擇身分';

    /** 顯示、隱藏 各個div */
    isShownChoice: Boolean = true ;
    isShownStudent: Boolean = false ;
    isShownTeacher: Boolean = false ;
    btnBack: Boolean = false;

    constructor(
      private teacherService: TeacherService,
      private studentService: StudentService,
      private authService: AuthService,
      private fb: FormBuilder,
      private router: Router
    ) { }

    ngOnInit() {
      this.checkLogin();
    }
  /**
   * 檢查登入狀態
   *
   * @memberof LoginComponent
   */
  checkLogin() {
    if (this.authService.isAuthenticated() === true) {
      this.router.navigate(['dashboard']);
    }
  }

  /**
   * 選擇教師登入
   *
   * @memberof LoginComponent
   */
  choiceTeacher() {
    this.title = '教師登入';
    this.isShownChoice = ! this.isShownChoice;
    this.isShownTeacher = ! this.isShownTeacher;
    this.btnBack = ! this.btnBack;
  }
  /**
   * 選擇學生登入
   *
   * @memberof LoginComponent
   */
  choiceStudent() {
    this.title = '學生登入';
    this.isShownChoice = ! this.isShownChoice;
    this.isShownStudent = ! this.isShownStudent;
    this.btnBack = ! this.btnBack;
  }
  /**
   * 返回選擇身分
   *
   * @memberof LoginComponent
   */
  btnBackToChoice() {
    this.title = '選擇身分';
    this.isShownChoice = true;
    this.isShownTeacher = false;
    this.isShownStudent = false;
    this.btnBack = false;
  }

  // 幫Form取個簡短的代號
  get sf() { return this.studentForm.controls; }
  get tf() { return this.teacherForm.controls; }

  /**
   * 學生登入
   *
   * @memberof LoginComponent
   */
  studentLogin() {

    /** 學生登入所傳入的資料 */
    const loginInfo: any = {
      studentName: this.sf.studentName.value,
      studentId: this.sf.studentId.value,
    }

    // 學生登入
    this.studentService.studentLogin(loginInfo)
      .subscribe(
        (data: any) => {
          this.student.token = data.token;
          localStorage.setItem(`${environment.keyOfToken}`, this.student.token);
          localStorage.setItem(`${environment.keyOfStudentId}`, loginInfo.studentId);
          localStorage.setItem(`${environment.keyOfStudentName}`, loginInfo.studentName);
          localStorage.setItem(`${environment.auth}`, '1');
          this.router.navigate(['enterExam']);
        }
      )
  }

  /**
   * 教師登入
   *
   * @memberof LoginComponent
   */
  teacherLogin() {

    /** 教師登入所傳入的資料 */
    const loginInfo: any = {
      teacherName: this.tf.teacherName.value,
    }

    // 教師登入
    this.teacherService.teacherLogin(loginInfo)
      .subscribe(
        (data: any) => {
          this.teacher.token = data.token;
          localStorage.setItem(`${environment.keyOfToken}`, this.teacher.token);
          localStorage.setItem(`${environment.keyOfTeacherName}`, loginInfo.teacherName);
          localStorage.setItem(`${environment.auth}`, '9');
          this.router.navigate(['openExam']);
        }
      )
  }



}
