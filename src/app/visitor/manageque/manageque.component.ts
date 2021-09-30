import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Subject } from 'app/manage/subject/subject.model';
import { Question } from 'app/question/question.model';
import { QuestionService } from 'app/question/question.service';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-manageque',
  templateUrl: './manageque.component.html',
  styleUrls: ['./manageque.component.css']
})
export class ManagequeComponent implements OnInit {
  public questionModel: Question = {};
  public stdlist: Std[];
  public subjects: Subject[];
  public que: Question[];
  public quelist: Question[];
  public stdId: any;
  selectedSubjectId: any;
  selectedstd: any;
  questionList: boolean = false;
  addQuestion: boolean = false;
  openQuestionnaire: boolean = false;
  viewTestFlag: boolean = false;
  addOptions: any = [];
  addAnswers: any = [];
  visitorTestList: any = [];
  selectedStd: any;
  selectedSubject: any;
  ansVal = 0;
  val = 0;
  issubjectlist: boolean = false;
  subjectId: any;
  submitButton: boolean = false;
  // Test Create Modal Variables
  isMasterSel: boolean = false;
  checkedQuestionList: any;
  totalQuestions: number = 0;
  totalMarks: number = 0;
  duration: number = 0;
  testName: string = '';
  standardId: number;
  standardName: string = '';
  subjetId: number;
  subjectName: string = '';
  search: string = '';
  constructor(
    private manageService: ManageService,
    private questionService: QuestionService,
    private apiService: ApiService,
    private VisitorService: VisitorService,
  ) {
    this.getStandardList();
  }

  ngOnInit(): void {
    this.addOptions = [{ id: this.val, name: '', }];
    this.val++;
    this.addAnswers = [{ name: this.ansVal }];
    this.ansVal++;
  }
  addOptionsList() {
    this.val++;
    this.addOptions.push({ id: this.val, name: '', image: '' });
  }

  removeOptionsList(val) {
    this.addOptions.splice(val, 1);
  }

  addAnswersList() {
    this.ansVal++;
    this.addAnswers.push({ name: this.ansVal });
  }

  removeAnswersList(val) {
    this.addAnswers.splice(val, 1);
  }

  getStandardList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdlist = data;
    });
  }
  selectStdList(id) {
    this.issubjectlist = true;
    this.viewTestFlag = false;
    this.stdId = id;
    this.getSubject();
    this.stdlist.forEach(element => {
      if (element.id == id) {
        this.selectedstd = element.stdname;
      }
      this.getSubject();
    })
  }
  selectStdVisitor(id) {
    this.stdId = id;
    this.getSubject();
    this.stdlist.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;
      }
    })
  }
  getSubject() {
    this.manageService.getSubjectList(this.stdId).subscribe((data: any) => {
      this.subjects = data;
      this.subjects.forEach(element => {
        this.VisitorService.getVisitorQue(element.id).subscribe((res: any) => {
          element.question = res;
          element.color = '3px 3px 5px 5px #ebf0ec';

        })
      })
    });
  }
  selectSubjectList(id) {
    this.selectedSubjectId = id;
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
      }
      this.getVisitorTest();
    });
  }
  getVisitorTest() {
    this.VisitorService.getVisitorTestList(this.selectedSubjectId).subscribe((data: any) => {
      this.visitorTestList = data;
    });
  }
  ViewVisitorTestQue(data) {
    this.questionModel = data;
  }
  openQuestionList(sub) {

    this.subjects.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #ef8157';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
      this.subjectId = sub.id;
      this.subjectName = sub.subject;
    })
    this.questionList = true;
    this.getQueList();
  }
  openQuestionnaireBox() {
    this.openQuestionnaire = true;
    this.viewTestFlag = false;
  }
  closeQuestion() {
    this.issubjectlist = false
    this.openQuestionnaire = false;
    this.addQuestion = false;
    this.questionList = false;
    this.submitButton = false;
    this.viewTestFlag = false;
  }
  openTestBox() {
    this.viewTestFlag = true;
    this.openQuestionnaire = false;
    this.addQuestion = false;
    this.questionList = false;
    this.submitButton = false;
    this.issubjectlist = false;
  }
  backToHome() {
    this.viewTestFlag = false;
    this.openQuestionnaire = false;
    this.addQuestion = false;
    this.questionList = false;
    this.submitButton = false;
    this.issubjectlist = false;
  }
  openQuestionBox() {
    this.addQuestion = true;
    this.questionList = false;
    this.submitButton = true;
    this.viewTestFlag = false;
  }
  closeQue() {
    this.addQuestion = false;
    this.questionList = true;
    this.viewTestFlag = false;
  }

  saveNewQuestion(data) {
    data.options = this.addOptions;
    data.answer = this.addAnswers;
    data.stdid = this.stdId;
    data.subid = this.subjectId;
    data.quetype = 'MCQ';
    this.VisitorService.saveVisitorQue(data).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'New Question Added Successfully.', 'success');
      this.getQueList();
      this.questionList = true;
      this.addQuestion = false;

    })
  }
  getQueList() {
    this.VisitorService.getVisitorQue(this.subjectId).subscribe((data: any) => {
      this.que = data;
      this.quelist = data;
      for (let i = 0; i < this.que.length; i++) {
        this.que[i].index = i + 1;
      }
    });
  }
  searchQuestion(val) {
    debugger
    if (this.search == '') {
      this.que = this.quelist;
    } else {
      this.transforms(this.quelist, val);
    }

  }
  transforms(register: Question[], searchValue: string) {
    debugger
    this.que = [];
    this.quelist.forEach(element => {
      if (element.question.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.que.push(element);
      }
    })
  }
  removeQuestion(id) {
    this.VisitorService.removeVisitorQue(id).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'Remove Question Successfully.', 'success');
      this.getQueList();
    });
  }

  resetModalData() {
    for (var i = 0; i < this.que.length; i++) {
      this.que[i].isactive = false;
    }
    this.checkedQuestionList = [];
    this.totalMarks = 0;
    this.totalQuestions = 0;
    this.duration = 0;
    this.isMasterSel = false;
    this.testName = '';
  }
  checkUncheckAll() {
    for (var i = 0; i < this.que.length; i++) {
      this.que[i].isactive = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.que.every(function (item: any) {
      return item.isSelected == true;
    })
    this.isMasterSel = true;
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedQuestionList = [];
    this.duration = 0;
    this.totalMarks = 0;
    this.totalQuestions = 0;
    for (var i = 0; i < this.que.length; i++) {
      if (this.que[i].isactive) {
        this.checkedQuestionList.push(this.que[i]);
        for (var i = 0; i < this.checkedQuestionList.length; i++) {
          this.checkedQuestionList[i].isactive = this.isMasterSel;
        }
        this.totalMarks = this.totalMarks + this.que[i].marks;
        this.duration = this.duration + this.que[i].time;
      }
    }
    this.totalQuestions = this.checkedQuestionList.length;
    //this.checkedQuestionList = JSON.stringify(this.checkedQuestionList);
  }

  updateTotals() {
    this.totalMarks = 0;
    this.duration = 0;
    for (var i = 0; i < this.checkedQuestionList.length; i++) {
      this.totalMarks = this.totalMarks + this.checkedQuestionList[i].marks;
      this.duration = this.duration + this.checkedQuestionList[i].time;
    }
  }

  setMarks(_marks, sd) {
    sd.marks = Number(_marks);
    this.updateTotals();
  }

  setDuration(_duration, sd) {
    sd.time = Number(_duration);
    this.updateTotals();
  }
  createTest(data: any) {

    console.log('Create Test');

    data.stdId = this.stdId;
    data.subjectId = this.subjectId;
    data.questionlist = this.checkedQuestionList;

    this.VisitorService.saveVisitorTest(data).subscribe((res: any) => {
      this.apiService.showNotification('top', 'right', 'Visitor Test added Successfully.', 'success');
    })
    this.resetModalData();
  }
}
