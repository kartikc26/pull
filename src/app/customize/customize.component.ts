import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../core/service/data.service";
import {Observable} from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { idText } from 'typescript';
import { CartService } from '../core/service/cart.service';
// import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  // @Input() public noi!: string
  // @Input() public not!: string

  // customizeForm!: FormGroup;
  // errorMessage: string = '';
  //
  // data:any;

  selectedFiles!: FileList;
  selectedText:string[] =[]
  finalText:string=''
  filesUploaded=false;
  textSaved=false;
  progressInfos:any;
  message = '';
  textMessage = '';
  fileInfos!: Observable<any>;
  pid!:string
  size:number =0
  timestaMilli:number=0
  uploadPath:string = 'images/' + localStorage.getItem('uid') + '/cart/'

  constructor(private route:ActivatedRoute,
              private modal: NgbModal,
              private http: HttpClient,
              private router: Router,
              private fb: FormBuilder,
              private dataService: DataService,
              private cartService: CartService) {


  }
  
  ngOnInit(): void {

    this.route.queryParams.subscribe(params =>{
      console.log(params.id)
      console.log(params.size)
      this.pid=params.id
      this.size=params.size

    })
    console.log(Date.now())


  }

  counter() {
    return new Array(parseInt(<string>localStorage.getItem("prodTextCount")));
  }

  selectFiles(event:any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  textChanged($event:any){
    this.finalText=''
    this.textSaved=false
    this.textMessage='Please save texts'
  }

  saveText(){
    this.finalText= this.selectedText.join("~")
    console.log(this.finalText.length)

    if(this.finalText.length < 2){
      window.alert('Texts cannot be empty')
      return
    }
    this.textMessage = 'Text saved successfully'
    this.textSaved=true
  }

  async uploadFiles() {
    //clearing directory to remove older images
    this.message=""
    let dirClear:boolean = true;
    this.filesUploaded=false;
    this.timestaMilli = Date.now()
    
    this.uploadPath = this.uploadPath + this.pid + '/' + this.timestaMilli + "/"
    console.log(this.uploadPath)
    
    let noi = parseInt(<string>localStorage.getItem("prodImageCount"));
    if(this.selectedFiles.length!= noi){
      console.log("Please select "+noi+" files.")
      this.message="Please select "+noi+" files."
      return
    }

    await this.dataService.clearDir()
    .then(()=>{console.log("dir cleared")}  )
    .catch(()=> {
      dirClear = false
    });
    
    if(!dirClear){
      this.message='Upload error, please retry!'
      console.log("dir not clear")
      return
    }

    console.log(this.selectFiles)
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx:number, file:File) {

    
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    
    this.dataService.upload(file, idx, this.uploadPath).then(()=>{this.message='Uploaded Successfully'; this.filesUploaded=true;}  ).catch(()=> this.message='Upload error, please retry!')

  }

  addtocart(){
    let data = {'timesta': this.timestaMilli,
                'email': localStorage.getItem("uid"),
                'pid': this.pid,
                'size': this.size,
                'images': this.uploadPath,
                'texts': this.finalText}
    console.log(data)

    this.dataService.validateUser(data).then(res=>{
      this.cartService.addToCart(data)
      .then(()=>{
        console.log('added')
        window.alert('Product added to cart !')
        this.router.navigate([''])
      }).catch(()=>{
        console.log('not added')
        window.alert('unable to add, please retry')
      })
    }).catch(err=>{
      window.alert('Please login to continue !')
      const modalRef = this.modal.open(LoginComponent);
    })
  }

}
