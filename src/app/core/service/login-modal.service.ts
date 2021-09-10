import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {

  constructor(private modalService: NgbModal
    ) { }

    openModal(component: any) {
        const modalRef = this.modalService.open(component, {
            windowClass: 'custom-modal',
            // size: "500px",
            keyboard: true,
            centered: true
        });
        // modalRef.componentInstance.responseData = responseData;
        // modalRef.result.then((result) => {
        //     // modal result
        // })
        // .catch((error) => {
        // });
    }
}
