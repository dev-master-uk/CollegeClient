import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchAdd, BranchList, BranchUpd } from '../../Models/BranchModels';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  //Add Branch
  addBranch(data: BranchAdd,
    mPhoto: File,
    logo: File): Observable<any> {
    const formData = new FormData();

    formData.append('name', data.name );
  
    formData.append('addedBy',data.addedBy );
    formData.append('address', data.address );
    formData.append('infoEmail', data.infoEmail );
    formData.append('phone', data.phone );
    formData.append('website', data.website );
    formData.append('location', data.location );
    formData.append('organizationId', data.organizationId );
    formData.append('facebookUrl', data.facebookUrl );
    formData.append('twitterUrl', data.twitterUrl );
    formData.append('instagramUrl', data.instagramUrl );
    formData.append('youtubeUrl', data.youtubeUrl );
    formData.append('linkedinUrl', data.linkedinUrl );
    formData.append('snapchatUrl', data.snapchatUrl );
    formData.append('whatsappUrl', data.whatsappUrl );
    formData.append('telegramUrl', data.telegramUrl );
    formData.append('googleUrl', data.googleUrl);

    // Append the files
    formData.append('MPhoto', mPhoto);
    formData.append('Logo', logo);


    return this.http.post('https://localhost:7009/api/Branches/PostBranch', formData);
  }
  //Update Branch
  updateBranch(data: BranchUpd): any {
    return this.http.put('https://localhost:7009/api/Branches/PutBranch', data);
  }
  //Delete Branch
  deleteBranch(id: any): any {
    return this.http.delete(`https://localhost:7009/api/Branches/DeleteBranch/${id}`);
  }
  //Get All Branches
  getAllBranches(): any {
    return this.http.get('https://localhost:7009/api/Branches/GetBranches');
  }
  //Get Branch by ID
  getBranchById(id: any): Observable<BranchList> {
    return this.http.get<BranchList>(`https://localhost:7009/api/Branches/GetBranch/${id}`);
  }

}
