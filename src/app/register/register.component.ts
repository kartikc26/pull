import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { DataService } from '../core/service/data.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';
  data:any;

  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    public activeModal: NgbActiveModal) {
      this.createForm();
    
  }

  ngOnInit(): void {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['',[Validators.required, Validators.minLength(6)]],
      password2: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value.email)
    console.log(this.registerForm.value.password)
    if(this.registerForm.value.password != this.registerForm.value.password2){
      this.errorMessage = 'Both passwords should match'
      this.registerForm.invalid
      return
    }
    this.registerForm.value.password=CryptoJS.AES.encrypt(this.registerForm.value.password, environment.cryptKey.toString()).toString()
    console.log(this.registerForm.value.password)
    this.dataService.register(this.registerForm.value).subscribe(data =>{
      if(data){
        console.log("Registered : "+data)
      } else{
        window.alert("User already registered")
      }
    })
    
    
  }

}
