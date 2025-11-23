export interface LevelListModel {
  id: string;
  name: string;
  addedBy:string; 
  updatedBy: string;
  branchName: string;
  classs: string[];
  addedTime: string;
  updateTime: string;

}
export interface LevelAddModel {
  
  name: string;
  branchId: string;
  addedBy:string; 
  
}
export interface LevelUpdModel {
  id: string;
    name: string;
  addedBy:string; 
  updatedBy:string;
}
