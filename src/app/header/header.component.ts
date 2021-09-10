import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogIn=false;
  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('isUserLoggedIn')){
      this.isLogIn=true;
    }
  }

  login() {
    const modalRef = this.modal.open(LoginComponent);
    // modalRef.componentInstance.name = 'World';
  }

}
