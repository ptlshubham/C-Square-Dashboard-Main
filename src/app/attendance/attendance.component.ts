import { Component, OnInit } from '@angular/core';
import { CalendarEvents } from 'app/calendar/calendar.model';
import { CalendarService } from 'app/calendar/calendar.service';
import { CalendarOptions } from "@fullcalendar/angular";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ActivatedRoute } from '@angular/router';
import { Attandance } from './attendance.model';
import { ApiService } from 'app/api.service';
import { RegisterService } from 'app/register/register.service';
import { Studentregister } from 'app/register/student.model';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
declare var $: any;
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  eventSave: any;
  selected: any;
  stdId: any;
  atd: any = [];
  showModal: boolean;
  public calendarModel: CalendarEvents = new CalendarEvents();
  public attandanceModel: Attandance = new Attandance();
  public attandanceList: Attandance[] = [];
  public students: Studentregister[];
  studentAtte: boolean = false;
  public eventList: CalendarEvents[] = [];
  public stdList: Std[] = [];
  posts = [];
  ref_id: any;
  stdname: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    weekends: true,
    editable: true,
    plugins: [interactionPlugin],
    selectLongPressDelay: 1000,
    dateClick: this.handleDateClick.bind(this),  // bind is important!,
    events: [],
    eventColor: 'brown'

  }
  prsnt: any = [];
  absnt: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private calendarService: CalendarService,
    private apiService: ApiService,
    private registerService: RegisterService,
    private manageService: ManageService
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.stdId = res.id;
      this.ref_id = res.value;
    })
  }

  ngOnInit() {

    if (this.stdId) {

      this.studentAtte = false;
      this.getStdList();
    }
    else {
      this.studentAtte = true;
      this.getStudentAttandance();
    }
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdList = data;
      this.stdList.forEach(element => {
        if (element.id == this.stdId) {
          this.stdname = element.stdname;
        }
      })
    });
  }
  getStudent() {
    this.registerService.getStudentList(this.stdId).subscribe((data: any) => {
      this.students = data;
      this.students.forEach(element => {
        element.checked = false;
      })
    });
  }
  isSelected(val) {
    let data = {
      stuid: val.id,
      date: this.selected,
      title: this.attandanceModel.title
    };
    this.atd.push(data);
  }

  isAllSelected(val) {
    if (this.attandanceModel.title == undefined) {
      this.apiService.showNotification('top', 'center', 'Please Select Title.', 'danger');
    }
    else {

      if (val == true) {
        this.students.forEach(element => {
          element.checked = true;
          let data = {
            stuid: element.id,
            date: this.selected,
            title: this.attandanceModel.title
          };
          this.atd.push(data);
        })
      }
      else {
        this.students.forEach(element => {
          element.checked = false;
        })
        this.atd = [];
      }
    }

  }

  handleDateClick(arg) {
    if (this.stdId) {
      this.getStudent();
      this.showModal = true;
      this.selected = arg.dateStr;
      arg.title = this.attandanceModel.title;
    }
    else {
      this.showModal = false;
    }
  }
  hidemodal() {
    this.showModal = false;
    this.atd = [];
  }
  addStudentAttandance() {
    this.atd;
    debugger
    this.calendarService.saveAttandanceList(this.atd).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'Attandance Added Successfully.', 'success');
      this.showModal = false;
      this.atd = [];
    })
  }
  getStudentAttandance() {
    this.calendarService.getAttandanceList(this.ref_id).subscribe((data: any) => {

      this.calendarOptions.events = data;
      this.attandanceList = data;
    })
  }
}
