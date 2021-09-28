import { ManageModule } from './../manage/manage.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageService } from '../manage/manage.service';
import { Std } from '../manage/standard/standard.model';
import { Subject } from '../manage/subject/subject.model';
import { ExamService } from './exam.service';
import { Question } from 'app/question/question.model';
import { ApiService } from 'app/api.service';
declare var $: any;
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})


export class ExamComponent implements OnInit {

  data = {
    questions: [
      {
        id: 1,
        question: 'What is Angular?',
        options: [
          "Front End Framework",
          "JavaScript Latest Version",
          "Back End Framework",
          "Library"
        ],
        answers: ["Front End Framework"],
        isMultiChoice: false,
        isMCQ: true
      },
      {
        id: 2,
        question: 'What is DJango?',
        options: [
          "Back End Framework",
          "Python Framework",
          "PHP Framework",
          "Library"
        ],
        answers: [
          "Back End Framework",
          "Python Framework"
        ],
        isMultiChoice: true,
        isMCQ: true
      },
      {
        id: 3,
        question: 'Explain what is Vue.js.',
        isMultiChoice: false,
        isMCQ: false
      },
      {
        id: 4,
        question: 'Explain what is Routing in detail.',
        isMultiChoice: false,
        isMCQ: false
      }
    ]
  };

  tests = [
    {
      id: 1,
      stdId: 1,
      subject: 'Network',
      title: 'CCNA - 1',
      totalQuestions: 2,
      totalMarks: 30,
      totalDuration: 30,
      quizQuestions: [1, 2]
    },
    {
      id: 2,
      stdId: 1,
      subject: 'Computer',
      title: 'Angular Demo Test',
      totalQuestions: 2,
      totalMarks: 30,
      totalDuration: 30,
      quizQuestions: [2, 3]
    },
    {
      id: 3,
      stdId: 1,
      subject: 'Network',
      title: 'CCNP - 1',
      totalQuestions: 2,
      totalMarks: 30,
      totalDuration: 30,
      quizQuestions: [3, 4]
    },
    {
      id: 4,
      stdId: 1,
      subject: 'Computer',
      title: 'React Test',
      totalQuestions: 2,
      totalMarks: 30,
      totalDuration: 30,
      quizQuestions: [1, 4]
    }
  ];
  public questionModel: Question = new Question;
  public standards: Std[] = [];
  public subjects: Subject[] = [];
  stdId: any;
  selectedStd: any;
  selectedSubject: any;
  selectedTest: any;
  defaultStandard: any;
  public TestList: Question[] = [];
  queList: any;
  selectedSubId: any;
  filterTests = [];
  filterQuestions = [];
  selectedTestData: any;
  public testTable: DataTable;

  ruleBoxFlag: boolean = false;
  questionBoxFlag: boolean = false;
  testInfoBoxFlag: boolean = false;

  constructor(
    private manageService: ManageService,
    private examService: ExamService,
    private apiService: ApiService
  ) {
    this.getStdList();
    // this.selectSTDList(this.defaultStandard);
    // this.getSubject(this.stdId);
  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
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

    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
  }

  selectTest(id) {
    this.filterQuestions = [];
    this.filterTests.forEach(element => {
      if (element.id == id) {

        this.selectedTest = element.title;
        this.testInfoBoxFlag = true;

        this.selectedTestData = {
          id: element.id,
          title: element.title,
          totalQuestions: element.totalQuestions,
          totalMarks: element.totalMarks,
          totalDuration: element.totalDuration
        }

        for (var i = 0; i < element.quizQuestions.length; i++) {
          for (var j = 0; j < this.data.questions.length; j++) {
            if (element.quizQuestions[i] == this.data.questions[j].id) {
              this.filterQuestions.push(this.data.questions[j])
            }
          }
        }

      }
    })
  }

  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.standards = data;
      this.defaultStandard = this.standards[0].id;
    });
  }

  selectSTDList(id) {
    this.testInfoBoxFlag = false;
    this.stdId = id;
    this.getSubject(this.stdId);
    this.standards.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;

      }
    })
  }

  getSubject(id) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;
    });
  }

  selectSubjectList(id) {
    this.selectedSubId = id;
    this.testInfoBoxFlag = false;
    this.stdId = id;
    this.filterTests = [];
    this.filterQuestions = [];
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
        this.getTestList();
      }
    });
    for (var i = 0; i < this.tests.length; i++) {
      if (this.tests[i].subject == this.selectedSubject) {
        this.filterTests.push(this.tests[i])
      }
    }
  }

  showRulesBox() {
    this.ruleBoxFlag = true;
  }

  showQuestionsBox() {
    this.ruleBoxFlag = false;
    this.questionBoxFlag = true;
  }
  getTestList() {
    this.examService.getTest(this.selectedSubId).subscribe((data: any) => {
      this.TestList = data;
      for (let i = 0; i < this.TestList.length; i++) {
        this.TestList[i].index = i + 1;
      }
    });
  }
  ViewTestQue(val) {
    this.examService.getViewTest(val.id).subscribe((data: any) => {
      this.queList = data;
      for (let i = 0; i < this.queList.length; i++) {
        this.queList[i].index = i + 1;
      }
      this.questionModel = val;
      this.questionModel.totalque = data.length;
      this.questionModel.subname = this.selectedSubject;
      this.questionModel.stdname = this.selectedStd;
    });
  }
  SendLinkToStudent(id) {
    this.examService.updateSendLinkToStudent(id).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Test Link Sent Successfully.', 'success');
      this.getTestList();
    })
  }
}
