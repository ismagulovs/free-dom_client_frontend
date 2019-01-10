import { Component, ElementRef, OnInit } from '@angular/core';
import { ValClientSaveInfo } from '../models/valClientSaveInfo';
import { ValClientQueueModel } from '../models/valClientQueueModel';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { ValClientShortInfoModel } from '../models/valClientShortInfoModel';

@Component({
  selector: 'app-turn-client',
  templateUrl: './turn-client.component.html',
  styleUrls: ['./turn-client.component.css']
})
export class TurnClientComponent implements OnInit {
  clientsTurnList: ValClientQueueModel[];
  clientsTurnListFilter: ValClientQueueModel[];
  clientSaveInfo: ValClientSaveInfo;
  ord: number;
  saveClietn: ValClientQueueModel;
  client: ValClientQueueModel;
  clientInfo: ValClientShortInfoModel;
  price: number;
  cnt_red = 0;
  cnt_yellow = 0;
  cnt_white = 0;

  constructor(private service: ClientService, private route: Router, private elRef: ElementRef) {
    elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F1F8F7';
  }

  ngOnInit() {
    this.service.getClientShortInfo(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(data=>{
      this.clientInfo = data.res;
      if ( this.clientInfo.status > 1) {
        this.route.navigate(['./client/prof']);
      }
      this.service.getListClientQueue().subscribe(data => {
        this.clientsTurnList = data.res;
        for (const i in this.clientsTurnList) {
          if (this.clientsTurnList[i].id == Number(localStorage.getItem('free_dom_kz_cabinet'))) {
            this.clientsTurnList[i].fio = 'вы';
            break;
          }
        }
        this.clientsTurnList.forEach(item => {if (item.id == this.clientInfo.client_id) {
          this.client = item;
        }
          if (item.ord_status == 1) {
            this.cnt_red = this.cnt_red +  1;
          }
          if (item.ord_status == 2) {
            this.cnt_white = this.cnt_white +  1;
          }
          if (item.ord_status == 3) {
            this.cnt_yellow = this.cnt_yellow +  1;
          }
        });
        this.service.getClientSaveInfo().subscribe(data => {
          this.clientSaveInfo = data.res;
          this.clientsTurnList.filter(item => { if (item.id == this.clientSaveInfo.client_id){
            this.saveClietn = item;
            this.price = item.price;
          }});
        });
        this.ord = this.clientsTurnList.indexOf(this.client) + 1;
        this.clientsTurnListFilter = this.clientsTurnList;
      });
    });
  }

  search(text: string) {
    if (text.length < 2){
      this.clientsTurnListFilter = this.clientsTurnList;
    } else {
      text = text.trim();
      text = text.toLowerCase();
      this.clientsTurnListFilter = this.clientsTurnList.filter(item => {
        return item.fio.toLowerCase().indexOf(text) > -1;
      });
    }
  }

}
