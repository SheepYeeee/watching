import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StudentService } from '../../services/student.service';
import { CheatDetectModel } from './model/combine-model';

interface MyVideoElement extends HTMLVideoElement {
  requestPictureInPicture(): any;
}

interface MyDocument extends Document {
  exitPictureInPicture(): any;
}

@Component({
  selector: 'app-studentExamScreen',
  templateUrl: 'studentExamScreen.component.html'
})


export class StudentExamScreenComponent implements OnInit {

  isShownAlert: Boolean = false;
  display = false;
  examData: any;
  sTtConnection: any;
  status: string;
  time: string;


  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.examData = {
      examName: localStorage.getItem('examName'),
      examStartTime: localStorage.getItem('examStartTime'),
      examEndTime: localStorage.getItem('examEndTime'),
    }

    let studentService = this.studentService;
    function cheatLog(cheat: any) {
      studentService.cheatLog(localStorage.getItem('teacherIp'), cheat)
        .subscribe(
          (data: any) => {
            console.log(data)
          }
        )
    }

    let cheatDetectModel = new CheatDetectModel('videoElement', 'facePainting', 'facePainting', cheatLog);
    cheatDetectModel.bindPage();

    // 學生對老師之連線狀態
    this.sTtConnection = interval(1000)
      .pipe(switchMap((_: number) => this.studentService.sTtConnection(localStorage.getItem('teacherIp'))))
      .subscribe(
        (data: any) => {
          this.status = data.connectionStatus;
          this.time = data.connectionTime;
        },
        (error: any) => console.log(error)
      );

    const video = <MyVideoElement>document.querySelector('#videoElement');

    let flag = true;
    let thisStudentExamScreenComponent = this;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log('Something went wrong!');
        });
    }
    // 浮窗按鈕
    $('#pip-request').on('click', () => {
      if (flag) {
        video.requestPictureInPicture();
        flag = false;
      } else {
        const mydocument = <MyDocument>document;
        mydocument.exitPictureInPicture();
        flag = true;
      }
    })

    //切換靈敏度
    $('#sensitivity').on('change', function (e) {
      // console.log(thisStudentExamScreenComponent);

      /** 切換靈敏度所傳入的資料 */
      const info: object = {
        sensitivity: $('#sensitivity').val(),
      }
      // 學生切換靈敏度
      thisStudentExamScreenComponent.studentService.setSensitivity(info)
        .subscribe(
          (data: any) => {
            console.log(`${data.message}`);
          }
        )
    });
  }
}
