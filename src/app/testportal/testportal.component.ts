import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ExamService } from 'app/exam/exam.service';
import { Question } from 'app/question/question.model';
import { AttemptTest } from './attempt.model';
import { SubmittedTest } from './submittest.model';
import { TestportalService } from './testportal.service';

@Component({
  selector: 'app-testportal',
  templateUrl: './testportal.component.html',
  styleUrls: ['./testportal.component.css']
})
export class TestportalComponent implements OnInit {
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
  public submitTestModel: SubmittedTest = new SubmittedTest;
  public attemptTestModel: AttemptTest = new AttemptTest;
  public attempt: AttemptTest[] = [];
  public studentTestList: Question[] = [];
  ruleBoxFlag: boolean = false;
  questionBoxFlag: boolean = false;
  testInfoBoxFlag: boolean = false;
  selectedTestData: any;
  queList: any;
  testId: any;
  public testModel: Question = new Question;
  constructor(
    private testportalService: TestportalService,
    private examService: ExamService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getStudentTest();
  }

  ngOnInit(): void {
  }
  getStudentTest() {
    this.examService.getActiveStudentTest().subscribe((data: any) => {
      this.studentTestList = data;

    });
  }
  studentTest(data) {

    this.testId = data.id
    // this.testModel.totalque = ;
    this.testModel.subject = data.subject;
    this.testModel.testname = data.testname;
    this.testModel.time = data.totalminute;
    this.testModel.marks = data.totalmarks;
    this.testInfoBoxFlag = true;
  }
  startStuentExam() {

    this.testInfoBoxFlag = false;
    this.ruleBoxFlag = false;
    this.questionBoxFlag = true;
    this.examService.getViewTest(this.testId).subscribe((data: any) => {
      this.queList = data;
      this.testportalService.updatePendingTest(this.testId).subscribe((req) => {
      })
      this.setStatusOfTest();
      this.queList.forEach(element => {
        if (element.quetype == 'MCQ') {
          this.examService.getOptionValue(element.id).subscribe((res: any) => {
            element.options = res;
            debugger
          })
        }
      });
    });
  }
  setStatusOfTest() {
    this.attemptTestModel.testid = this.testId;
    this.attemptTestModel.stuid = localStorage.getItem('UserId');
    this.attemptTestModel.status = 'start';
    this.testportalService.saveStatusOfTest(this.attemptTestModel).subscribe((response) => {
    })
  }
  showRulesBox() {
    this.questionBoxFlag = false;
    this.testInfoBoxFlag = false;
    this.ruleBoxFlag = true;
  }
  cancelExam() {
    this.testInfoBoxFlag = true;
    this.ruleBoxFlag = false;
    this.questionBoxFlag = false;
  }
  backPendingTest() {
    this.testInfoBoxFlag = false;
    this.ruleBoxFlag = false;
    this.questionBoxFlag = false;
  }
  onItemChange(mcq, que) {
    que.answer = mcq.optionlist;
    debugger
  }
  studentTestSubmit() {
    this.queList.forEach(element => {
      element.studentid = localStorage.getItem('UserId');
      element.testid = this.testId
    });
    this.testportalService.saveStudentTest(this.queList).subscribe((response) => {
      if (response == 'success') {
        this.updateStatusOfTest();
      }
     
    })

  }
  updateStatusOfTest() {
    this.attemptTestModel.testid = this.testId;
    this.attemptTestModel.stuid = localStorage.getItem('UserId');
    this.attemptTestModel.status = 'completed';
    this.testportalService.updateStatusTest(this.attemptTestModel).subscribe((response) => {
      debugger
      this.apiService.showNotification('top', 'right', 'Test  Submitted Successfully.', 'success');
      this.router.navigate(['dashboard']);
    })
  }
}
