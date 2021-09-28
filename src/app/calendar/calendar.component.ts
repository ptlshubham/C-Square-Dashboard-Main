import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import { Router } from "@angular/router";
import { ApiService } from "app/api.service";
import { CalendarService } from "./calendar.service";
import { CalendarEvents } from "./calendar.model";
import { CalendarOptions } from "@fullcalendar/angular";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
declare var $: any;
const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  moduleId: module.id,
  selector: "calendar-cmp",
  templateUrl: "calendar.component.html",
})
export class CalendarComponent implements OnInit {
  eventSave: any;
  selected: any;
  public calendarModel: CalendarEvents = new CalendarEvents();
  public eventList: CalendarEvents[] = [];
  posts = [];
  public eventColor: string = '#c00f26';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    // timeZone: 'Indian',
    weekends: true,
    // editable: true,
    plugins: [interactionPlugin],
    // droppable: false,
    dateClick: this.handleDateClick.bind(this), // bind is important!,
    events: [],
    eventColor: '#c00f26'
  };

  constructor(
    private calenderService: CalendarService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.getEventDetails();
  }
  ngOnInit() {

  }
  handleDateClick(arg) {
    this.selected = arg.dateStr;

  }
  addEventsDetails() {
    this.calendarModel.date = this.selected;
    this.calendarModel.active = true;
    debugger
    this.calenderService.saveEventsList(this.calendarModel).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'Event Added Successfully.', 'success');
      this.getEventDetails();
    })
  }
  getEventDetails() {
    this.calenderService.getStdList().subscribe((data: any) => {

      this.calendarOptions.events = data;
      this.eventList = data;



    })
  }
  deleteEventList(id) {
    this.calenderService.removeEventData(id).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Event removed Successfully.', 'success');
      this.getEventDetails();
    })
  }
}
