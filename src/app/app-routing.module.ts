import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/user/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule',canActivate: [AuthGuard], },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'qrcode', loadChildren: './qrcode/qrcode.module#QrcodePageModule' },
  { path: 'list-class', loadChildren: './list-class/list-class.module#ListClassPageModule' },
  { path: 'menu-class', loadChildren: './menu-class/menu-class.module#MenuClassPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'add-class', loadChildren: './add-class/add-class.module#AddClassPageModule' },
  { path: 'add-class/:id', loadChildren: './add-class/add-class.module#AddClassPageModule'},
  { path: 'class-detail', loadChildren: './class-detail/class-detail.module#ClassDetailPageModule' },
  { path: 'class-detail/:id', loadChildren: './class-detail/class-detail.module#ClassDetailPageModule'},
  { path: 'display-student', loadChildren: './display-student/display-student.module#DisplayStudentPageModule' },
  // { path: 'display-student/:id', loadChildren: './display-student/display-student.module#DisplayStudentPageModule' },
 { path: 'display-student/:subject:date', loadChildren: './display-student/display-student.module#DisplayStudentPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
