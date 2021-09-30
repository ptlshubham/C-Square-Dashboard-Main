import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Subject } from 'app/manage/subject/subject.model';
import { Register } from './register.model';
import { RegisterService } from './register.service';
import { Studentregister } from './student.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerModel: Register = new Register;
  public studentregisterModel: Studentregister = new Studentregister;
  public students: Studentregister[];
  public studentslist: Studentregister[];
  public reg: Register[];
  public reglist: Register[];
  public stdlist: Std[] = [];
  public subjectList: Subject[] = [];
  public subjectObj: Subject[] = [];
  selectedstd: any;
  list: any;
  gender: any = '';
  teacher: any;
  student: any;
  openTeach: Boolean = false;
  openstudent: Boolean = false;
  openStuAdd: Boolean = true;
  openTeachAdd: Boolean = true;
  selectedStdList: any[] = [];
  selectedsubjectDataList: any[] = [];
  editTeacher: Register[] = [];
  editStudent: Studentregister[] = [];
  selectStdsList: any = [];
  selStds: string = '';
  selectedStdArray = [];
  prferTime: any = []
  search: string = '';
  selectedTime: any;
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  image: any;
  stdId: any;
  selectedSt: any;
  defaultStandard: any;
  selectedSubject: any;
  selectedSubId: any;
  addStdFields: any = [];
  subsel: any;
  val = 0;
  val1: any;
  selecteSubList: any = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  stdData: any = [];
  subData: any = [];
  subjectData: any = [];
  submittedTest: any = [];
  public Roles = localStorage.getItem('role');
  constructor(
    private router: Router,
    private registerService: RegisterService,
    private manageService: ManageService,
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
  ) {
    this.prferTime = [
      {
        name: '9 AM to 11 AM'
      },
      {
        name: '12 PM to 2 PM'
      },
      {
        name: '2 PM to 4 PM'
      },
      {
        name: '4 PM to 6 PM'
      },
      {
        name: '6 PM to 8 PM'
      },

    ]
    this.studentregisterModel.cactive = false;
    this.studentregisterModel.mactive = false;
    this.studentregisterModel.pactive = false;
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.teacher = res.val;
    })
    this.getStandardList();
    this.getTeacher();
    this.getAllSubject();
  }

  ngOnInit(): void {
    this.addStdFields = [{ name: this.val }];
    this.val++;
    if (this.teacher == 'Teacher') {
      this.openTeach = false;
      this.openstudent = true;
      this.openTeachAdd = false;
      this.openStuAdd = false;
    }
    else {
      this.openTeach = true;
      this.openstudent = false;
      this.openTeachAdd = false;
      this.openStuAdd = false;
    }

  }

  studentAttandance(id) {
    this.router.navigate(['/attendance'], {
      queryParams: {
        value: id
      }
    })
  }
  openTeacherAdd() {
    this.openTeach = true;
    this.openstudent = true;
    this.openTeachAdd = true;
    this.openStuAdd = false;
  }
  closeTeacherForm() {
    this.openTeach = false;
    this.openstudent = true;
    this.openTeachAdd = false;
    this.openStuAdd = false;
  }
  openStudentAdd() {
    this.openTeach = true;
    this.openstudent = true;
    this.openTeachAdd = false;
    this.openStuAdd = true;
  }
  closeStudentForm() {
    this.openTeach = true;
    this.openstudent = false;
    this.openTeachAdd = false;
    this.openStuAdd = false;
  }



  addStdDrop() {
    this.val++;
    this.addStdFields.push({ name: this.val });
  }
  removeStdDrop(val) {
    this.addStdFields.splice(val, 1);
  }

  selectBacthTime(name) {
    this.prferTime.forEach(element => {
      if (element.name == name) {
        this.selectedTime = element.name;
      }
    })

  }
  saveTeacherDetail() {
    this.registerModel.rights = this.selectStdsList;
    this.registerService.saveTeacherList(this.registerModel).subscribe((data: any) => {
      if (data == 'success') {
        this.openTeach = false;
        this.openstudent = true;
        this.openTeachAdd = false;
        this.openStuAdd = false;
        this.getTeacher();
      }
    })
  }
  getStandardList() {
    this.manageService.getStdList().subscribe((data: any) => {

      this.stdlist = data;
      this.defaultStandard = this.stdlist[0].id;
      this.stdlist.forEach(element => {

        let data = {
          itemName: element.stdname,
          id: element.id,
        }

        this.stdData.push(data)
      });
    });
  }
  onItemSelect($event) {

    let data = {
      selStds: $event.itemName,
      stdid: $event.id,
      subject: [],
      subdata: [],
      selsubjects: [],
      subsel: ' '
    }
    this.manageService.getSubjectList($event.id).subscribe((res: any) => {

      res.forEach(element => {

        let data1 = {
          itemName: element.subject,
          id: element.id,
        }

        data.subdata.push(data1);
      });
      this.selectStdsList.push(data);
    });
  }

  OnItemDeSelect(item: any) {

    for (let i = 0; i < this.selectStdsList.length; i++) {
      if (this.selectStdsList[i].stdid == item.id) {
        this.selectStdsList.splice(i, 1);
      }
    }
  }
  onsubItemSelect($event, val) {

    this.selectStdsList.forEach(element => {
      if (element.stdid == val.stdid) {
        let data = {
          subname: $event.itemName,
          subid: $event.id
        };

        element.subsel = element.subsel + "       ;     " + $event.itemName;
        element.selsubjects.push(data);
      }
    });



  }
  onSelectAll(items: any) {

    console.log(items);
  }
  onDeSelectAll(items: any) {

    console.log(items);
  }
  getSubject(id) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjectList = data;
    });
  }
  selectSubjectList(id) {
    this.selectedSubId = id;
    this.stdId = id;
    this.subjectList.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
      }
    });
  }
  selectStdList(id) {

    this.list = id;
    this.stdlist.forEach(element => {
      if (element.id == id) {
        this.selectedstd = element.stdname;
      }
    })
    let data = {
      id: id,
      stdname: this.selectedstd,
      subjects: []
    }
    this.manageService.getSubjectList(id).subscribe((res: any) => {
      data.subjects = res;
      this.subjectObj = res;
      this.subjectObj.forEach(element => {

        let data = {
          itemName: element.subject,
          id: element.id,
        }

        this.subjectData.push(data)
      });
    })
    //this.addStdFields.push(data);
    this.getStudent();
  }

  saveStudentDetail() {

    this.studentregisterModel.profile = this.image;
    this.studentregisterModel.batchtime = this.selectedTime;
    this.studentregisterModel.gender = this.gender;
    this.studentregisterModel.standard = this.list;
    this.registerService.saveStudentList(this.studentregisterModel).subscribe((data: any) => {
      this.getStudent();
      this.apiservice.showNotification('top', 'right', 'Student Added Successfully.', 'success');
      this.openStuAdd = false;
      this.openstudent = false;
    })
  }
  getStudent() {
    this.registerService.getStudentList(this.list).subscribe((data: any) => {
      this.students = data;
      this.studentslist = data;
      for (let i = 0; i < this.students.length; i++) {
        this.students[i].index = i + 1;
      }
    });
  }
  searchStudent(val) {
    debugger
    if (this.search == '') {
      this.students = this.studentslist;
    } else {
      this.transforms(this.studentslist, val);
    }

  }
  transforms(register: Studentregister[], searchValue: string) {
    debugger
    this.students = [];
    this.studentslist.forEach(element => {
      if (element.firstname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        element.grnumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        element.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        this.students.push(element);
      }
    })
  }

  getSubmittedTest(id) {
    this.router.navigate(['/testlist'], {
      queryParams: {
        val: id,
        val1: this.list,
        selstd: this.selectedstd,
        stdid: this.stdId
      }
    })
  }
  openAttendance() {
    this.router.navigate(['/attendance'], {
      queryParams: {
        id: this.list,
      }
    })
  }
  getTeacher() {
    this.registerService.getTeacherList().subscribe((data: any) => {
      this.reg = data;
      this.reglist = data;
      for (let i = 0; i < this.reg.length; i++) {
        this.reg[i].index = i + 1;
      }
    });
  }
  searchTeacher(val) {
    debugger
    if (this.search == '') {
      this.reg = this.reglist;
    } else {
      this.transform(this.reglist, val);
    }

  }
  transform(register: Register[], searchValue: string) {
    debugger
    this.reg = [];
    this.reglist.forEach(element => {
      if (element.firstname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        element.qualification.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        element.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        this.reg.push(element);
      }
    })
  }

  editTeacherData(data) {
    this.editTeacher = data;

  }

  updateTeacher(data) {
    data.gender = this.gender;
    data.rights = this.selectStdsList;

    this.registerService.updateTecaherList(data).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Update Techer Successfully.', 'success');
    })

  }
  removeTeacher(id) {
    this.registerService.removeTeacherList(id).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Teacher Successfully removed.', 'success');
      this.getTeacher();
    })
  }

  editStudentData(data) {
    this.studentregisterModel = data;
    this.selectedTime = data.batchtime;
    this.gender = data.gender
  }

  updateStudent() {
    this.studentregisterModel.batchtime = this.selectedTime;
    this.studentregisterModel.standard = this.list;
    this.registerService.updateStudentList(this.studentregisterModel).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Update Student Successfully.', 'success');
    })

  }
  removeStudent(id) {
    this.registerService.removeStudentList(id).subscribe((req) => {
      this.apiservice.showNotification('top', 'right', 'Student Successfully removed.', 'success');
      this.getStudent();
    })
  }
  getAllSubject() {
    this.registerService.getAllSubjectList().subscribe((data: any) => {
      this.subjectList = data;
    });
  }
  select(event) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      max_height = 300;
      max_width = 300;

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


            this.registerService.uploadImage(formdata).subscribe((response) => {
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

}
