import { Component, OnInit, OnDestroy } from '@angular/core';

import { TeacherService } from '../../services/teacher.service';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { ExamInfo } from '../../models/examInfo.model';
import { Modal } from '../../models/modal.model';
import { ModalService } from '../../services/modal.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Observable, interval } from 'rxjs';
import { Router } from '@angular/router';



@Component({
    selector: 'app-teacherExamScreen',
    templateUrl: 'teacherExamScreen.component.html'
})

export class TeacherExamScreenComponent implements OnInit, OnDestroy {

    public intervallTimer = interval(5000);
    examData: any;
    tableData: ExamInfo;
    studentList: any;
    LogList: any;
    isEndTime: any;
    destroy$: Subject<boolean> = new Subject<boolean>();
    destroyLog$: Subject<boolean> = new Subject<boolean>();
   
    

    /** 老師延長考試的表單 */
    extendExamForm: any = this.fb.group({
      examEndTime: ['', Validators.required],
    });

    constructor(
      private teacherService: TeacherService,
      private fb: FormBuilder,
      private modalService: ModalService,
      private router: Router,
    ) { }

    ngOnInit() {
        this.tableData = {
            headerRow: [ '連線狀態', 'IP位址', '學生姓名', '學生學號', '擷取時間', '作弊機率', '操作'],
            dataRows: [
                {
                  connectionStatus: '良好', ip: '192.168.1.21', studentName: '王小明',
                  studentId: '12345678', timestamp: '2020/06/06 20:15', probability: '30%'},
                {
                  connectionStatus: '良好', ip: '192.168.1.1', studentName: '陳小凡',
                  studentId: '87654321', timestamp: '2020/06/06 10:51', probability: '50%'},
                {
                  connectionStatus: '良好', ip: '192.168.1.36', studentName: '李小三',
                  studentId: '14725836', timestamp: '2020/06/06 13:37', probability: '30%'}
            ]
        }
        this.examData = {
          examName: localStorage.getItem('examName'),
          examStartTime: localStorage.getItem('examStartTime'),
          examEndTime: localStorage.getItem('examEndTime'),
          examCount: localStorage.getItem('examCount')
        }

        // 監聽考場學生名單
        this.studentList = interval(1000)
          .pipe(switchMap((_: number) => this.teacherService.examStudentList()))
          .subscribe(
            (data: any) => console.log(data),
            (error: any) => console.log(error)
          );

        // 監聽考場log
        this.LogList = interval(1000)
          .pipe(switchMap((_: number) => this.teacherService.examLog()))
          .subscribe(
            (data: any) => console.log(data),
            (error: any) => console.log(error)
          );

        // 監聽考場結束了沒
        this.isEndTime = interval(1000)
          .pipe(switchMap((_: number) => this.teacherService.isExamFinish()))
          .subscribe(
            (data: any) => {
              if(data.message===true){
                this.studentList.unsubscribe();
                this.LogList.unsubscribe();
                this.isEndTime.unsubscribe();
                this.openMessageModal(`考試時間結束!`);
              }
              
            },
            (error: any) => console.log(error)
          );

    }

    ngOnDestroy() {
      this.destroy$.next(true);
      // Unsubscribe from the subject
      this.destroy$.unsubscribe();

      this.destroyLog$.next(true);
      // Unsubscribe from the subject
      this.destroyLog$.unsubscribe();
    }


    // 幫Form取個簡短的代號
    get ef() { return this.extendExamForm.controls; }

    /**
     * 延長考試
     *
     * @memberof TeacherExamScreenComponent
     */
    extendExam() {
      /** 老師延長考試所傳入的資料 */
      const examInfo: any = {
        examId: localStorage.getItem(`${environment.examId}`),
        examEndTime: this.ef.examEndTime.value,
      }
      // 延長考試
      this.teacherService.extendExam(examInfo)
      .subscribe(
        (data: any) => {
          localStorage.setItem('examEndTime', this.ef.examEndTime.value);
          this.openMessageModal(`${data.message.message}，
          考試時間變更為${localStorage.getItem('examStartTime')}~${localStorage.getItem('examEndTime')}`);
        }
      )
    }

    /**
     * 關閉考場
     *
     * @memberof TeacherExamScreenComponent
     */
    closeExam() {

      const endTime = new Date();

      /** 老師延長考試所傳入的資料 */
      const examInfo: any = {
        examId: localStorage.getItem(`${environment.examId}`),
        examEndTime:  (endTime.getHours().toString()) + ':' + (endTime.getMinutes().toString()),
      }
      console.log(examInfo.examEndTime);
      // 關閉考場
      this.teacherService.closeExam(examInfo)
      .subscribe(
        (data: any) => {
          localStorage.setItem('examEndTime', (endTime.getHours().toString()) + ':' + (endTime.getMinutes().toString()));
          this.openMessageModal(`${data.message.message}`);

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
