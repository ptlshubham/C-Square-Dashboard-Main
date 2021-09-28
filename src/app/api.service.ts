import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:8090";

  constructor(
    private http: HttpClient,
  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public static saveStdListURL: string = ApiService.HOST_URL + '/admin/SaveStdList';
  public static getStdListURL: string = ApiService.HOST_URL + '/admin/GetStdList';
  public static saveSubjectURL: string = ApiService.HOST_URL + '/admin/saveSubject';
  public static getSubjectListURL: string = ApiService.HOST_URL + '/admin/GetSubjectList';
  public static updateSubjectURL: string = ApiService.HOST_URL + '/admin/UpdateSujectList/';
  public static removeSubjectURL: string = ApiService.HOST_URL + '/admin/RemoveSubjectList/';
  public static removeStdURL: string = ApiService.HOST_URL + '/admin/RemoveStandardList/';
  public static getStandardItemURL: string = ApiService.HOST_URL + '/admin/GetStdItem';
  public static getQueListURL: string = ApiService.HOST_URL + '/admin/GetQueType';
  public static saveQueListURL: string = ApiService.HOST_URL + '/admin/saveQueList';
  public static getAllQueListURL: string = ApiService.HOST_URL + '/admin/getAllQueList';
  public static getQueOptionListURL: string = ApiService.HOST_URL + '/admin/getQueOptionList';
  public static getQueAnswerURL: string = ApiService.HOST_URL + '/admin/getQueAnswer';

  public static removeQueListURL: string = ApiService.HOST_URL + '/admin/removeQueList';
  public static saveTecaherListURL: string = ApiService.HOST_URL + '/authenticate/saveTeacherList';
  public static saveStudentListURL: string = ApiService.HOST_URL + '/authenticate/SaveStudentList';
  public static getStudentListListURL: string = ApiService.HOST_URL + '/admin/GetStudentList/';
  public static GetTeacherlistURL: string = ApiService.HOST_URL + '/admin/GetTeacherList';
  public static GetAllStudentlistURL: string = ApiService.HOST_URL + '/admin/GetAllStudentList';
  public static saveLoginUserURL: string = ApiService.HOST_URL + '/authenticate/UserLogin';
  public static getTestforCheckingURL: string = ApiService.HOST_URL + '/admin/getTestforChecking';
  public static saveAdminLoginURL: string = ApiService.HOST_URL + '/admin/login';
  public static removeStudentListURL: string = ApiService.HOST_URL + '/admin/removeStudentList';
  public static removeTeacherListURL: string = ApiService.HOST_URL + '/admin/removeTecaherList';
  public static updateTeacherListURL: string = ApiService.HOST_URL + '/admin/UpdateTecaherList/';
  public static updateStudentListURL: string = ApiService.HOST_URL + '/admin/UpdateStudentList/';
  public static updateQuestionURL: string = ApiService.HOST_URL + '/admin/UpdateQuestionList/';
  public static saveTestURL: string = ApiService.HOST_URL + '/admin/SaveTest';
  public static GetAllTestURL: string = ApiService.HOST_URL + '/admin/GetAllTestList';
  public static getTestListURL: string = ApiService.HOST_URL + '/admin/GetTestList';
  public static forgetPasswordURL: string = ApiService.HOST_URL + '/admin/ForgetPassword';
  public static GetAllSubjectURL: string = ApiService.HOST_URL + '/admin/GetAllSubjects';
  public static getViewTestURL: string = ApiService.HOST_URL + '/admin/GetViewTestList';
  public static GetViewVisitorTestListURL: string = ApiService.HOST_URL + '/admin/GetViewVisitorTestList';
  public static uploadProfileImageURL: string = ApiService.HOST_URL + '/admin/UploadProfileImage';
  public static uploadBannersImageURL: string = ApiService.HOST_URL + '/admin/UploadBannersImage';
  public static saveWebBannersURL: string = ApiService.HOST_URL + '/admin/SaveWebBanners';
  public static getWebBannersURL: string = ApiService.HOST_URL + '/admin/GetWebBanners/';
  public static removeWebBannersURL: string = ApiService.HOST_URL + '/admin/RemoveWebBanners';
  public static updateActiveWebStatusURL: string = ApiService.HOST_URL + '/admin/UpdateActiveWebBanners';
  public static getWebBannerURL: string = ApiService.HOST_URL + '/admin/GetWebBanner';
  public static getStudentTestURL: string = ApiService.HOST_URL + '/admin/getStudentTest';
  public static updateSendLinkURL: string = ApiService.HOST_URL + '/admin/updateSendLink/';
  public static getStudentActiveTestURL: string = ApiService.HOST_URL + '/admin/GetStudentActiveTest';
  public static getOptionValueURL: string = ApiService.HOST_URL + '/admin/GetOptionValueTest';
  public static getOptionValVisitorueURL: string = ApiService.HOST_URL + '/admin/GetOptionValueVisitorTest';
  public static saveStudentTestURL: string = ApiService.HOST_URL + '/admin/SaveStudentTest';
  public static updatePendingTestURL: string = ApiService.HOST_URL + '/admin/UpdatePendingTest';
  public static getStudentURL: string = ApiService.HOST_URL + '/admin/GetStudentProfilePic';
  public static uploadQuestionImageURL: string = ApiService.HOST_URL + '/admin/UploadQuestionImage';
  public static uploadOptionsImageURL: string = ApiService.HOST_URL + '/admin/UploadOptionsImage';
  public static saveCalendarEventsURL: string = ApiService.HOST_URL + '/admin/saveCalendarEvents';
  public static getCalendarEventsURL: string = ApiService.HOST_URL + '/admin/getCalendarEvents';
  public static removeEventListURL: string = ApiService.HOST_URL + '/admin/RemoveEventList';
  public static saveStudentAttandanceURL: string = ApiService.HOST_URL + '/admin/saveStudentAttandance';
  public static getStudentAttandanceURL: string = ApiService.HOST_URL + '/admin/getStudentAttandance';
  public static saveVisitorDetailsURL: string = ApiService.HOST_URL + '/authenticate/SaveVisitorDetails';
  public static saveVisitorQueURL: string = ApiService.HOST_URL + '/admin/SaveVisitorQueList';
  public static getVisitorQueURL: string = ApiService.HOST_URL + '/admin/GetVisitorQue';
  public static removeVisitorQueURL: string = ApiService.HOST_URL + '/admin/RemoveVisitorQue';
  public static saveVisitorTestURL: string = ApiService.HOST_URL + '/admin/SaveVisitorTest';
  public static getSubmittedTestURL: string = ApiService.HOST_URL + '/admin/GetSubmittedTest';
  public static getSubjectByIdURL: string = ApiService.HOST_URL + '/admin/GetSubjectByIdURL';
  public static getAllVisitorURL: string = ApiService.HOST_URL + '/admin/GetAllVisitor';
  public static updateVisitorInformURL: string = ApiService.HOST_URL + '/admin/UpdateVisitorInform';
  public static getStudentSubmittedTestURL: string = ApiService.HOST_URL + '/admin/GetSubmittedTest';
  public static savetestresultURL: string = ApiService.HOST_URL + '/admin/SaveTestResult';
  public static getVisitorTestListURL: string = ApiService.HOST_URL + '/admin/GetVisitorTestList';
  public static saveVisitorStudentTestURL: string = ApiService.HOST_URL + '/admin/SaveVisitorStudentTest';
  public static getOneTimePasswordURL: string = ApiService.HOST_URL + '/admin/GetOneTimePassword';
  public static updatePasswordURL: string = ApiService.HOST_URL + '/admin/updatePasswordAccordingRole';
  public static UpdateVisitorResultURL: string = ApiService.HOST_URL + '/admin/UpdateVisitorResult';
  public static GetVisitorResultURL: string = ApiService.HOST_URL + '/admin/GetVisitorResult';
  public static ChackForPasswordURL: string = ApiService.HOST_URL + '/admin/ChackForPassword';
  public static setStatusOfTestURL: string = ApiService.HOST_URL + '/admin/setStatusOfTest';
  public static updateStatusOfTestURL: string = ApiService.HOST_URL + '/admin/updateStatusOfTest';
  public static getTotalofTestmarksURL: string = ApiService.HOST_URL + '/admin/GetTotalofTestmarks';
  public static getSatusofTestURL: string = ApiService.HOST_URL + '/admin/GetSatusofTest';
  showNotification(from, align, msg, color) {


    var color = color;

    $.notify({
      icon: "",
      message: msg
    }, {
      type: color,
      timer: 2000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    });
  }
}
