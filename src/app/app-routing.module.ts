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
  { path: 'submit', loadChildren: './submit/submit.module#SubmitPageModule' },
  { path: 'setup', loadChildren: './setup/setup.module#SetupPageModule' },
  { path: 'list-class', loadChildren: './list-class/list-class.module#ListClassPageModule' },
  { path: 'code', loadChildren: './code/code.module#CodePageModule' },
  { path: 'menu-class', loadChildren: './menu-class/menu-class.module#MenuClassPageModule' },
  { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule' },
  {path: 'event-create',loadChildren:'./pages/event-create/event-create.module#EventCreatePageModule',canActivate: [AuthGuard],},
  { path: 'event-detail/:id',loadChildren:'./pages/event-detail/event-detail.module#EventDetailPageModule', canActivate: [AuthGuard],},
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },


 // { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule' },
 // { path: 'alert', loadChildren: './alert/alert.module#AlertPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
