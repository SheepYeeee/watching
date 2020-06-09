import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
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
  enterExam(examInfo: object) {
    return this.http.post(`${environment.baseUrl}/student/enterExam`, examInfo);
  }

  /**
   * 學生查看考試紀錄
   *
   * @memberof StudentService
   */
  recordList() {
    return this.http.get(`${environment.baseUrl}/student/recordList`);
  }


}
