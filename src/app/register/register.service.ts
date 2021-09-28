
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Register } from './register.model';
import { Studentregister } from './student.model';
import { Subject } from 'app/manage/subject/subject.model';
import { id } from 'date-fns/locale';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(
        private http: Http,
        private httpClient: HttpClient
    ) { }

    saveTeacherList(admin: Register): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveTecaherListURL, admin);
    }
    saveStudentList(admin: Studentregister): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveStudentListURL, admin);
    }
    getStudentList(id): Observable<Studentregister[]> {
        let data = {
            id: id
        }

        return this.httpClient.post<any>(ApiService.getStudentListListURL, data);
    }
    getStudentPicture(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getStudentURL, data);
    }
    // getOptionValue(id){
    //     let data={
    //       id:id
    //     }
    //     return this.httpClient.post(ApiService.getOptionValueURL,data);
    //   }
    getTeacherList(): Observable<Register[]> {
        return this.httpClient.get<any>(ApiService.GetTeacherlistURL);
    }
    getAllStudentList(): Observable<Register[]> {
        return this.httpClient.get<any>(ApiService.GetAllStudentlistURL);
    }
    getStudentByStd(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.GetAllStudentlistURL, data);
    }
    getTestforChecking(testid,stuid){
        let data={
            testid:testid,
            stuid:stuid
        };
        debugger
        return this.httpClient.post(ApiService.getTestforCheckingURL,data);
    }
    savetestresult(data){
        return this.httpClient.post(ApiService.savetestresultURL,data);
    }

    removeStudentList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeStudentListURL, data);
    }
    removeTeacherList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeTeacherListURL, data);
    }
    updateTecaherList(admin: Register): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateTeacherListURL, admin);
    }
    updateStudentList(admin: Studentregister): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateStudentListURL, admin);
    }
    getAllSubjectList(): Observable<Subject[]> {
        return this.httpClient.get<any>(ApiService.GetAllSubjectURL);
    }
    uploadImage(img): Observable<any> {

        return this.httpClient.post<any>(ApiService.uploadProfileImageURL, img);

    }
    getTestByStd(id , subid) {
        let data = {
            stuid: id,
            subid:subid
        }
        return this.httpClient.post<any>(ApiService.getSubmittedTestURL, data);
    }
    getSubjectByID(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getSubjectByIdURL, data);
    }
    getTotalObtainMarks(data){
        return this.httpClient.post(ApiService.getTotalofTestmarksURL,data);
    }
    getStatusOfTest(data){
        return this.httpClient.post(ApiService.getSatusofTestURL,data);
    }


}
