import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PhoneRegisterComponent } from './phone-register/phone-register.component';
import { AddNewChildComponent } from './add-new-child/add-new-child.component';
import { ParentsDashboardComponent } from './parents-dashboard/parents-dashboard.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'parents-dashboard', component: ParentsDashboardComponent },
  { path: 'game', component: GameComponent },
  { path: 'add-new-child', component: AddNewChildComponent },
  { path: 'login', component: LoginComponent },
  { path: 'phone-register', component: PhoneRegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
