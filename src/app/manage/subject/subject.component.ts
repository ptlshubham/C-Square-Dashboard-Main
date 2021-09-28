import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ManageService } from '../manage.service';
import { Std } from '../standard/standard.model';
import { Subject } from './subject.model';
declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  public StdModel: Std = new Std;
  public STD: Std[] = [];
  public SubjectModel: Subject = new Subject;
  public subjects: Subject[] = [];
  val = 0;
  public dataTable: DataTable;
  selectedStd: any;
  stdId: any;
  Ref_id: any;
  editSub: Subject[] = [];
  addSubjects: any = [];
  constructor(
    private manageService: ManageService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.Ref_id = res.val;
    })
    this.getStdList();
    // this.getSubject();
  }

  ngOnInit(): void {
    this.addSubjects = [{ name: this.val }];
    this.val++;

  }
  ngAfterViewInit() {
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    var table = $('#datatable').DataTable();

    // Edit record
    // table.on('click', '.edit', function () {
    //   let $tr = $(this).closest('tr');

    //   var data = table.row($tr).data();
    //   alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    // });

    // Delete a record
    // table.on('click', '.remove', function (e) {
    //   let $tr = $(this).closest('tr');
    //   table.row($tr).remove().draw();
    //   e.preventDefault();
    // });

    //Like record
    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
  }
  addSubjectList() {
    this.val++;
    this.addSubjects.push({ name: this.val });
  }
  removeSubjectList(val) {
    debugger
    this.addSubjects.splice(val, 1);
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;
      debugger
      if (this.Ref_id != undefined) {
        this.selectSTDList(this.Ref_id);
      }
    });
  }
  selectSTDList(id) {
    this.stdId = id;
    this.getSubject(this.stdId);
    this.STD.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;
      }
    })
  }
  saveSubject(data) {
    this.addSubjects.forEach(element => {
      element.id = this.stdId
    });
    this.manageService.addSubject(this.addSubjects).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'Subject added Successfully.', 'success');
      this.getSubject(this.stdId);
    })
  }
  getSubject(id) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;
      this.dataTable = {
        headerRow: ['#', 'Standard', 'Subject', 'Actions'],
        footerRow: ['#', 'Standard', 'Subject', 'Actions'],
        dataRows: this.subjects

      };
    });
  }
  editSubject(data) {
    debugger
    this.editSub = data;

  }
  updateSubject(data) {

    this.manageService.updateSubjectList(data).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Subject updated Successfully.', 'success');
      this.getSubject(this.stdId);
    })

  }
  removeSubject(id) {
    debugger
    this.manageService.removeSubjectList(id).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Subject removed Successfully.', 'success');
      this.getSubject(this.stdId);
    })
  }


}
