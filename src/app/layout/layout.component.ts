import {Component, ElementRef, OnInit} from '@angular/core';
import {ValClientQueueModel} from '../models/valClientQueueModel';
import {Router} from '@angular/router';
import {NotiClientShort} from '../models/notiClientShort';
import {ClientService} from '../client.service';
import {ValClientShortInfoModel} from '../models/valClientShortInfoModel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  clientInfo: ValClientShortInfoModel;
  client: ValClientQueueModel;
  cabinet = new Array;
  cabinetActive: number;
  ost: number;
  noti: NotiClientShort;
  month_arr = ['января', 'февраля', 'марта', 'апреля', 'майя', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  month_str: string;
  constructor(private _service: ClientService, private route: Router, private elRef: ElementRef) {
    if (localStorage.getItem('free_dom_kz_key') == null) {
      this.route.navigate(['/login']);
    }
    this.elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F1F8F7';
    this.elRef.nativeElement.ownerDocument.body.style.backgroundImage = null;
  }
  ngOnInit() {
    if (Number(localStorage.getItem('free_dom_kz_role')) == 1) {
      this.route.navigate(['./admin']);
    }
    this._service.getClientCabinet().subscribe(data => {
      this.cabinet = data.res;
      if (localStorage.getItem('free_dom_kz_cabinet') != null) {
        if (this.cabinet.forEach((item, i) => {if (item[0] == Number(localStorage.getItem('free_dom_kz_cabinet'))) {
          this.ost = item[1] > 0 ? item[1] : 0;
          return true;
        }})) {
          localStorage.removeItem('free_dom_kz_cabinet');
          localStorage.setItem('free_dom_kz_cabinet', String(this.cabinet[0][0]));
        }

        if (this.cabinet.findIndex(item => item[0] == Number(localStorage.getItem('free_dom_kz_cabinet'))) == -1) {
          localStorage.removeItem('free_dom_kz_cabinet');
          localStorage.setItem('free_dom_kz_cabinet', String(this.cabinet[0][0]));
        }
      } else {
        localStorage.setItem('free_dom_kz_cabinet', String(this.cabinet[0][0]));
      }
      this.cabinet.forEach((item, i) => {
        if (item[0] == Number(localStorage.getItem('free_dom_kz_cabinet'))) {
          this.cabinetActive = i + 1;
        }
      });

      this._service.getClientShortInfo(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(data => {
        this.clientInfo = data.res;
        this.route.navigate(['./']);
        this._service.getInfoOst(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(dataOst => {
          this.ost =  dataOst.res > 0 ? 0 : dataOst.res * -1;
        });
      });

      this._service.getNoti(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(data => {
        if (data.errorCode == 0) {
          this.noti = data.res;
          const monthNow = new Date();
          if (this.noti.day_now > this.noti.day_cleint) {
            if (monthNow.getUTCMonth() + 1 == 12) {
              this.month_str = this.month_arr[0];
            } else {
              this.month_str = this.month_arr[monthNow.getUTCMonth() + 1];
            }
          } else {
            this.month_str = this.month_arr[monthNow.getUTCMonth()];
          }
        } else {
          this.noti = null;
        }
      });
    });
  }
  exit() {
    localStorage.removeItem('free_dom_kz_key');
    localStorage.removeItem('free_dom_kz_cabinet');
    localStorage.removeItem('free_dom_kz_role');
    this.route.navigate(['./login']);
  }

  onCabinet(id: number) {
    localStorage.removeItem('free_dom_kz_cabinet');
    localStorage.setItem('free_dom_kz_cabinet', String(id));
    location.reload();
  }
}
