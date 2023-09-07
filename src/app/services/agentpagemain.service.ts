import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentpagemainService {

  constructor(private http:HttpClient) { }



  clienddataarray(){
    return this.http.get<any>(`http://localhost:4000/api/agentclientdata`)
  
  }

  singledataarray(data:any){
    return this.http.post<any>(`http://localhost:4000/api/singleageclidata`,{data})

  }

  // imgedataupdate(myphotoid:any,_id:any){
  //   return this.http.put<any>(`http://localhost:4000/api/postmyimageid/`+_id,{myphotoid})

  //  }
  endclientchat(data:any){
    var email=data.email
    var msgarray=data.msgarray
    return this.http.put<any>(`http://localhost:4000/api/clientarrayupdata/`+email,{msgarray})

  }
}
