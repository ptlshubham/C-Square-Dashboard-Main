
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Subject } from 'app/manage/subject/subject.model';
import { id } from 'date-fns/locale';
import { RegisterVisitor } from './visitorreg/visitorreg.model';
import { Std } from 'app/manage/standard/standard.model';

@Injectable({
    providedIn: 'root'
})
export class VisitorService {

    constructor(
        private http: Http,
        private httpClient: HttpClient
    ) { }

    saveVisitorRegister(admin: RegisterVisitor): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveVisitorDetailsURL, admin);
    }
    saveVisitorQue(data): Observable<any> {

        return this.httpClient.post<any>(ApiService.saveVisitorQueURL, data);
    }
    getVisitorQue(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getVisitorQueURL, data);
    }
    removeVisitorQue(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVisitorQueURL, data);
    }

    saveVisitorTest(data) {
        return this.httpClient.post<any>(ApiService.saveVisitorTestURL, data);
    }
    getAllVisitorList(): Observable<Subject[]> {
        return this.httpClient.get<any>(ApiService.getAllVisitorURL);
    }

    updateVisitorInform(data: RegisterVisitor): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateVisitorInformURL, data);
    }
    getVisitorTestList(id) {
        debugger
        let data = {
            id: id

        }
        return this.httpClient.post<any>(ApiService.getVisitorTestListURL, data)
    }
    // getStdList(): Observable<Std[]> {
    //     return this.httpClient.get<any>(ApiService.getStdListURL);
    // }
    // saveStudentList(admin: Studentregister): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.saveVisitorQueURL, admin);
    // }
    // getStudentList(id): Observable<Studentregister[]> {
    //     let data = {
    //         id: id
    //     }

    //     return this.httpClient.post<any>(ApiService.getStudentListListURL, data);
    // }
    // getStudentPicture(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.getStudentURL, data);
    // }
    // // getOptionValue(id){
    // //     let data={
    // //       id:id
    // //     }
    // //     return this.httpClient.post(ApiService.getOptionValueURL,data);
    // //   }
    // getTeacherList(): Observable<Register[]> {
    //     return this.httpClient.get<any>(ApiService.GetTeacherlistURL);
    // }

    // getStudentByStd(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.GetAllStudentlistURL, data);
    // }

    // removeStudentList(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.removeStudentListURL, data);
    // }
    // removeTeacherList(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.removeTeacherListURL, data);
    // }
    // updateTecaherList(admin: Register): Observable<any> {

    //     return this.httpClient.post<any>(ApiService.updateTeacherListURL, admin);
    // }
    // updateStudentList(admin: Studentregister): Observable<any> {

    //     return this.httpClient.post<any>(ApiService.updateStudentListURL, admin);
    // }

    // uploadImage(img): Observable<any> {

    //     return this.httpClient.post<any>(ApiService.uploadProfileImageURL, img);

    // }


}
