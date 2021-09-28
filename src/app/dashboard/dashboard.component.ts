import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannersService } from 'app/banners/banners.service';
import { Webbanners } from 'app/banners/webhome.model';
import { ExamService } from 'app/exam/exam.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Subject } from 'app/manage/subject/subject.model';
import { Question } from 'app/question/question.model';
import { QuestionService } from 'app/question/question.service';
import { Register } from 'app/register/register.model';
import { RegisterService } from 'app/register/register.service';
import { Studentregister } from 'app/register/student.model';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public gradientStroke;
  public chartColor = "#FFFFFF";
  public canvas: any;
  public ctx;
  public gradientFill;
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;
  public myChart: any;

  public activeUsersChartType;
  public activeUsersChartData: Array<any>;
  public activeUsersChartOptions: any;
  public activeUsersChartLabels: Array<any>;
  public activeUsersChartColors: Array<any>
  Teacher: any = 'Teacher';
  Student: any = 'Student';
  public subjects: Subject[] = [];
  public stdlist: Std[] = [];
  public reg: Register[];
  public Banners: Webbanners[] = [];
  topban: any = [];
  public studentsList: Studentregister[];
  public Test: Question[];
  public ActiveTest: Question[];
  submitedTest: any[];
  showSubmited: boolean = false;
  showList: boolean = false;
  selectedSub: any;
  dispTest: any = [];
  sub: any;
  data: MultiDataSet;
  public role = localStorage.getItem('role');
  doughnutChartData: MultiDataSet;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  public doughnutChartOption: any = [];
  public doughnutChartLabels: Label[] = [['student'], ['Teacher']];
  // public doughnutChartData: MultiDataSet = [
  //   [500, 150, 100],
  // ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: any = {
    cutoutPercentage: 50,
    elements: {
      center: {
        text: '90%',
        fontColor: '#66615c',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontSize: 24,
        fontStyle: 'normal',
        sidePadding: 60,

      }
    }
  };
  public doughnutChartDatasets: any[] = [
    {
      data: [300, 50, 100],
      options: this.doughnutChartOptions,
      backgroundColor: [
        "#f4a314",
        "#c92c10",
        "#FFCE56"
      ],
      hoverBackgroundColor: [
        "#f4a314",
        "#c92c10",
        "#FFCE56"
      ]
    }];
  // public options: {
  //   elements: {
  //     center: {
  //       text: '60%',
  //       color: '#66615c', // Default is #000000
  //       fontStyle: 'Arial', // Default is Arial
  //       sidePadding: 60 // Defualt is 20 (as a percentage)
  //     }
  //   },
  // }
  constructor(
    private manageService: ManageService,
    private registerService: RegisterService,
    private questionService: QuestionService,
    private bannersService: BannersService,
    private examService: ExamService,
    private router: Router,
  ) {
    this.getDashboardStdList();
    this.getStudent();
    this.getTeacher();
    this.getTotalTest();
    this.getBanners();
    this.getStudentTest();
    this.getSubmittedTest();

    //  this.getStdWiseSubjects();
  }
  ngOnInit() {

  }
  ngDoCheck() {
    this.doughnutChartData = [
      [this.studentsList.length, this.reg.length],
    ];

    this.doughnutChartDatasets = [
      {
        data: [this.studentsList.length, this.reg.length],
        options: this.doughnutChartOptions,
        backgroundColor: [
          "#ffffff",
          "#ffffff"
        ],
        hoverBackgroundColor: [
          "#c92c10",
          "#f4a314"
        ]
      }];

    this.doughnutChartOption = {
      data: [this.studentsList.length, this.reg.length],
      cutoutPercentage: 50,
      elements: {
        center: {
          text: '90%',
          fontColor: '#ffffff',
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontSize: 24,
          fontStyle: 'normal',
          sidePadding: 60,

        }
      }
    };
    //  this.doughnutChartData 
  }
  getDashboardStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdlist = data;

      this.stdlist.forEach(element => {
        this.manageService.getSubjectList(element.id).subscribe((res: any) => {
          element.subjectList = res;
        })
      })
      // this.stdlist.forEach(element => {
      //    
      //   this.registerService.getStudentByStd(element.id).subscribe((res: any) => {
      //     this.studentsList = data;
      //      
      //   })
      // })
    });
  }
  openStd(id) {
    this.router.navigate(['/question/question'], {
      queryParams: {
        val: id
      }
    })
  }
  getStudent() {

    this.registerService.getAllStudentList().subscribe((data: any) => {
      this.studentsList = data;

    });
  }
  getTeacher() {
    this.registerService.getTeacherList().subscribe((data: any) => {
      this.reg = data;
    });
  }
  getSubmittedTest() {
    // this.registerService.getTestByStd(localStorage.getItem("UserId")).subscribe((data: any) => {
    //   this.submitedTest = data;
    //   debugger

    // })
  }
  getSubjectList() {
    this.registerService.getSubjectByID(localStorage.getItem("standardid")).subscribe((data: any) => {
      this.subjects = data;
    });
  }
  closeTest() {
    this.showSubmited = false;
  }
  selectSUBList(id) {
    this.sub = id;
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSub = element.subject;
      }
    });
    this.dispTest = [];
    this.submitedTest.forEach(element => {
      if (element.subid == this.sub) {
        this.dispTest.push(element);

      }
    });
  }

  openSubmittedTest() {
    this.showSubmited = true;
    this.getSubjectList();
  }
  openShowTestList() {
    this.showList = true;
  }


  getTotalTest() {
    this.questionService.getTestList().subscribe((data: any) => {
      this.Test = data;
    });
  }
  openTeacher() {
    this.router.navigate(['/register'], {
      queryParams: {
        val: this.Teacher
      }
    })
  }
  openStudent() {
    this.router.navigate(['/register'], {
      queryParams: {
        val: this.Student
      }
    })
  }
  // getStdWiseSubjects(){
  //   this.manageService.getSubjectList().subscribe((data: any) => {
  //     this.subjects = data;
  //      
  //   });
  // }
  getBanners() {
    this.bannersService.getWebSlider().subscribe((data: any) => {
      this.Banners = data;
      this.Banners.forEach(element => {
        if (element.name == 'Top') {
          this.topban.push(element);
        }
      })

    });
  }
  getStudentTest() {
    this.examService.getActiveStudentTest().subscribe((data: any) => {
      this.ActiveTest = data;
    });
  }
  openPendingTest() {

    this.router.navigate(['testportal']);
  }
  // getBanners() {
  //   this.bannersService.getWebSlider().subscribe((data: any) => {
  //     this.Banners = data;
  //     this.Banners.forEach(element => {
  //       if (element.name == 'Top') {
  //         this.topban.push(element);
  //       }
  //     })

  //   });
  // }
}
