import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ManageService } from '../manage.service';
import { Std } from './standard.model';
declare var require: any
declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {
  public StdModel: Std = new Std;
  public STD: Std[] = [];
  public editStd: Std[] = [];
  public standardTable: DataTable
  constructor(
    private manageService: ManageService,
    private apiService: ApiService) {
    this.getStdList();
  }

  ngOnInit(): void {

  }
  ngAfterContentInit() {
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [5, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    var table = $('#datatable').DataTable();

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
      this.STD = data;
      this.standardTable = {
        headerRow: ['#', 'Standard Name', 'Actions'],
        footerRow: ['#', 'Standard Name', 'Actions'],
        dataRows: this.STD
      };
    });
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
  updateStandard(data) {

    // this.manageService.updateStandardList(data).subscribe((req) => {
    //   this.getStdList();
    // })

  }
}
