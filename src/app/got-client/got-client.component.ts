import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GotClientShortModel } from '../models/gotClientShortModel';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-turn-client',
  templateUrl: './got-client.component.html',
  styleUrls: ['./got-client.component.css']
})
export class GotClientComponent implements OnInit {
  clientsTurnList: GotClientShortModel[];
  clientsTurnListFilter: GotClientShortModel[];

  constructor(private service: ClientService, private route: Router, private elRef: ElementRef) {
    elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F1F8F7';
  }

  ngOnInit() {
    this.service.getGotClients().subscribe(data => {
        this.clientsTurnList = data.res;
        this.clientsTurnListFilter = this.clientsTurnList;
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
