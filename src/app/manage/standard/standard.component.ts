import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ManageService } from '../manage.service';
import { Std } from './standard.model';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {
  public StdModel: Std = new Std;
  public STD: Std[] = [];
  public editStd: Std[] = [];

  stdlist: Std[] = []
  search: string = '';
  constructor(
    private manageService: ManageService,
    private apiService: ApiService) {
    this.getStdList();
  }

  ngOnInit(): void {

  }


  addStdList() {
    this.StdModel.isactive = true;
    this.manageService.saveStdList(this.StdModel).subscribe((response) => {
      this.getStdList();
      this.apiService.showNotification('top', 'right', 'Standard Added Successfully.', 'success');
    })
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdlist = data;
      this.STD = data;
      for (let i = 0; i < this.STD.length; i++) {
        this.STD[i].index = i + 1;
      }
    });
  }
  searchStandard(val) {
    if (this.search == '') {
      this.STD = this.stdlist;
    } else {
      this.transform(this.stdlist, val);
    }

  }
  transform(STD: Std[], searchValue: string) {

    this.STD = [];
    STD.forEach(element => {
      if (element.stdname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.STD.push(element);
      }
    })
  }
  removeStandard(id) {
    this.manageService.removeStdList(id).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Standard removed Successfully.', 'success');
      this.getStdList();

    })
  }
  editStandard(data) {
    this.editStd = data;
  }

}
