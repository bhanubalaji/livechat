import { Component, ViewEncapsulation } from '@angular/core';
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



  constructor(private homesocketService: AgentpagesocketService, private router: Router, private agentmainservice: AgentpagemainService) { }




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
        id: this.nameoftheclient,
        name: this.agentname,
        message: message
      }
      console.log(data)
      this.homesocketService.sendMessage(data);
      this.inputmessage = '';
    }
  }

  ngOnInit() {


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
   this.messages=[]
    // console.log(data)
    this.agentmainservice.singledataarray(data).subscribe((res) => {
      console.log(res.mydata)

      if (res.mydata) {
        this.currentclienddataarray = (res.mydata)
        this.currentclienddataarray.src = '../../assets/profile-icon.png'
        this.nameoftheclient = res.mydata.name
        this.emailoftheclient = res.mydata.email


        console.log(this.currentclienddataarray)
        let messagearray = res.mydata.allmessagedata
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
        this.append(`${this.agentname} joined the chat`, 'right')
        var agentnamedata = {
          clientname: this.nameoftheclient,
          agentname: this.agentname,
        }


        this.homesocketService.sendname(agentnamedata);

      } else {
        console.log('User data not found in local storage.');
      }



    })

  }






  endclientchat(){
    var data={
      email:this.emailoftheclient,
      msgarray:this.messages

}
    this.agentmainservice.endclientchat(data).subscribe((res) => {
console.log(res)
if(res.mydata.acknowledged==true){
this.messages=[]
}
    })
  }






}
