import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Std } from 'app/manage/standard/standard.model';
import { Observable } from 'rxjs';
import { Question } from './question.model';
import { Quetype } from './quetype.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }

  getStdItem(id): Observable<Std[]> {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getStandardItemURL, data);
  }
  getQueList(): Observable<Quetype[]> {
    return this.httpClient.get<any>(ApiService.getQueListURL);
  }
  saveQueList(data): Observable<any> {

    return this.httpClient.post<any>(ApiService.saveQueListURL, data);
  }
  saveTest(data) {
    return this.httpClient.post<any>(ApiService.saveTestURL, data);
  }
  getAllQuestion(id) {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getAllQueListURL, data);
  }
  getOptionvalue(id){
    let data={
      queid:id
    };
    return this.httpClient.post(ApiService.getQueOptionListURL,data);
  }
  getAnswervalue(id){
    let data={
      queid:id
    };
    return this.httpClient.post(ApiService.getQueAnswerURL,data);
  }
  removeQueList(id) {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.removeQueListURL, data);
  }
  updateQueList(admin: Question): Observable<any> {

    return this.httpClient.post<any>(ApiService.updateQuestionURL, admin);
  }
  getTestList(): Observable<Question[]> {
    let data={
      role:localStorage.getItem('role'),
      teachid:localStorage.getItem('UserId')
    };
    debugger
    return this.httpClient.post<any>(ApiService.GetAllTestURL,data);
  }
  uploadImage(img): Observable<any> {
    debugger
    return this.httpClient.post<any>(ApiService.uploadQuestionImageURL, img);

  }
  uploadOptionImage(img): Observable<any> {
    debugger
    return this.httpClient.post<any>(ApiService.uploadOptionsImageURL, img);

  }
}
