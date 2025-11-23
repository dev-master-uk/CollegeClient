import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassGAdd } from '../../Models/ClassGModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassGService {

  private readonly API_URL = 'https://localhost:7009/api/ClassGs';

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get(`${this.API_URL}/GetClassGs`);
  }

  getClasseks() {
    return this.http.get(`${this.API_URL}/GetClassGs`);
  }

  getClassesByLevel(id: string) {
    return this.http.get(`${this.API_URL}/GetClassGsByLevelId/${id}`);
  }

  getClassesByBranch(id: string) {
    return this.http.get(`${this.API_URL}/GetClassGsByBid/${id}`);
  }

  addClass(model: ClassGAdd):Observable<any> {
    //const formDataa = new FormData();

    //// Append the model data
    //formDataa.append('name', model.name);
    //formDataa.append('levelId', model.levelId);
    //formDataa.append('addedBy', model.addedBy);
    //formDataa.append('bId', model.bId);
    //console.log('nnnnnnnn', formDataa)
    return this.http.post(`https://localhost:7009/api/ClassGs/PostClassG`,model);
  }

  deleteClass(id: string) {
    return this.http.delete('http://localhost:3000/classes/' + id);
  }

  updateClass(classG: any) {
    return this.http.put('http://localhost:3000/classes/' + classG.id, classG);
  }
   getClassesByBranchdisplaysubject(id: string) {
    return this.http.get(`${this.API_URL}/GetClassGsByBIdd/${id}`);
  }
}
