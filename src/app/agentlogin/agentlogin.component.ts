import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentloginmainService } from '../services/agentloginmain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agentlogin',
  templateUrl: './agentlogin.component.html',
  styleUrls: ['./agentlogin.component.css']
})
export class AgentloginComponent implements OnInit {

  registerdata!: FormGroup
  messageofnotdata:any


  constructor(private fs: FormBuilder, private mainlogin: AgentloginmainService, private router:Router) { }


  ngOnInit(): void {

var sessionStorageagent = sessionStorage.getItem('agent')
if(sessionStorageagent!==null){
  console.log('qqq')
  this.router.navigate(['agentdashboard'])
}


    this.registerdata = this.fs.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]]

    })
  }



  submitdata(data: any) {

    var formDataJson = JSON.stringify(data.value);
    this.mainlogin.submitdatas(formDataJson).subscribe((res: any) => {
      console.log(res.results)
      if(res.results){
       
        let data=JSON.stringify({email:'agent'})
        sessionStorage.setItem('agent', (data));
        this.router.navigate(['/agentdashboard'])
      }else{
        this.messageofnotdata='The Login Credentials Are Wrong'
      }
    }

    )
  }


}
