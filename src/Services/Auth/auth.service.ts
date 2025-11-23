import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, LoginResponse, AddRole, ChangePasswordModel, Register } from '../../Models/AuthModels';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookie: CookieService) { };

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`https://localhost:7009/api/Auths/Login`, {

      username: request.username,
      password: request.password

    });

  }

  setUser(user: User): void {

    this.$user.next(user);


    localStorage.setItem('user-id', user.id);

    localStorage.setItem('user-email', user.email);

    localStorage.setItem('user-branchId', user.branchId);

    localStorage.setItem('user-username', user.username);

    localStorage.setItem('user-roles', user.roles.join(','));

    localStorage.setItem('user-userType', user.userType);
  };

  user(): Observable<User | undefined> {

    return this.$user.asObservable();
  };
  getuserById(id: string) {
    return this.http.get(`${environment.apiBaseUrl}Auths/GetUserById/${id}`);
  }
  getUser(): User | undefined {

    if (localStorage) {

    const id = localStorage.getItem('user-id');

    const email = localStorage.getItem('user-email');

    const branchId = localStorage.getItem('user-branchId');

    const username = localStorage.getItem('user-username');

    const roles = localStorage.getItem('user-roles');

    const userType = localStorage.getItem('user-userType');

      if (username && roles && email && branchId && id && userType) {

        const user: User = {
          id: id,

          branchId: branchId,

          email: email,

          username: username,

          roles: roles.split(','),

          userType:userType

        };

        return user;
      }

    }

    return undefined;

  }
  logout(): void {

    localStorage.clear(),

      this.cookie.delete('Authorization', '/')

    this.$user.next(undefined);
  };
  getusers() {
    return this.http.get(`${environment.apiBaseUrl}Auths/RolesManager`)
  }
  getAllRoles() {
    return this.http.get(`${environment.apiBaseUrl}Auths/GetAllRoles`)
  }
  addRoles(id: string, addRole: AddRole) {
    return this.http.post<AddRole>(`${environment.apiBaseUrl}Auths/AddRole/${id}`, addRole)
  }
  register(registermodel: Register) {
    console.log(registermodel);
    return this.http.post<any>(`https://localhost:7009/api/Auths/Register`, registermodel)
  }
  changePassword(model: ChangePasswordModel) {
    return this.http.post(`${environment.apiBaseUrl}Auths/ChangePassword`, model)
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}Auths/Delete/${id}`)
  }
}
