import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../core/service/data.service";
import {Observable} from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { idText } from 'typescript';
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
  filesUploaded=false;
  progressInfos:any;
  message = '';
  fileInfos!: Observable<any>;
  pid!:string
  size:number =0
  uploadPath:string = 'images/' + localStorage.getItem('uid') + '/cart/'

  constructor(private route:ActivatedRoute,
              private modal: NgbModal,
              private http: HttpClient,
              private router: Router,
              private fb: FormBuilder,
              private dataService: DataService) {
    // this.createForm();
    // console.log(this.customizeForm)

  }
  //
  ngOnInit(): void {

    this.route.queryParams.subscribe(params =>{
      console.log(params.id)
      console.log(params.size)
      this.pid=params.id
      this.size=params.size

      })


  //   console.log(this.dataService.prodImageCount+","+this.dataService.prodTextCount)
  //   this.createForm()
  //
  //   for (let i = 0; i < this.dataService.prodImageCount; i++) {
  //     this.im.push(this.fb.group({
  //       file: [null, Validators.required]
  //     }));
  //   }
  //
  //   for (let i = 0; i < this.dataService.prodTextCount; i++) {
  //     this.te.push(this.fb.group({
  //       text: ['', Validators.required]
  //     }));
  //   }
  //
  }
  //
  // get f() { return this.customizeForm.controls; }
  // get im() {return this.f.images as FormArray; }
  // get te() {return this.f.texts as FormArray; }
  //
  // createForm() {
  //   this.customizeForm = this.fb.group({
  //     images: new FormArray([]),
  //     texts: new FormArray([])
  //   });
  // }
  //
  // onFileChange(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(file)
  //   }
  // }
  //
  // onSubmit(){
  //   console.log(this.customizeForm.value)
  // }



  selectFiles(event:any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  async uploadFiles() {
    //clearing directory to remove older images
    this.message=""
    let dirClear:boolean = true;
    this.filesUploaded=false;
    
    this.uploadPath = this.uploadPath + this.pid + '/'
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
    // subscribe(
    //   event => {
    //     // console.log(event)
    //     // if (event.type === HttpEventType.UploadProgress) {
    //     // } else if (event instanceof HttpResponse) {
    //     //   // this.fileInfos = this.uploadService.getFiles();
    //     // }
    //     // window.alert("Uploaded successfully")
    //     this.message = 'Uploaded Successfully';
    //   },
    //   err => {
    //     // this.progressInfos[idx].value = 0;
    //     // this.message = 'Error uploading files!';
    //     window.alert("Upload Error, please retry!");
    //   });
  }

  addtocart(){
    let data = {'email': localStorage.getItem("uid"),
                'pid': this.pid,
                'size': this.size,
                'images': this.uploadPath,
                'texts': ''}
    console.log(data)

    this.dataService.validateUser(data).then(res=>{
      this.dataService.addToCart(data)
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
