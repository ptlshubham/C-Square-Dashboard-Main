import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Webbanners } from './webhome.model';


@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  getWebSlider(): Observable<[Webbanners]>{
    return this.httpClient.get<any>(ApiService.getWebBannerURL);
  }
  
  uploadImage(img): Observable<any>{
     
    return this.httpClient.post<any>(ApiService.uploadBannersImageURL, img);

  }
  saveWebBannersImage(admin: Webbanners): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.saveWebBannersURL, admin);
  }
  getWebBanners(): Observable<Webbanners[]>{
    return this.httpClient.get<any>(ApiService.getWebBannersURL);
  }
  removeWebBanners(id){
    let bnr={
      id:id
    }
    return this.httpClient.post<any>(ApiService.removeWebBannersURL,bnr);
  }

  activeDeavctiveWebBanners(admin: Webbanners): Observable<any> {
     
    return this.httpClient.post<any>(ApiService.updateActiveWebStatusURL, admin);
  }
}


