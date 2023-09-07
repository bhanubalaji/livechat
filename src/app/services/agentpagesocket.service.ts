import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class AgentpagesocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to the server
  }

  sendMessage(data:any) {
    console.log(data)
    this.socket.emit('message', data);
  }

  onMessageReceived(callback: (message: any) => void) {
    this.socket.on('message', callback);
  }
  sendname(agentnamedata:any) {
    console.log( agentnamedata)
    this.socket.emit('agentuserjoin', agentnamedata)
  }
  onMessagename(callback: (name: any) => void) {
    this.socket.on('agentuserjoin', callback);
  }
}
