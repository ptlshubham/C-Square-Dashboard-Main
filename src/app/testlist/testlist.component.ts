import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Subject } from 'app/manage/subject/subject.model';
import { RegisterService } from 'app/register/register.service';
declare var $: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.css']
})
export class TestlistComponent implements OnInit {
  submittedTest: any = [];
  public subjects: Subject[] = [];
  studentId: number = 0;
  subId: any;
  selectedSub: any;
  sub: any;
  disptest: any = [];
  viewTest: boolean = false;
  clickViewTest: boolean = false;
  clickTest: boolean = false;
  questions: any = [];
  testName: any;
  selectedStd: any;
  saveresult: any = {};
  stdid: any;
  public testTable: DataTable;
  constructor(
    private registerService: RegisterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.studentId = res.val;
      this.subId = res.val1;
      this.selectedStd = res.selstd;
      this.stdid = res.stdid;
      debugger
      this.getSubjectList();
    })
  }

  ngOnInit(): void {
    this.clickTest = true;
    this.getSubmittedTest();
  }
  ngAfterViewInit() {
    "use strict";
    $('#datatable').DataTable({

      "pagingType": "full_numbers",
      "lengthMenu": [
        [5, 10, 25, -1],
        [5, 10, 25, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    var table = $('#datatable').DataTable();

    // table.on('click', '.like', function () {
    //   alert('You clicked on Like button');
    // });
  }

  backTosubject() {
    this.clickTest = true;
    this.clickViewTest = false;
    this.viewTest = false;
  }
  backToRegister() {
    this.router.navigate(['/register'], {
      queryParams: {
        val: 'Student',
        // val1: this.selectedStd
      }
    })
  }
  getSubjectList() {
    this.registerService.getSubjectByID(this.subId).subscribe((data: any) => {
      this.subjects = data;
      // this.subjects.forEach(element => {
      //   this.questionService.getAllQuestion(element.id).subscribe((res: any) => {
      //     element.question = res;
      //     element.color = '3px 3px 5px 5px #ebf0ec';

      //   })
      // })
    });
  }
  getSubmittedTest() {
    this.registerService.getTestByStd(this.studentId, this.subId).subscribe((data: any) => {
      this.submittedTest = data;
      this.submittedTest.forEach(element => {
        if (element.testid != null && element.subid != null) {
          let data = {
            testid: element.testid,
            subid: element.subid,
            stuid: this.studentId
          }
          this.registerService.getTotalObtainMarks(data).subscribe((res: any) => {
            element.marks = res;
          });
          this.registerService.getStatusOfTest(data).subscribe((res: any) => {
            element.status = res;
            debugger
          })
        }
      });

    });
  }
  openTestList(sub) {
    debugger
    this.subjects.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #ef8157';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.clickViewTest = true;
    this.disptest = [];
    this.submittedTest.forEach(element => {
      if (element.subid == sub.id) {
        this.disptest.push(element);
      }
    });
    this.testTable = {
      headerRow: ['#', 'Student', 'Test Name', 'Total Marks', 'Get Marks', 'Status', 'Actions'],
      footerRow: ['#', 'Student', 'Test Name', 'Total Marks', 'Get Marks', 'Status', 'Actions'],
      dataRows: this.disptest
    };
  }

  cancelTest() {
    this.clickTest = true;
    this.clickViewTest = true;
    this.viewTest = false;
  }
  getTestList(data) {
    this.testName = data.testname;
    this.clickTest = false;
    this.clickViewTest = false;
    this.viewTest = true;
    this.saveresult.testid = data.testid;
    this.saveresult.subid = data.subid;
    this.saveresult.stdid = data.id;
    this.saveresult.studentid = data.studentid;
    this.registerService.getTestforChecking(data.testid, this.studentId).subscribe((res: any) => {
      this.questions = res;
      this.questions.forEach(element => {
        element.obtainmarks = '';
        element.remark = '';
      });
    })
  }

  submitTestChecking() {
    this.saveresult.question = this.questions;
    this.registerService.savetestresult(this.saveresult).subscribe((res: any) => {
      this.clickTest = true;
      this.clickViewTest = true;
      this.viewTest = false;
      this.apiService.showNotification('top', 'right', 'Marks and Remrks Successfully saved.', 'success');
    })

  }
}
