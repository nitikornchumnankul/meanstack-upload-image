import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fileUpload';
  
  multipleImages = [];
  imagePath:any;
  images:any;
  constructor(private http: HttpClient,
    private _sanitizer: DomSanitizer
    ){}

  ngOnInit(){
    this.http.get('http://localhost:3000/upload').subscribe(res => {
      this.imagePath = this.toArray(res)
     
    });
  }

  toArray(file){
    let data = new Array();
    let imagePath = new Array();
    for(var i = 0; i < file.length; i ++){
      imagePath[i] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + file[i].img.data);
      data.push(imagePath[i])
    }
    return data;
  }



  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
