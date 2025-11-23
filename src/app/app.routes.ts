import { Routes } from '@angular/router';
import { RegisterComponent } from '../Components/AuthComponents/register/register.component';
import { LoginComponent } from '../Components/AuthComponents/login/LoginComponent';
import { UsersandrolesComponent } from '../Components/AuthComponents/usersandroles/usersandroles.component';
import { AddOrganizationComponent } from '../Components/Organization/add-organization/add-organization.component';
import { UpdateOrganizationComponent } from '../Components/Organization/update-organization/update-organization.component';
import { ListOrganizationComponent } from '../Components/Organization/list-organization/list-organization.component';
import { ListBranchComponent } from '../Components/Branch/list-branch/list-branch.component';
import { AddBranchComponent } from '../Components/Branch/add-branch/add-branch.component';
import { BranchImgComponent } from '../Components/BranchImg/branch-img/branch-img.component';
import { StudentImgComponent } from '../Components/StudentImg/student-img/student-img.component';
import { CopmleteAddingStudentComponent } from '../Components/Student/copmlete-adding-student/copmlete-adding-student.component';
import { TestComponent } from '../Components/Test/test/test.component';
import { NavComponent } from '../Components/Navbar/nav/nav.component';
import { StudentListComponent } from '../Components/Student/student-list/student-list.component';

import { BranchHomeComponent } from '../Components/BranchHome/branch-home/branch-home.component';
import { HomeComponent } from '../Components/Home/home/home.component';
import { HomeBranchComponent } from '../Components/HomeBranch/home-branch/home-branch.component';
import { LevelComponent } from '../Components/Level/level/level.component';
import { ClassGComponent } from '../Components/ClassG/class-g/class-g.component';
import { ClassListComponent } from '../Components/ClassG/class-list/class-list.component';
import { ClassgAddComponent } from '../Components/ClassG/classg-add/classg-add.component';
import { StudentInfoComponent } from '../Components/Student/StudentInfo/student-info/student-info.component';
import { DepartmentListComponent } from '../Components/Department/department-list/department-list.component';
import { CopleteTeacherAcountComponent } from '../Components/Teacher/coplete-teacher-acount/coplete-teacher-acount.component';
import { AddTeacherComponent } from '../Components/Teacher/add-teacher/add-teacher.component';
import { TeacherListComponent } from '../Components/Teacher/teacher-list/teacher-list.component';
import { MoveStudentComponent } from '../Components/MoveStudent/move-student/move-student.component';
import { StudentDocumentComponent } from '../Components/student-document/student-document.component';
import { AttendenceClassComponent } from '../Components/Attendence/attendence-class/attendence-class.component';
import { VideoLessonsComponent } from '../Components/VideoLessons/video-lessons/video-lessons.component';
import { AddLessonComponent } from '../Components/add-lesson/add-lesson.component';
import { TeacherInfoComponent } from '../Components/Teacher/teacher-info/teacher-info.component';
import { StudentDashboardComponent } from '../Components/Student/student-dashboard/student-dashboard.component';
import { AddSubjectComponent } from '../Components/Subject/add-subject/add-subject.component';
import { TeacherDashboardComponent } from '../Components/Teacher/teacher-dashboard/teacher-dashboard.component';
import { AddGeneralMessageComponent } from '../Components/GeneralMessage/Add-G-Message/add-general-message/add-general-message.component';
import { AddstudentmessageComponent } from '../Components/StudentMessages/addstudentmessage/addstudentmessage.component';
import { ViewStudentAndClassMessagesComponent } from '../Components/StudentMessages/ViewMessagesForStudent/view-student-and-class-messages/view-student-and-class-messages.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: UsersandrolesComponent },
  { path: 'updorg', component: UpdateOrganizationComponent },
  { path: 'addorg', component: AddOrganizationComponent },
  { path: 'org', component: ListOrganizationComponent },
  { path: 'lisibranch', component: ListBranchComponent },
  { path: 'addbr', component: AddBranchComponent },
  { path: 'branchImg/:id', component: BranchImgComponent },
  { path: 'stImg/:id', component: StudentImgComponent },
  { path: 'comst/:id', component: CopmleteAddingStudentComponent },
  { path: 'mkmk', component: TestComponent },
  { path: 'nav', component: NavComponent },
  { path: 'stlist', component: StudentListComponent },
  { path: '', component: HomeComponent },
  { path: 'bhome/:id', component: BranchHomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'hbranch/:id', component: HomeBranchComponent },
  { path: 'level/:id', component: LevelComponent },
  { path: 'classglist/:id', component: ClassListComponent },
  { path: 'addClass', component: ClassgAddComponent },
  { path: 'stinfo/:id', component: StudentInfoComponent },
  { path: 'department', component: DepartmentListComponent },
  { path: 'compteacher/:id', component: CopleteTeacherAcountComponent },
  { path: 'teacherreg', component: AddTeacherComponent },
  { path: 'teacherlist', component: TeacherListComponent },
  { path: 'movest', component: MoveStudentComponent },
  { path: 'stdocu/:id', component: StudentDocumentComponent },
  { path: 'attend', component: AttendenceClassComponent },
  { path: 'video', component: VideoLessonsComponent },
  { path: 'addLesson/:id', component: AddLessonComponent },
  { path: 'teacherinfo/:id', component: TeacherInfoComponent },
  {path: 'addsubject', component: AddSubjectComponent},
  {path:'stdashboard', component:StudentDashboardComponent},
  {path:'tdashboard', component:TeacherDashboardComponent},
  {path:'addgmessage/:id', component:AddGeneralMessageComponent},
  {path:'addstmessage', component:AddstudentmessageComponent},
  {path:'viewstmessages', component:ViewStudentAndClassMessagesComponent}
];
