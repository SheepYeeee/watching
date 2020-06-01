import {Component, OnInit} from '@angular/core';

interface MyVideoElement extends HTMLVideoElement {
  requestPictureInPicture(): any;
}

interface MyDocument extends Document {
  exitPictureInPicture(): any;
}

@Component({
  selector: 'app-studentExamScreen',
  moduleId: module.id,
  templateUrl: 'studentExamScreen.component.html'
})


export class StudentExamScreenComponent implements OnInit {
  isShownAlert: Boolean = false;
  ngOnInit() {
    const video = <MyVideoElement>document.querySelector('#videoElement');

    let flag = true;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log('Something went wrong!');
        });
    }

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
  }

}
