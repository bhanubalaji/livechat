import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class UserpageService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to the server
  }

  sendMessage(data:any) {
    console.log(data)
    this.socket.emit('message', data);
  }

  onMessageReceived(callback: (message: any) => any) {
    console.log("akkk")
    this.socket.on('message', callback);
  }


  sendname(name:any) {
    console.log(name)
    this.socket.emit('userjoin', name);
  }

  onMessagename(callback: (name: any) => void) {
    this.socket.on('userjoin', callback);
    // console.log(name)

}
}