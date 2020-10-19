import {Component, OnInit} from '@angular/core';
import { StudentService } from '../../services/student.service';

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

  
  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    const video = <MyVideoElement>document.querySelector('#videoElement');

    let flag = true;
    let thisStudentExamScreenComponent = this;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
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
    $('#sensitivity').on('change', function(e){
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
