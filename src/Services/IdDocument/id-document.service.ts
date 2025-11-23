import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AddIdDocumentModel } from '../../Models/IdDocumentModels';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdDocumentService {

  constructor(private http: HttpClient) { }

  getbyStudentId(id: string) {
    return this.http.get(`${environment.apiBaseUrl}IdDocuments/GetByStudentId/${id}`);
  }
  getDocumentTypeByBid(id: string) {
    return this.http.get(`${environment.apiBaseUrl}DocumentIdTypes/GetDocumentIdTypeByBid/${id}`);
  }
  postDocument(
    model: AddIdDocumentModel,
    dFile: File) { 
     const formData = new FormData();

    // Append the model data
    formData.append('name', model.name);
    formData.append('documentIdTypeId', model.documentIdTypeId);
formData.append('studentId', model.studentId);
formData.append('description', model.description);
formData.append('addedBy', model.addedBy);
formData.append('bId', model.bId);

// Append the files
    formData.append('DFile', dFile);
    console.log("service", dFile)
    return this.http.post(`${environment.apiBaseUrl}IdDocuments/PostIdDocument`, formData);
  }
}
