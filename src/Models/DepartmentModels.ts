export interface DepartmentList {
  id: string,
  name: string,
  addedBy: string,
  addedTime: Date,
  updatedBy: string,
  updateTime: Date,
  bId: string,
}
export interface DepartmentAdd {
  name: string,
  addedBy: string,
  bId: string,
}
