import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'qrcode', loadChildren: './qrcode/qrcode.module#QrcodePageModule' },
  { path: 'submit', loadChildren: './submit/submit.module#SubmitPageModule' },
  { path: 'setup', loadChildren: './setup/setup.module#SetupPageModule' },
  { path: 'list-class', loadChildren: './list-class/list-class.module#ListClassPageModule' },
  { path: 'code', loadChildren: './code/code.module#CodePageModule' },
  { path: 'menu-class', loadChildren: './menu-class/menu-class.module#MenuClassPageModule' },
  { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule' },
  { path: 'add-class', loadChildren: './add-class/add-class.module#AddClassPageModule' },
 // { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule' },
 // { path: 'alert', loadChildren: './alert/alert.module#AlertPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
