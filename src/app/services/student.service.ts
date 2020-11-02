import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   *
   * 學生登入
   * @param {object} login 學生登入所需的學號、IP
   * @returns
   * @memberof StudentService
   */
  studentLogin(login: object) {
    return this.http.post(`${environment.baseUrl}/student/studentLogin`, login);
  }

  /**
   *
   * 刷新token
   * @param {*} httpOptions
   * @returns {Observable<any>}
   * @memberof StudentService
   */
  refreshStudentToken(): Observable<any> {
    return this.http.put(`${environment.baseUrl}/n`, {})
  }

  /**
   * 學生進入考場
   *
   * @param {object} examInfo 學生欲進入考場之考場資訊
   * @returns
   * @memberof StudentService
   */
  enterExam(examInfo: any) {
    console.log(examInfo)
    return this.http.post(`http://${examInfo.teacherIP}:3000/watching/api/v1/student/enterExam`, examInfo);
  }


  /**
   * 學生端與教師端確認連現狀控
   * @memberof StudentService
   * @param examInfo 
   */
  sTtConnection(teacherIP: string) {
    return this.http.get(`http://${teacherIP}:3000/watching/api/v1/student/sTtConnection`);
  }

  /**
   * 學生端傳送作弊訊息給教師端
   * @memberof StudentService
   * @param examInfo 
   */
  cheatLog(teacherIP: string,cheat: any) {
    console.log(teacherIP);
    console.log(cheat);
    return this.http.post(`http://${teacherIP}:3000/watching/api/v1/teacher/cheatPic`, cheat);
  }

  /**
   * 學生切換靈敏度
   * @memberof StudentService
   * @param examInfo 
   */
  setSensitivity(examInfo: object) {
    return this.http.get(`${environment.baseUrl}/student/setSensitivity`, examInfo);
  }


}
