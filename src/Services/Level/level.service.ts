import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private readonly url = 'https://localhost:7009/api/Levels'; 
  constructor(private http: HttpClient) { }
  getLevels(): any {
    return this.http.get(`${this.url}/GetLevels`);
  }

  getLevelsbyBranch(id:string): any {
    return this.http.get(`${this.url}/GetLevelsByBrId/${id}`);
  }

  getLevelById(id: any): Observable<any> {
    return this.http.get(`${this.url}/GetLevel/${id}`);
  }

  addLevel(data: any): Observable<any> {
    return this.http.post(`${this.url}/PostLevel`, data);
  }

  updateLevel(data: any): any {
    return this.http.put(`${this.url}/PutLevel`, data);
  }

  deleteLevel(id: any): any {
    return this.http.delete(`${this.url}/DeleteLevel/${id}`);
  }
  

}
