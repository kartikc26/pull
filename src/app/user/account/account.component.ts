import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/service/data.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userData!:User

  constructor(private modal: NgbModal,
    private dataService: DataService) { }

  ngOnInit(): void {

    // @ts-ignore
    if(localStorage.getItem('isUserLoggedIn') && localStorage.getItem('isUserLoggedIn').toString() == "true"){
      this.dataService.getUserData(localStorage.getItem('uid')).then((res:User[])=>{
        this.userData=res[0]
        console.log(this.userData)
      }).catch(err=>console.log(err))
    }
  }

  logout() {
    this.dataService.logout()
    localStorage.setItem('uid','')
    window.location.reload()
  }

}
