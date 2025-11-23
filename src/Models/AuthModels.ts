export interface AddRole {

  role: string,

}
export interface ChangePasswordModel {

  username: string,
  password: string,
  newpassword: string
}
export interface LoginRequest {
 

  username: string;
  password: string;
}
export interface LoginResponse {
  token: string,
  id: string,
  username: string,
  email: string,
  branchId: string,
  roles: string[],
  userType: string
}
export interface Register {

  username: string,
  email: string,
  password: string,
  roles: string[],
 firstName :string,
  lastName :string,
  userType: string,
  branchId: string
}

 
export interface User {
  id: string,
  branchId: string,
  email: string,
  username: string,
  userType: string,
  roles: string[]
}
