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
  public visitor: RegisterVisitor[];
  public visitorModel: RegisterVisitor = new RegisterVisitor;
  isactive: boolean;
  search: string = '';

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
      this.visitor = data;
      this.visitorList = data;
      for (let i = 0; i < this.visitorList.length; i++) {
        this.visitorList[i].index = i + 1;
      }
    });
  }
  searchVisitor(val) {
    if (this.search == '') {
      this.visitor = this.visitorList;
    } else {
      this.transforms(this.visitorList, val);
    }

  }
  transforms(register: RegisterVisitor[], searchValue: string) {
    this.visitor = [];
    this.visitorList.forEach(element => {
      if (element.firstname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        element.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        this.visitor.push(element);
      }
    })
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
    this.visitorModel = data
  }
}
