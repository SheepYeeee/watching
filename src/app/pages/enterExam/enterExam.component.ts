import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { environment } from '../../../environments/environment.prod';
import { Student } from '../../models/student.model';
import { Modal } from '../../models/modal.model';
import { ModalService } from '../../services/modal.service';


@Component({
    selector: 'app-enterexam',
    templateUrl: 'enterExam.component.html'
})

export class EnterExamComponent implements OnInit {

  /** 引入 Student model 的資料型別 */
  student: Student = {
    studentId: '',
    examToken: ''
  }
  /** 進入考場的表單 */
  enterExamForm: any = this.fb.group({
    studentName: ['', Validators.required],
    studentId: ['', Validators.required],
    // studentIP: ['', Validators.required],
    teacherIP: ['', Validators.required]
  });

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  // 幫enterExamForm取個簡短的代號
  get f() { return this.enterExamForm.controls; }


  /**
   * 進入考場
   */
  enterExam() {

    /** 進入考場所傳入的資料 */
    const examInfo: object = {
      studentName: this.f.studentName.value,
      studentId: this.f.studentId.value,
      // studentIP: this.f.studentIP.value,
      teacherIP: this.f.teacherIP.value,
    }

    // 學生進入考場
    this.studentService.enterExam(examInfo)
      .subscribe(
        (data: any) => {
          this.student.examToken = data;
          localStorage.setItem(`${environment.keyOfExamToken}`, this.student.examToken);
          localStorage.setItem('examId', data.examID);
          localStorage.setItem('examName', data.examName);
          localStorage.setItem('examStartTime', data.examStartTime);
          localStorage.setItem('examEndTime', data.examEndTime);
          localStorage.setItem('teacherIp', this.f.teacherIP.value);

          this.openMessageModal(`成功進入考場，考試時間為${data.examStartTime} ~ ${data.examEndTime}`);
          
          setTimeout(() => {
            this.router.navigate(['studentExamScreen']);
          }, 500);
        }
      )
  }

  /**
   * 開啟 messageModal
   *
   * @param {string} message
   * @memberof HttpErrorInterceptor
   */
  openMessageModal(message: string) {
    /** modaleOptions */
    const modalOptions: Modal = {
        icon: 'icon',
        message: message
    }

    // 開啟 Modal
    this.modalService.open(modalOptions);
  }

}
