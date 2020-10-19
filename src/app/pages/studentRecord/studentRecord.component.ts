import { Component, OnInit } from '@angular/core';
import { DataRows } from '../../models/recordList.model';
import { StudentService } from '../../services/student.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
    selector: 'app-student-record',
    templateUrl: 'studentRecord.component.html'
})

export class StudentRecordComponent implements OnInit {


  /** 紀錄列表 */
  records: DataRows[];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
  ) { }


  ngOnInit() {
      this.studentGetRecordList();
  }

  /**
   * 學生查看考試紀錄
   *
   * @memberof RecordComponent
   */
  studentGetRecordList() {
      // 學生查看考試紀錄
      this.studentService.recordList()
      .subscribe(
        (data: DataRows[]) => {
          this.records = data;
        }
      )
  }

}
