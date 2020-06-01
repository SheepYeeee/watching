import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 老師登入
   *
   * @param {object} login 老師登入所需的學號、IP
   * @returns
   * @memberof TeacherService
   */
  teacherLogin(login: object) {
    return this.http.post(`${environment.baseUrl}/teacher/teacherLogin`, login);
  }

  /**
   * 老師刷新token
   *
   * @param {*} httpOptions
   * @returns {Observable<any>}
   * @memberof TeacherService
   */
  refreshTeacherToken(): Observable<any> {
    return this.http.put(`${environment.baseUrl}/teacher/refresh/token`, {})
  }

  /**
   * 老師開啟考場
   *
   * @param {object} examInfo 老師設定的考場資訊
   * @returns
   * @memberof TeacherService
   */
  openExam(examInfo: object) {
    return this.http.post(`${environment.baseUrl}/teacher/openExam`, examInfo);
  }

  /**
   * 老師查看考試紀錄
   *
   * @returns
   * @memberof TeacherService
   */
  recordList() {
    return this.http.get(`${environment.baseUrl}/teacher/recordList`);
  }

  /**
   * 教師端接收作弊log&圖片
   *
   * @memberof TeacherService
   */
  examLog() {
    return this.http.get(`${environment.baseUrl}/teacher/examLog`);
  }

  /**
   * 教師端查看考場名單
   *
   * @memberof TeacherService
   */
  examStudentList() {
    return this.http.get(`${environment.baseUrl}/teacher/examStudentList`);
  }

  /**
   * 教師延長考試
   *
   * @returns
   * @memberof TeacherService
   */
  extendExam(examInfo: object) {
    return this.http.put(`${environment.baseUrl}/teacher/extendExam`, examInfo);
  }

  /**
   * 教師關閉考場
   *
   * @returns
   * @memberof TeacherService
   */
  closeExam(examInfo: object) {
    return this.http.put(`${environment.baseUrl}/teacher/closeExam`, examInfo);
  }

}
