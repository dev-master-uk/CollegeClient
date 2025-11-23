import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddMessage } from '../../Models/MessageModels';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  private readonly API_URL = 'https://localhost:7009/api/Messages';

  public getMessages() {
    return this.http.get(`${this.API_URL}/`);
  }

  public getMessageById(id: string) {
    return this.http.get(`${this.API_URL}/${id}`);
  }
  public getMessagesByStudentId(studentId: string) {
    return this.http.get(`${this.API_URL}/GetMessageByStudentId/${studentId}`);
  }
  public createMessage(message: AddMessage) {
    console.log('Creating message9999999999:', message);
    return this.http.post<AddMessage>(`${this.API_URL}/PostMessage`, message);
  }

  public updateMessage(id:string) {
    return this.http.get(`${this.API_URL}/MarkAsRead/${id}`);
  }

  public deleteMessage(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  public countUnreadMessagesMessages(id: string) {
    return this.http.get(`${this.API_URL}/CountUnreadMessageByStudentId/${id}`);
  }

}
