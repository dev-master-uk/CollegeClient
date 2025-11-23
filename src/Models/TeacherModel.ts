export interface TeacherListModel {
  id:string,
  departmentName: string,
  title: string,
  jopDescription: string,
  email: string,

  addedBy: string,
  imgPath:string,

  name: string,

  subjectNames: { id: string, name: string }[],
  bId: string


}
export interface TeacherAddModel {
  userName: string,
  title: string,
  jopDescription: string,
  email: string,
  departmentId: string,
  addedBy: string,
  branchId: string,
  userType: string,
  firstName: string,
  lastName: string,
  password: string,
  roles: string[]
}
export interface TeacherUpdUncompletedModel {
         title :string,
         jopDescription :string,
         departmentId :string,
         updatedBy :string,
}
export interface TeacherRegisterModel {
  userName: string,
  title: string,
  jopDescription: string,
  email: string,
  departmentId: string,
  addedBy: string,
  branchId: string,
  userType: string,
  firstName: string,
  lastName: string,
  password: string,
  roles: string[]

}
export interface UpdateTeacherSubjecModel {
  SubjectIds: string[]
 
}
export interface UpdateTeacherClassModel {

  ClassGIds: string[]
}