import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchImgAdd } from '../../Models/BranchImgModels';

@Injectable({
  providedIn: 'root'
})
export class BranchImgService {
  API_URL = 'https://localhost:7009/api/BranchImgs';
  constructor(private http: HttpClient) { }



  upload(
    model: BranchImgAdd,
    img: File
   ) {
    const formData = new FormData();

    // Append the model data
    formData.append('name', model.name);
    formData.append('description', model.description);
    formData.append('type', model.type);
    formData.append('studentId', model.branchId);
    formData.append('addedBy', model.addedBy);

    // Append the files
    formData.append('Img', img);
    /**/

    return this.http.post(`${this.API_URL}/PostBranchImg`, formData);
  }
  update(
    model: BranchImgAdd,
    img: File
  ) {
    const formData = new FormData();

    // Append the model data
    formData.append('name', model.name);
    formData.append('address', model.description);
    formData.append('infoEmail', model.type);
    formData.append('phone', model.branchId);
    formData.append('website', model.addedBy);
 

    // Append the files
    formData.append('Img', img);
    

    return this.http.put(`${this.API_URL}/PutBranchImg`, formData);
  }

  delete(id: any) {
    return this.http.delete(`${this.API_URL}/DeleteBranchImg/${id}`);
  }

  get() {
    return this.http.get(`${this.API_URL}/GetBranchImgs`);
  }

  getById(id: any) {
    return this.http.get(`${this.API_URL}/GetBranchImg/${id}`);
  }

  getByIdandTypeGrid(id: string) {
    return this.http.get(`${this.API_URL}/GetBranchImgGrid/${id}`);
  }

  getByIdandTypeMain(id: string) {
    return this.http.get(`${this.API_URL}/GetBranchImgMain/${id}`);
  }

  getByIdandTypeLogo(id: string) {
    return this.http.get(`${this.API_URL}/GetBranchImgLogo/${id}`);
  }

  getImgType() {
    return this.http.get('https://localhost:7009/api/BImgTypes/GetBImgTypes')
  }
}

