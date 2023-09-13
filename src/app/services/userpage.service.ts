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


  sendname(data:any) {
    console.log(data)
    this.socket.emit('userjoin', data);
  }

  onMessagename(callback: (name: any) => void) {
    this.socket.on('userjoin', callback);
    // console.log(name)

}
startTyping(roomId:any) {
  this.socket.emit('typing', roomId);
}

stopTyping(roomId:any) {
  this.socket.emit('stopTyping', roomId);
}


onUserTyping(callback:any) {
  this.socket.on('userTyping', (userId) => {
    callback(userId);
  });
}

onUserStoppedTyping(callback:any) {
  this.socket.on('userStoppedTyping', (userId) => {
    callback(userId);
  });
}


onMessageofstatus(callback: (status: any) => void) {
  this.socket.on('status', callback);
  // console.log(name)

}
}