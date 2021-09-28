import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Subject } from 'app/manage/subject/subject.model';
import { Optionvalue } from './options.model';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { Quetype } from './quetype.model';


declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})


export class QuestionComponent implements OnInit {


  randomColor: any = 'none';
  public subjects: Subject[] = [];
  public stdlist: Std[] = [];
  public questionModel: Question = {};
  public que: Question[] = [];
  public editQue: Question[] = [];
  public quetypeModel: Quetype[] = [];
  public type: Quetype[] = [];
  public optionvalueModel: Optionvalue[] = [];
  public options: Optionvalue[] = [];
  optionimage: any = [];
  Ref_id: any;
  std: any[];
  selectedSubject: any;
  questionList: boolean = false;
  addQuestion: boolean = false;
  updateButton: boolean = false;
  submitButton: boolean = false;
  addOptions: any = [];
  val = 0;
  selectedQue: any;
  addAnswers: any = [];
  ansVal = 0;
  subID: any;

  // Test Create Modal Variables
  isMasterSel: boolean = false;
  checkedQuestionList: any;
  totalQuestions: number = 0;
  totalMarks: number = 0;
  duration: number = 0;
  testName: string = '';
  standardId: number;
  standardName: string = '';
  subjectId: number;
  subjectName: string = '';
  public table: DataTable;
  public Roles = localStorage.getItem('role');
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  image: any;
  questionRegForm: FormGroup;
  public queTable: DataTable;
  constructor(
    private manageService: ManageService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private fm: FormBuilder,
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.Ref_id = res.val;
      this.getSubject();

    })
    this.getQueType();
    this.getDashboardStdList();
    this.questionList = false;
    this.isMasterSel = false;
  }

  ngOnInit(): void {
    this.getStandard();
    this.addOptions = [{ id: this.val, name: '', image: '' }];
    this.val++;
    this.addAnswers = [{ name: this.ansVal }];
    this.ansVal++;
    this.questionRegForm = this.fm.group({
      marks: ['', Validators.required, Validators.name,],
      duration: ['', Validators.required, Validators.name,],
    });

  }


  ngAfterContentInit() {
    $('#queTable').DataTable({
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

  getStandard() {
    this.questionService.getStdItem(this.Ref_id).subscribe((data: any) => {
      this.std = data;
    });

  }

  getSubject() {
    this.manageService.getSubjectList(this.Ref_id).subscribe((data: any) => {
      this.subjects = data;
      this.subjects.forEach(element => {
        this.questionService.getAllQuestion(element.id).subscribe((res: any) => {
          element.question = res;
          element.color = '3px 3px 5px 5px #ebf0ec';

        })
      })
    });
  }

  selectBankList(id) {
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
      }
    })
  }

  getDashboardStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdlist = data;
    });
  }
  addTest() {

  }

  closeQue() {
    this.addQuestion = false;
    this.questionList = true;
  }

  openQuestionBox() {
    this.addQuestion = true;
    this.questionList = false;
    this.updateButton = false;
    this.submitButton = true;
  }

  openQuestionList(sub) {
    this.subjects.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #ef8157';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.questionList = true;
    this.addQuestion = false;
    this.standardName = this.std[0].stdname;
    this.standardId = this.std[0].id;
    this.subjectName = sub.subject;
    this.subjectId = sub.id;
    this.subID = sub.id;
    this.getQueList(sub.id);
    this.resetModalData();
  }

  addSubject() {
    this.router.navigate(['/manage/subject'], {
      queryParams: {
        val: this.Ref_id
      }
    })
  }

  saveNewQuestion(data) {
    if (this.image == undefined) {
      this.questionModel.imageque == 'null';
    }
    else {
      data.imageque = this.image;
    }
    this.addOptions.forEach(element => {
      if (element.image == '') {
        element.image == 'null'
      }
    });
    data.options = this.addOptions;
    data.answer = this.addAnswers;
    data.stdid = this.Ref_id;
    data.subid = this.subID;
    data.quetype = this.selectedQue;
    debugger
    this.questionService.saveQueList(data).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'New Question Added Successfully.', 'success');
      this.questionList = true;
      this.addQuestion = false;
      this.getQueList(this.subID);
    })
  }

  updateQuestion(data) {
    data.quetype = this.selectedQue;
    this.questionService.updateQueList(data).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Updated Question List Successfully.', 'success');
      this.questionList = true;
      this.addQuestion = false;
    })
  }

  getQueType() {
    this.questionService.getQueList().subscribe((data: any) => {
      this.type = data;
    });
  }

  selectQue(id) {
    this.type.forEach(element => {
      if (element.id == id) {
        this.selectedQue = element.name;
      }
    })
  }

  getQueList(id) {
    this.questionService.getAllQuestion(id).subscribe((data: any) => {
      this.que = data;
      for (let i = 0; i < this.que.length; i++) {
        this.que[i].index = i + 1;
      }



    });

  }
  removeQuestion(id) {
    this.questionService.removeQueList(id).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'Remove Question Successfully.', 'success');
      this.getQueList(this.subID);
    });
  }

  editQuestion(data) {
    this.questionList = false;
    this.addQuestion = true;
    this.questionModel = data;
    this.questionService.getOptionvalue(this.questionModel.id).subscribe((res: any) => {
      this.questionModel.addOptions = res;
      debugger
    });
    this.questionService.getAnswervalue(this.questionModel.id).subscribe((res: any) => {
      this.questionModel.answer = res;
    })
    debugger
    this.selectedQue = data.quetype;
    this.updateButton = true;
    this.submitButton = false;
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
    for (let i = 0; i < this.checkedQuestionList.length; i++) {
      this.checkedQuestionList[i].index = i + 1;
    }
    this.duration = 0;
    this.totalMarks = 0;
    this.totalQuestions = 0;
    for (var i = 0; i < this.que.length; i++) {
      if (this.que[i].isactive) {
        this.checkedQuestionList.push(this.que[i]);
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

    data.questionlist = this.checkedQuestionList;
    this.questionService.saveTest(data).subscribe((res: any) => {
      this.apiService.showNotification('top', 'right', 'Test created Successfully.', 'success');

    })
    this.resetModalData();
  }
  select(event) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      max_height = 400;
      max_width = 400;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, event.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);


            this.questionService.uploadImage(formdata).subscribe((response) => {
              this.image = response;
              console.log(response);
              this.isImageSaved = true;


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }

  }
  removeTempPic() {
    this.image = '';
  }

  imageOption(event, ind) {
    debugger
    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      max_height = 400;
      max_width = 400;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, event.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);


            this.questionService.uploadImage(formdata).subscribe((response) => {
              this.optionimage.push(response);
              this.addOptions[ind].image = response;
              debugger
              console.log(response);
              this.isImageSaved = true;


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }

  }
  removeOptionTempImg(ind) {
    this.addOptions[ind].image = ''
  }

}
