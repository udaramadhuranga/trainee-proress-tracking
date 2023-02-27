import { AuthserviceService } from './_services/authservice.service';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './_auth/auth.guard';
import { UserService } from './_services/user.service';
import { TrainerListComponent } from './components/trainer-list/trainer-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { TraineeListComponent } from './components/trainee-list/trainee-list.component';
import { TraineeProgressDetailsComponent } from './components/trainee-progress-details/trainee-progress-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    TrainerComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    HomeComponent,
    TrainerListComponent,
    AddUserComponent,
    EditUserComponent,
    TraineeListComponent,
    TraineeProgressDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthserviceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
