import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResModel} from './models/resModel';
import {QuestionClientAnswer} from './models/questionClientAnswer';

@Injectable()
export class ClientService {
  // private apiUrl = 'http://localhost:8080/';
  // private apiUrl = 'http://free-dom.ml/freedom/api/';
  private apiUrl = 'http://185.146.3.95/api';
  constructor(private http: HttpClient ) { }

  authService() {
    return this.http.get(this.apiUrl + '/login');
  }
  getClientNewsList(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getClientNewsList');
  }
  getClientCabinet(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getCabinets');
  }

  getClientShortInfo(clientId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getClientShortInfo?clientId=' + clientId);
  }

  upPassword(pass: string): Observable<ResModel> {
    return this.http.post<ResModel>(this.apiUrl + '/client/updatePassword', pass);
  }

  getInfoOst(id: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getInfoOst?id=' + id);
  }

  payReport(clientId: number, type: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/client/payReport?clientId=' + clientId + '&type=' + type, {responseType: 'blob' as 'json'});
  }

  getNoti(clientId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getNoti?clientId=' + clientId);
  }
  getGotClients(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getGotClients');
  }

  getYellowClients(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getYellowClients');
  }

  getQuestions(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getQuestions');
  }

  getFileInfo(fileId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getFileInfo?fileId=' + fileId);
  }
  getFile(fileId: number): Observable<any> {
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
    };
    return this.http.get<any>(this.apiUrl + '/getFileNews?fileId=' + fileId, httpOptions);
  }
  getClientInfoProfile(clientId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getClientInfo?clientId=' + clientId);
  }
  getStudetDetailInfo(clientId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getClientDetailInfo?clientId=' + clientId);
  }
  getPayments(clientId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getPaymentsByClient?clientId=' + clientId);
  }
  getListClientQueue(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getListClientQueue');
  }
  getClientSaveInfo(): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getClientSaveInfo');
  }

  getPayChartList(clientId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/client/getChart?id=' + clientId);
  }
  updateQuestionAnswer(quest: QuestionClientAnswer): Observable<ResModel> {
    return this.http.post<ResModel>(this.apiUrl + '/updateQuestionClient', quest);
  }
  getClientQuestionAnswer(clientId: number, questionId: number): Observable<ResModel> {
    return this.http.get<ResModel>(this.apiUrl + '/getClientQuestionAnswer?clientId=' + clientId + '&questionId=' + questionId);
  }
}
