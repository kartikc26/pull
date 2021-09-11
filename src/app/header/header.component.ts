import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import {DataService} from "../core/service/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogIn=false;
  constructor(private modal: NgbModal,
              private dataService: DataService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("isUserLoggedIn"))
    // @ts-ignore
    if(localStorage.getItem('isUserLoggedIn').toString() == "true"){
      this.isLogIn=true;
    }
  }

  login() {
    const modalRef = this.modal.open(LoginComponent);
    // modalRef.componentInstance.name = 'World';
  }

  logout() {
    this.dataService.logout()
    this.isLogIn=false;
    window.location.reload()
  }
}
