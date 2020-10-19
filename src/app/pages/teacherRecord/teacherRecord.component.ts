import { Component, OnInit } from '@angular/core';
import { DataRows } from '../../models/recordList.model';
import { StudentService } from '../../services/student.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
    selector: 'app-teacher-record',
    templateUrl: 'teacherRecord.component.html'
})

export class TeacherRecordComponent implements OnInit {


  /** 紀錄列表 */
  records: DataRows[];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
  ) { }


  ngOnInit() {
      this.teacherGetRecordList();
  }


  /**
   * 教師查看考試紀錄
   *
   * @memberof RecordComponent
   */
  teacherGetRecordList() {
    // 教師查看考試紀錄
    this.teacherService.recordList()
    .subscribe(
      (data: DataRows[]) => {
        this.records = data;
      }
    )
  }
}
