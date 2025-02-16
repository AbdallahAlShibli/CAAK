import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PhoneRegisterComponent } from './phone-register/phone-register.component';
import { AddNewChildComponent } from './add-new-child/add-new-child.component';
import { ParentsDashboardComponent } from './parents-dashboard/parents-dashboard.component';
import { GameComponent } from './game/game.component';
import { CardListComponent } from './card-list/card-list.component';
import { TimelineComponent } from './timeline/timeline.component';
import { YoutubeVideoCardsComponent } from './youtube-video-cards/youtube-video-cards.component';
import { LevelComponent } from './level/level.component';
import { SafeUrlPipe } from './shared/safe-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    AboutUsComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
    ForgetPasswordComponent,
    PhoneRegisterComponent,
    AddNewChildComponent,
    ParentsDashboardComponent,
    GameComponent,
    CardListComponent,
    TimelineComponent,
    YoutubeVideoCardsComponent,
    LevelComponent,
    SafeUrlPipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
