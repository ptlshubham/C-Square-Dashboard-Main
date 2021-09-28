import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { VisitorService } from '../visitor.service';
import { RegisterVisitor } from '../visitorreg/visitorreg.model';

@Component({
  selector: 'app-visitorlist',
  templateUrl: './visitorlist.component.html',
  styleUrls: ['./visitorlist.component.css']
})
export class VisitorlistComponent implements OnInit {
  public visitorList: RegisterVisitor[];
  public visitorModel: RegisterVisitor = new RegisterVisitor;
  isactive: boolean;
  constructor(
    private VisitorService: VisitorService,
    private apiService: ApiService
  ) {
    this.getAllVisitor();
  }

  ngOnInit(): void {
  }
  getAllVisitor() {
    this.VisitorService.getAllVisitorList().subscribe((data: any) => {
      this.visitorList = data;
    });
  }
  contactOrNot(data, id) {
    this.visitorModel.id = id;
    this.visitorModel.isactive = data
    debugger
    this.VisitorService.updateVisitorInform(this.visitorModel).subscribe((req) => {
      // this.apiService.showNotification('top', 'right', 'Inform added Successfully.', 'success');
      this.getAllVisitor();
    })
  }
  viewVisitorDetails(data) {
    debugger
    this.visitorModel = data
  }
}
