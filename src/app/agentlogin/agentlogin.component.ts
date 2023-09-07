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



  constructor(private fs: FormBuilder, private mainlogin: AgentloginmainService, private router:Router) { }


  ngOnInit(): void {

    this.registerdata = this.fs.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]]

    })
  }



  submitdata(data: any) {

    var formDataJson = JSON.stringify(data.value);
    this.mainlogin.submitdatas(formDataJson).subscribe((res: any) => {
      console.log(res.result)
      if(res.result){
        sessionStorage.setItem('agent', (res.result));
        this.router.navigate(['/agentdashboard'])
      }
    }

    )
  }


}
