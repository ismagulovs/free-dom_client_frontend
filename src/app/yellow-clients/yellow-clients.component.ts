import {Component, ElementRef, OnInit} from '@angular/core';
import {ClientService} from '../client.service';
import {Router} from '@angular/router';
import {ValClientQueueModel} from '../models/valClientQueueModel';

@Component({
  selector: 'app-yellow-clients',
  templateUrl: './yellow-clients.component.html',
  styleUrls: ['./yellow-clients.component.css']
})
export class YellowClientsComponent implements OnInit {

  clientsTurnList: ValClientQueueModel[];
  clientsTurnListFilter: ValClientQueueModel[];

  constructor(private service: ClientService, private route: Router, private elRef: ElementRef) {
    elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F1F8F7';
  }

  ngOnInit() {
    this.service.getYellowClients().subscribe(data => {
      this.clientsTurnList = data.res;
      this.clientsTurnListFilter = this.clientsTurnList;
    });
  }

  search(text: string) {
    if (text.length < 2) {
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
