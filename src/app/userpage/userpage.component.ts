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
  responsedataid: any
  responsedataname: any
  onlinestatus: any
agentonlinestatus:any
onlinestatusofagenttrufalse:boolean=false
agentofflinered:any
typingmsg:any
  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' }
  ];
  constructor(private fs: FormBuilder, private router: Router, private socketService: UserpageService, private mainservice: UserpagemainService) { }


  append(message: any, position: any) {
    this.messages.push({ content: message, position });
  }



  submitdataofcon2(event: Event) {
    event.preventDefault();
    const message = this.registerdataofcon2.get('textdata')?.value
    if (message !== '') {
      this.append(`You: ${message}`, 'right');
      var data = {
        id: this. responsedataid,
        name: this.responsedataname,
        message: message
      }
      this.socketService.sendMessage(data);
      this.registerdataofcon2.get('textdata')?.setValue(' ')
    }
  }





  ngOnInit() {

  
    this.socketService.onUserTyping((userId:any) => {
      console.log(userId)
      if(userId.roomId){
        this.typingmsg='Typing....'
        // for(let item of this.clienddataarray)
        // if(item._id==userId.roomId){
        //   item.typingmsg= this.typingmsg
        // }
      }
   
   
       });
   
       this.socketService.onUserStoppedTyping((userId:any) => {
      console.log(userId)

      if(userId.roomId){

        this.typingmsg=''
        // for(let item of this.clienddataarray)
        // if(item._id==userId.roomId){
        //   item.typingmsg= this.typingmsg
        
        // }
      }
   
       });


    this.socketService.onUserTyping((userId:any) => {
      console.log(`User ${userId} is typing...`);
      // Update UI to show typing indicator for user with userId
    });

    this.socketService.onUserStoppedTyping((userId:any) => {
      console.log(`User ${userId} stopped typing.`);
      // Update UI to remove typing indicator for user with userId
    });


    let sessionclientdata = sessionStorage.getItem('client')
    if (sessionclientdata == null){
      this.agentofflinered=false
    } 
    if (sessionclientdata !== null) {
      this.a = true
      this.z = false
      this.b = false
      this.y = true
      this.x = false
      console.log(sessionclientdata)
      this.agentofflinered=true

      if(this.onlinestatusofagenttrufalse==true){
        this.agentonlinestatus='agent is online'
      }else{
        this.agentonlinestatus='agent is offline'
      }

      this.mainservice.clientgetdatabyid(sessionclientdata).subscribe((res: any) => {
        console.log(res)
        let messagearra = res.mydatas.allmessagedata
        this.responsedataid = res.mydatas._id
        this.responsedataname= res.mydatas.name
        let data ={
          name:this.responsedataname,
          id:this.responsedataid
        }
   
      this.socketService.sendname(data);

        console.log(messagearra)
      this.append(`hi ${res.mydatas.name} once again Welcome`, 'right'); //for display name of client

      //   for (let item of messagearra) {
      //       if(item.position=='right'){
      //         item.position='left'
      //       }else{
      //         item.position='right'
      //        let array= item.content.split(':')
      //        if(array.length>1){
      //         var x= array.pop()
      //         item.content=`you : ${x}`
      //        }

      //       }
      //       this.messages.push(item)
      //   }
      })
    }



    this.registerdata = this.fs.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      num: ['', [Validators.required]],
      optiondata: ['', [Validators.required]],
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
      // var dataofstatus={
      //   name:name.name,
      //   this.onlinestatusofagenttrufalse=name.onlinestatusage
      // // }
      // if(name.onlinestatusage==true){
      //   this.agentonlinestatus='agent is online'
      // }else{
      //   this.agentonlinestatus='agent is offline'
      // }
 
    })

    this.socketService.onMessageofstatus((status) => {
      // this.append(`${name.name} joined the chat`, 'left')
      // var dataofstatus={
      //   name:name.name,
      console.log(status.status.onlinestatusage)
        this.onlinestatusofagenttrufalse=status.status.onlinestatusage
      // }
      if(status.status.onlinestatusage==true){
        this.agentonlinestatus='agent is online'
      }else{
        this.agentonlinestatus='agent is offline'
      }
 
    })



  }







  submitdata(data: any) {
    console.log(data.value)
    this.a = true
    this.z = false
    this.b = false
    this.y = true
    this.x = false
    this.agentofflinered=true
    this.agentonlinestatus='agent is offline'   //default offline messge at user

    var nameValue1 = this.registerdata.get('name')?.value;
    var nameValue2 = this.registerdata.get('email')?.value;
    var nameValue3 = this.registerdata.get('num')?.value;
    var nameValue4 = this.registerdata.get('optiondata')?.value;
    var formData = {
      name: nameValue1,
      email: nameValue2,
      phno: nameValue3,
      options: nameValue4,
      allmessagedata: [],
      onlinestaus: ''
    };


    var formDataJson = JSON.stringify(formData);
    this.mainservice.submitdatas(formDataJson).subscribe((res: any) => {
      console.log(res)
      this.responsedataid = res.data
      sessionStorage.setItem('client', res.data)
      var x = JSON.parse(res.user);
      this.responsedataname = x.name
      console.log(this.responsedataname)
      this.append(`hi ${this.responsedataname} Welcome`, 'right'); //for display name of client
      let data ={
        name:this.responsedataname,
        id:this.responsedataid
      }
      this.socketService.sendname(data);
      this.onlinestatus = true
      let dataforid = {
        responseid: this.responsedataid,
        online: this.onlinestatus
      }
      this.mainservice.submitdataofclientid(dataforid).subscribe((res: any) => {
        console.log(res)
      })

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
    if (this.a == true) {
      this.a = true
      this.b = false

    }
  }





  yesconfirmexistbutton() {
    this.registerdata.setValue({
      name: [''],
      email: [''],
      num: [''],
      optiondata: [''],
    })
    this.messages = []
    this.a = false
    this.z = false
    this.b = false
    this.y = false
    this.x = true
    this.agentofflinered=false

    var dataofclientidinsession = sessionStorage.getItem('client')
    if (dataofclientidinsession !== null) {
      this.responsedataid = dataofclientidinsession
    }
    sessionStorage.removeItem('client')

    this.onlinestatus = false
    let dataforid = {
      responseid: this.responsedataid,
      online: this.onlinestatus
    }
    this.mainservice.submitdataofclientid(dataforid).subscribe((res: any) => {
      console.log(res)
    })
 

  }




  noconfirmexistbutton() {
    this.z = false
  }


  onFocus(){
    this.socketService.startTyping(this.responsedataid);

  }

onBlur(){
  this.socketService.stopTyping(this.responsedataid);
}
}






