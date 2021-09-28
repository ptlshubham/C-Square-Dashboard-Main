import { Component, OnInit } from '@angular/core';
import { CalendarEvents } from 'app/calendar/calendar.model';
import { CalendarService } from 'app/calendar/calendar.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public eventList: CalendarEvents[] = [];

  constructor(
    private calenderService: CalendarService
  ) { }

  ngOnInit(): void {
    this.getEventDetails();
  }
  getEventDetails() {
    this.calenderService.getStdList().subscribe((data: any) => {
      this.eventList = data;

    })
  }
}
