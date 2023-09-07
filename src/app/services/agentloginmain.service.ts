import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentloginmainService {

  constructor(private http: HttpClient) { }

  submitdatas(data: any) {
    return this.http.post(`http://localhost:4000/api/agentlogindata`, { data })
  }
}
