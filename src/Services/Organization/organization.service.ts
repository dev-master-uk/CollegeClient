import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationAdd, OrganizationList, OrganizationUpd } from '../../Models/OrganizationModels';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private readonly API_URL = 'https://localhost:7009/api/Organizations';

  constructor(private http: HttpClient) { }

  uploadOrganizationData(
    data: OrganizationAdd,
    mPhoto: File,
    logo: File
  ): Observable<any> {
    const formData = new FormData();

    // Append the model data
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('infoEmail', data.infoEmail);
    formData.append('phone', data.phone);
    formData.append('website', data.website);
    formData.append('addedBy', data.addedBy);

    // Append the files
    formData.append('MPhoto', mPhoto);
    formData.append('Logo', logo);

    return this.http.post(`${this.API_URL}/PostOrganizationn`, formData);
  }
  updateOrganizationData(

    data: OrganizationUpd,
    mPhoto: File,
    logo: File
  ): Observable<any> {
    const formDatau = new FormData();

    // Append the model data
    formDatau.append('id', data.id);
    formDatau.append('name', data.name);
    formDatau.append('address', data.address);
    formDatau.append('infoEmail', data.infoEmail);
    formDatau.append('phone', data.phone);
    formDatau.append('website', data.website);
    formDatau.append('updatedBy', data.updatedBy);

    // Append the files
    formDatau.append('MPhoto', mPhoto);
    formDatau.append('Logo', logo);

    return this.http.put(`${this.API_URL}/PutOrganization`, formDatau);
  }

  updateOrganization(organization: any) {

  }


  getOrganizations() {
    return this.http.get(`${this.API_URL}`);
  }
  getOrganization(id: string): Observable<OrganizationUpd> {
    return this.http.get<OrganizationUpd>(`${this.API_URL}/${id}`);
  }
  //createOrganization(organization: OrganizationAdd, logo: File, mPhoto: File) {
  //  return this.httpClient.post('https://localhost:7009/api/Organizations', organization);
  //}
  //updateOrganization(organization: any) {
  //  return this.httpClient.put('https://localhost:7009/api/Organizations', organization);
  //}
  //deleteOrganization(id: number) {
  //  return this.httpClient.delete(`https://localhost:7009/api/Organizations/${id}`);
  //}

  upload(model: OrganizationAdd, mPhoto: File,
    logo: File) {
    const formData = new FormData();

    // Append the model data
    formData.append('name', model.name);
    formData.append('address', model.address);
    formData.append('infoEmail', model.infoEmail);
    formData.append('phone', model.phone);
    formData.append('website', model.website);
    formData.append('addedBy', model.addedBy);

    // Append the files
    formData.append('MPhoto', mPhoto);
    formData.append('Logo', logo);

    return this.http.post(`${this.API_URL}/PostOrganizationn`, formData);
  }

  deleteOrganization(id: any) {
    return this.http.delete(`${this.API_URL}/DeleteOrganization/${id}`);
  }

  getOrganizationById(id: any) {
    return this.http.get<OrganizationList>(`${this.API_URL}/GetOrganization/${id}`);
  }
}
