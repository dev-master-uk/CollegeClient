import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralMessageService {
   private readonly API_URL = 'https://localhost:7009/api/GMessages';

  constructor(private http: HttpClient) { }

  sendMessage(message: any){
    console.log('Sending message:', message);
    return this.http.post(`${this.API_URL}/PostGMessage`, message );
  }
  getMessageByClassId(classId: string){
    return this.http.get(`${this.API_URL}/GetMessageByClassId/${classId}`);
  }
  getMessageById(id: string){
    return this.http.get(`${this.API_URL}/GetGMessageById/${id}`);
  }
}
