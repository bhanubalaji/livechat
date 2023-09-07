import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserpagemainService {


  constructor(private http:HttpClient) { }

  submitdatas(data:any){
    console.log('ok')
    console.log(data)

    // return this.http.post(`http://localhost:4000/api/login_in`,datas )
    return this.http.post<any>(`http://localhost:4000/api/bhanu`,{data})

  }





  
}