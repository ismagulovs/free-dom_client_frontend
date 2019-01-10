import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValClientInfoProfile } from '../models/valClientInfoProfile';
import { DatePipe } from '@angular/common';
import { ClientService } from '../client.service';
import { ValClientDetailInfoModel } from '../models/valClientDetailInfoModel';
import { PayModel } from '../models/payModel';
import {PayChartModel} from '../models/payChart.model';

@Component({
  selector: 'app-prof-client',
  templateUrl: './prof-client.component.html',
  styleUrls: ['./prof-client.component.css']
})
export class ProfClientComponent implements OnInit {

  constructor(private route: Router, private service: ClientService, private elRef: ElementRef) {
    elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F1F8F7';
    }

  clientInfo: ValClientInfoProfile;
  clientDetailInfo: ValClientDetailInfoModel;
  pipe = new DatePipe('en-US');
  nextPayDate: any;
  payList: PayModel;
  pass = '';
  ost: number;
  payCharts: PayChartModel[];

  ngOnInit() {
    this.service.getClientInfoProfile(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(data => {
      this.clientInfo = data.res;
      this.service.getStudetDetailInfo(this.clientInfo.id).subscribe(dataRes => {
        this.clientDetailInfo = dataRes.res;
      });
      const now = new Date();
      const eDate = new Date(this.clientInfo.date_entry);
      eDate.setFullYear(now.getFullYear());
      if (Number(now.getUTCDate()) > Number(eDate.getUTCDate())) {
        eDate.setMonth(now.getUTCMonth() + 1);
      }
      if (now.getUTCDate() > eDate.getUTCDate()) {
        if ((now.getUTCMonth() + 2 ) > 12) {
          this.nextPayDate = this.pipe.transform(eDate, 'dd.01.yyyy');
        } else {
          this.nextPayDate = this.pipe.transform(eDate, 'dd.' +(now.getUTCMonth() +2)+'.yyyy');
        }
      } else {
        if ((now.getUTCMonth() + 1 ) > 12) {
          this.nextPayDate = this.pipe.transform(eDate, 'dd.01.yyyy');
        } else {
        this.nextPayDate = this.pipe.transform(eDate, 'dd.' +(now.getUTCMonth() +1)+'.yyyy');
        }
      }
    });

    this.service.getInfoOst(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(dataOst => {
      this.ost =  dataOst.res;
    });

    this.service.getPayments(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(data => {
      if (data.errorCode == 0) {
        this.payList = data.res;
      }
    });

    this.service.getPayChartList(Number(localStorage.getItem('free_dom_kz_cabinet'))).subscribe(data=>{
      if (data.errorCode == 0) {
        this.payCharts = data.res;
      }
      console.log(this.payCharts);
    });

  }

  openSm(content) {
    // this.modalService.open(content, { size: 'lg' });
  }

  upPass(pass: string) {
    if (pass.length > 4) {
      this.service.upPassword(pass).subscribe(data => {
        if ( data.errorCode == 0 ) {
          this.route.navigate(['./login']);
        } else {
          alert(data.errorMsgRus);
        }
      });
    }
  }

  print( type: number ) {
    this.service.payReport(Number(localStorage.getItem('free_dom_kz_cabinet')), type).subscribe(res=>{
      const file = new Blob([res], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
