import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserpageService } from '../services/userpage.service';
import { UserpagemainService } from '../services/userpagemain.service';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  x: boolean = true
  y: boolean = false
  z: boolean = false
  a: boolean = false
  b: boolean = false
  registerdata!: FormGroup
  registerdataofcon2!: FormGroup
  inputmessage: any
  messages: any = []
  responsedata: any

  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' }
  ];
  constructor(private fs: FormBuilder, private router: Router, private socketService:UserpageService,private mainservice:UserpagemainService) { }


  append(message: any, position: any) {
    this.messages.push({ content: message, position });
  }



  submitdataofcon2(event: Event) {
    event.preventDefault();
     const message = this.registerdataofcon2.get('textdata')?.value
    if (message !== '') {
      this.append(`You: ${message}`, 'right');
      var data={
        id:this.responsedata,
         name:this.responsedata,
         message :message
      }
      this.socketService.sendMessage(data);
      this.registerdataofcon2.get('textdata')?.setValue(' ')
    }
  }





  ngOnInit() {

    this.registerdata = this.fs.group({
      name:  ['', [Validators.required]],
      email:  ['', [Validators.required]],
      num:  ['',[Validators.required]],
      optiondata:  ['',[Validators.required]],
    })




    this.registerdataofcon2 = this.fs.group({
      textdata: [''],
    })

   



    this.socketService.onMessageReceived((message) => {
      console.log(message)
       this.append(`${message.name}:${message.message}`, 'left');
    });




    this.socketService.onMessagename((name) => {
      this.append(`${name.name} joined the chat`, 'left')
    })
   




  }







  submitdata(data: any) {
    console.log(data.value)
    this.a=true
    this.z = false
    this.b = false
    this.y = true
    this.x = false
    var nameValue1 = this.registerdata.get('name')?.value;
    var nameValue2 = this.registerdata.get('email')?.value;
    var nameValue3 = this.registerdata.get('num')?.value;
    var nameValue4 = this.registerdata.get('optiondata')?.value;
    var formData = {
      name: nameValue1,
      email: nameValue2,
      phno: nameValue3,
      options: nameValue4,
      allmessagedata:[ {content: 'welcome', position: 'right'} ]
    };


    var formDataJson = JSON.stringify(formData);
     this.mainservice.submitdatas(formDataJson).subscribe((res: any) => {
      console.log(res)
      
      var x = JSON.parse(res.user);
      this.responsedata = x.name
      console.log(this.responsedata)
      this.append(`hi ${this.responsedata} Welcome`, 'right');
      this.socketService.sendname(this.responsedata);
     })
  }



  minimizebutton() {
    this.x = true
    this.y = false
    this.b = false
    
  
  }



  existbutton() {
    console.log("1")
    this.z = true
 }


 chatbutton() {
  this.x = false
  this.y = true
  this.b = true
  if(this.a==true){
    this.a = true
  this.b = false

  }
}





  yesconfirmexistbutton() {
    this.registerdata.setValue({
      name:  [''],
      email:  [''],
      num:  [''],
      optiondata:  [''],
    })
  this.messages = []
    this.a=false
    this.z = false
    this.b = false
    this.y = false
    this.x = true


    }


    

  noconfirmexistbutton() {
    this.z = false
  }






}






