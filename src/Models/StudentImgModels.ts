export interface StudentImgList {
  id: string,
  name: string,
  path: string,
  type: string,
  studentId :string,
  description: string,
  addedBy :string,
  addedTime: Date, 
  updatedBy: string,
  updateTime: Date, 
  bId: string,
       
}
export interface StudentImgAdd {
  name: string,
  type: string,
  studentId :string,
  description: string,
  addedBy :string,
  bId: string,
  path: string,
       
}
export interface StudentImgUpd {
  name: string,
  type: string,
  studentId :string,
  description: string,
  updatedBy: string,
  bId: string,
       
}
export interface StudentImgStId {
  studentId :string,
}
