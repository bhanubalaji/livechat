import { Component, NgZone, ViewEncapsulation, ElementRef, ViewChild  } from '@angular/core';
import { AgentpagesocketService } from '../services/agentpagesocket.service';
import { Router } from '@angular/router';
import { AgentloginmainService } from '../services/agentloginmain.service';
import { AgentpagemainService } from '../services/agentpagemain.service';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgentdashboardComponent {
  @ViewChild('msgboxcfootontainer', { static: true }) msgboxcfootontainer!: ElementRef;
  x: boolean = false
  y: any
  inputmessage: any = '';
  messages: any[] = [];
  agentname: any | undefined
  nameofclient: any;
  imgsidebardatachange: any = true;
  imgsidebardatachange1: any = false;
  imgsidebardatachange2: any = false
  rightsidebarimage: any = true;
  clienddataarray: any[] = []
  currentclienddataarray: any
  currenttime: any = []
  nameoftheclient: any
  emailoftheclient: any
  idoftheclient: any
  onlinestatusofclient: any
  onlinestatusofclienttruefalse: any
  onlinestatusofclienttruefalse1: any
  onlineagentstatus:boolean=true
  typingmsg:any
  inputbuttononload:boolean=true

  constructor(private homesocketService: AgentpagesocketService, private router: Router, private agentmainservice: AgentpagemainService, private ngZone: NgZone) { }

  scrollToBottom() {
    const element = this.msgboxcfootontainer.nativeElement;
    element.scrollTop = element.scrollHeight;
    
  }
  // getColor(item:any) {
  //   console.log(item)
  //   // return (item.onlinestaus=='Online') ? 'green' : 'red';
  
  // }

  append(message: any, position: any) {
    this.messages.push({ content: message, position });
    // Optionally, you can play an audio here
  }


  sendMessage(event: Event) {
    event.preventDefault();
    var message = this.inputmessage.trim();
    if (message !== '') {
      this.append(`You: ${message}`, 'right');
      var data = {
        id: this.idoftheclient,
        name: this.agentname,
        message: message
      }
      console.log(data)
      this.homesocketService.sendMessage(data);
      this.inputmessage = '';
    }
    
  this.scrollToBottom();
  }

  ngOnInit() {


  

    this.inputbuttononload=false;
    
    this.homesocketService.onUserTyping((userId:any) => {
      console.log(userId)
      if(userId.roomId){
        this.typingmsg='Typing....'
        for(let item of this.clienddataarray)
        if(item._id==userId.roomId){
          item.typingmsg= this.typingmsg
        }
      }
   
   
       });
   
       this.homesocketService.onUserStoppedTyping((userId:any) => {
      console.log(userId)

      if(userId.roomId){

        this.typingmsg=''
        for(let item of this.clienddataarray)
        if(item._id==userId.roomId){
          item.typingmsg= this.typingmsg
        
        }
      }
   
       });




    this.homesocketService.onMessagename((name) => {
      console.log(name.name)
      this.append(`${name.name} joined the chat`, 'left')
    })

    // this.homesocketService.onMessagename((name) => {
    //   this.append(`${name.name} joined the chat`, 'left')
    // })

    // this.homesocketService.onMessagename((name) => {
    //   this.nameofclient = `${name.name}`
    //   console.log(this.nameofclient)
    //   console.log(name)
    // });

    this.homesocketService.onMessageReceived((message) => {
      console.log(message)
      this.append(`${message.name}:${message.message}`, 'left');
    });








    this.agentmainservice.clienddataarray().subscribe((res) => {
      console.log(res.data)
      let alldata = res.data
      if (alldata) {
        for (let item of alldata) {
          item.src = '../../assets/profile-icon.png'
        }

        for (let items of alldata) {
          if (items.onlinestaus == true) {
            items.onlinestaus = 'Online'
          } else {
            items.onlinestaus = 'Offline'
          }
        }

        this.clienddataarray = (alldata)
        console.log(this.clienddataarray)
      }


    })



    var time = new Date()
    this.currenttime = time.toLocaleTimeString();





















  }





  rightsideimgbutton() {
    this.x = true
    this.rightsidebarimage = false
    console.log('ok')
  }

  rightsideimgbuttonofexist() {
    this.x = false
    this.rightsidebarimage = true
  }

  imgsidebardata() {
    this.imgsidebardatachange = true;
    this.imgsidebardatachange2 = false;
    this.imgsidebardatachange1 = false;

  }
  imgsidebardata1() {
    this.imgsidebardatachange = false;
    this.imgsidebardatachange2 = false;
    this.imgsidebardatachange1 = true;

  }
  imgsidebardata2() {
    this.imgsidebardatachange = false;
    this.imgsidebardatachange1 = false;
    this.imgsidebardatachange2 = true;
    sessionStorage.removeItem('agent');
    this.router.navigate(['agentlogin'])

  }





  clickbuttonclienddataarray(data: any) {
    this.messages = []
    this.inputbuttononload=true;

    if( this.idoftheclient!==null){
  // var agentnamedata = {
  //     clientname: this.idoftheclient,
  //     agentname: this.agentname,
  //     // onlinestatusage:false
  //   }
  //   this.homesocketService.sendname(agentnamedata);
  //   console.log(data)
    var status = {
      clientname: this.idoftheclient,
      onlinestatusage:false
    }
    this.homesocketService.status(status);


    }

   
  
    
  
    this.agentmainservice.singledataarray(data).subscribe((res) => {
      console.log(res.mydata)

      if (res.mydata) {
        this.currentclienddataarray = (res.mydata)
        this.currentclienddataarray.src = '../../assets/profile-icon.png'
        this.idoftheclient= res.mydata._id
        this.nameoftheclient = res.mydata.name
        this.emailoftheclient = res.mydata.email
        if (res.mydata.onlinestaus == true) {
          this.onlinestatusofclient = 'Online'

        }
        else {
          this.onlinestatusofclient = 'Offline'
        }


        this.startSessionTimer();

        console.log(this.currentclienddataarray)
        let messagearray = res.mydata.allmessagedata   //for history of messgae of client
        for (let item of messagearray) {
          this.messages.push(item)
        }






      }
      // Get data from local storage
      const userData = sessionStorage.getItem('agent');
      if (userData !== null) {
        const user = JSON.parse(userData);
        console.log(user)
        this.agentname = user.email
        console.log(this.agentname)
        // this.append(`${this.agentname} joined the chat`, 'right')
       this.onlineagentstatus=true
        var agentnamedata = {
          clientname:this.idoftheclient,
          agentname: this.agentname,
          // onlinestatusage:this.onlineagentstatus
        }
       this.homesocketService.sendname(agentnamedata);
        var status = {
          clientname: this.idoftheclient,
          onlinestatusage:this.onlineagentstatus
        }
        this.homesocketService.status(status);
    
      } else {
        console.log('User data not found in local storage.');
      }



    })



  }




  startSessionTimer() {
    setInterval(() => {
      this.ngZone.run(() => {
        // Code to be executed every 1 second
        this.endclientchat(); // Call your function here
      });
    }, 2000); // 1000 milliseconds = 1 second
  }

  

  endclientchat() {
    var data = {
      email:    this.idoftheclient,
      msgarray: this.messages

    }
    this.agentmainservice.endclientchat(data).subscribe((res) => {
      // console.log(res)
      if (res.mydata.acknowledged == true) {
        // this.messages=[]
      }
    })
  }



  changebutclienddataarray(data:any){
    console.log('onchange')
  }


  onFocus(){
    this.homesocketService.startTyping(this.idoftheclient);

  }

onBlur(){
  this.homesocketService.stopTyping(this.idoftheclient);
}


}


