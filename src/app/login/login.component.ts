import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { DataService } from '../core/service/data.service';
import * as CryptoJS from 'crypto-js';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  data:any;
  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    public activeModal: NgbActiveModal,
    private modal: NgbModal) {
      this.createForm();
      console.log(this.loginForm)

  }

  ngOnInit(): void {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required,Validators.email] ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    console.log(this.loginForm.value)
    // let a=CryptoJS.AES.encrypt(this.loginForm.value.password, environment.cryptKey.toString()).toString()
    // console.log(a)
    // let b=CryptoJS.AES.decrypt(a, environment.cryptKey.toString()).toString(CryptoJS.enc.Utf8);
    // console.log(b)
    this.dataService.login(this.loginForm.value.email).subscribe(data =>{
      this.data = data;
      if(data){
        let b=CryptoJS.AES.decrypt(data, environment.cryptKey.toString()).toString(CryptoJS.enc.Utf8);
        console.log(data);
        console.log(b);
        if(b==this.loginForm.value.password){
          localStorage.setItem('isUserLoggedIn','true');
          localStorage.setItem('uid',this.loginForm.value.email)
          console.log(localStorage.getItem('isUserLoggedIn'));
          this.activeModal.close();
          window.location.reload()
        }else{
          console.log('invalid pwd')
        }
      } else{
        console.error("cannot login")
        localStorage.setItem('isUserLoggedIn','false');
      }
    })
  }

  register(){
    this.activeModal.close()
    this.modal.open(RegisterComponent)
  }

}
