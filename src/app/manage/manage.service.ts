import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Std } from './standard/standard.model';
import { Subject } from './subject/subject.model';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  saveStdList(admin: Std): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveStdListURL, admin);
  }
  getStdList(): Observable<Std[]> {
     let teachid = localStorage.getItem('UserId');
     let data={
       teachid:teachid,
       role:localStorage.getItem('role'),
       
     }
     
    return this.httpClient.post<any>(ApiService.getStdListURL,data);
  }


  CheckPassword(data){
    return this.httpClient.post(ApiService.ChackForPasswordURL,data);
  }


  removeStdList(id){
    return this.httpClient.get<any>(ApiService.removeStdURL+id);
  }
  addSubject(data) {
     
    return this.httpClient.post<any>(ApiService.saveSubjectURL, data);
  }
  getSubjectList(id): Observable<Subject[]> {
    let data={
      id:id,
      role:localStorage.getItem('role'),
      teachid:localStorage.getItem('UserId')
    }
    return this.httpClient.post<any>(ApiService.getSubjectListURL,data);
  }

  updateSubjectList(admin: Subject): Observable<any>{
    
    return this.httpClient.post<any>(ApiService.updateSubjectURL, admin);
  }
 
  removeSubjectList(id){
    return this.httpClient.get<any>(ApiService.removeSubjectURL+id);

  }
}
