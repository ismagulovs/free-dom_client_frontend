import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  msgError: string;

  constructor(private service: ClientService,  private router: Router, private elRef: ElementRef) {
    if (localStorage.getItem('free_dom_kz_key') != null) {
      this.service.authService().subscribe(data => {
        if ( data['res']['roleId'] != 2) {
          localStorage.removeItem('free_dom_kz_key');
          this.msgError = 'неверный логин или пароль';
        } else {
          localStorage.setItem('free_dom_kz_role', data['res']['roleId']);
          this.router.navigate(['/']);
        }
      });
    }
    elRef.nativeElement.ownerDocument.body.style.backgroundImage =  'url(\'/assets/img/login-bg.jpg\')';
    elRef.nativeElement.ownerDocument.body.style.backgroundSize =  'cover';
    elRef.nativeElement.ownerDocument.body.style.backgroundRepeat =  'no-repeat';

    // elRef.nativeElement.ownerDocument.body.classList.add('bg-img');
    // "url('/assets/img/login-bg.jpg') no-repeat center";
  }

  ngOnInit() {
  }

  clearErr() {
    this.msgError = null;
  }

  login(login: string, pass: string) {
    localStorage.setItem('free_dom_kz_key',  btoa(login + ':' + pass));
    this.service.authService().subscribe(data => {
        if ( data['res']['roleId'] != 2) {
          localStorage.removeItem('free_dom_kz_key');
          this.msgError = 'неверный логин или пароль';
        } else{
          localStorage.setItem('free_dom_kz_role', data['res']['roleId']);
          this.router.navigate(['/']);
        }
      },
      (err: any ) => {
        this.msgError = 'неверный логин или пароль';
      });
  }

}
