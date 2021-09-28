import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Question } from 'app/question/question.model';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { AttemptTest } from './attempt.model';
import { SubmittedTest } from './submittest.model';


@Injectable({
  providedIn: 'root'
})
export class TestportalService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  getStudentTestList(): Observable<Question[]> {
    return this.httpClient.get<any>(ApiService.getStudentTestURL);
  }
  saveStudentTest(admin: SubmittedTest): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveStudentTestURL, admin);
  }

  saveVisitorStudentTest(admin: SubmittedTest): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveVisitorStudentTestURL, admin);
  }

  GetTotalResultVisitor(data) {
    return this.httpClient.post(ApiService.GetVisitorResultURL, data);
  }

  UpdateVisitorResult(val) {
    return this.httpClient.post(ApiService.UpdateVisitorResultURL, val);
  }

  updatePendingTest(id): Observable<any> {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.updatePendingTestURL, data);
  }
  saveStatusOfTest(admin: AttemptTest): Observable<any> {
    return this.httpClient.post<any>(ApiService.setStatusOfTestURL, admin);
  }
  updateStatusTest(admin: AttemptTest): Observable<any> {
    return this.httpClient.post<any>(ApiService.updateStatusOfTestURL, admin);
  }

}


