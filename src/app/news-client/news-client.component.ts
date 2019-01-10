import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../client.service';
import { ClientNewsModel } from '../models/clientNewsModel';
import { Router } from '@angular/router';
import { NewsFileModel } from '../models/newsFileModel';
import { FormControl, FormGroup } from '@angular/forms';
import { QuesMmodel } from '../models/quesMmodel';
import {QuestionClientAnswer} from '../models/questionClientAnswer';
import {QAnswersModel} from '../models/qAnswersModel';

@Component({
  selector: 'app-news-client',
  templateUrl: './news-client.component.html',
  styleUrls: ['./news-client.component.css']
})
export class NewsClientComponent implements OnInit {

  newsList: ClientNewsModel[];
  showNews: ClientNewsModel;
  file: NewsFileModel;
  quests: QuesMmodel[];
  favoriteSeason: string;
  myFood = 'lamb';
  listOfLists: string[];
  constructor(private _http: HttpClient, private router: Router, private service: ClientService, private elRef: ElementRef) {
    elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F1F8F7';
  }

  ngOnInit() {
    this.service.getClientNewsList().subscribe(data => {
      if (data.errorCode == 0) {
        this.newsList = data.res;
      }
    });

    this.service.getQuestions().subscribe(data => {
      if (data.errorCode == 0) {
       this.quests = data.res;
       this.quests.forEach((quest, index) => {
         this.service.getClientQuestionAnswer(Number(localStorage.getItem('free_dom_kz_cabinet')), quest.question.id).subscribe(item=>{
           if (item.errorCode == 0 ) {
             const arr_otv = item.res.split('|');
             arr_otv.forEach(v => {
               this.quests[index].answers.forEach((answ, i) => {
                 if (answ.ord == Number(v)) {
                   this.quests[index].answers[i].checked = true;
                 } else {
                   this.quests[index].answers[i].checked = false;
                 }
               });
             });
           }
         });
       });
      }
    });
    this.showNews = null;
  }
  onShowNews( id: number) {
    this.newsList.forEach(item => {
      if (item.id == id) {
        this.showNews = item;
      }
    });
  }

  closed() {
    this.showNews = null;
  }

  downFile() {
    this.service.getFileInfo(this.showNews.news_files_id).subscribe(data => {
      this.file = data.res;
      this.service.getFile(this.showNews.news_files_id).subscribe(fileData => {
        const file = new Blob([fileData], { type: this.file.name });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    });
  }

  questionUpdate(quest: QuesMmodel) {
    let otv_str = '';
    quest.answers.forEach(item => {
      if (document.getElementById('a-' + item.id)['checked'] == true) {
        otv_str = otv_str + '|' + item.ord;
      }
    });
    if (otv_str.length > 1) {
      otv_str = otv_str.slice(1);
      const updateAnswer = new QuestionClientAnswer(Number(localStorage.getItem('free_dom_kz_cabinet')), quest.question.id, otv_str);
      this.service.updateQuestionAnswer(updateAnswer).subscribe(data => {
        console.log(data);
      });
    }
  }
}
