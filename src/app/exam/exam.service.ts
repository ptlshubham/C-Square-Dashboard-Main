import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Std } from 'app/manage/standard/standard.model';
import { Question } from 'app/question/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

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
  saveQueList(data): Observable<any> {

    return this.httpClient.post<any>(ApiService.saveQueListURL, data);

  }
  getTest(id): Observable<Question[]> {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getTestListURL, data);
  }
  getViewTest(id): Observable<Question[]> {
    debugger
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getViewTestURL, data);
  }

  getViewVisitorTest(id) {
    debugger
    return this.httpClient.post<any>(ApiService.GetViewVisitorTestListURL, id);
  }
  updateSendLinkToStudent(id): Observable<any> {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.updateSendLinkURL, data);
  }
  getActiveStudentTest(): Observable<Question[]> {
    return this.httpClient.get<any>(ApiService.getStudentActiveTestURL);
  }
  getOptionValue(id) {
    let data = {
      id: id
    }
    return this.httpClient.post(ApiService.getOptionValueURL, data);
  }
  getOptionValueVisitor(id) {
    let data = {
      id: id
    }
    return this.httpClient.post(ApiService.getOptionValVisitorueURL, data);
  }

}
