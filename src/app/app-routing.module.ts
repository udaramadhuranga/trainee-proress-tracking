import { UpdateExerciseComponent } from './components/update-exercise/update-exercise.component';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';
import { TraineeProgressDetailsComponent } from './components/trainee-progress-details/trainee-progress-details.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { TrainerListComponent } from './components/trainer-list/trainer-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { TraineeListComponent } from './components/trainee-list/trainee-list.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'trainer',
    component: TrainerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_TRAINER'] },
  },
  {
    path: 'trainee',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_TRAINEE'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'trainer-list', component: TrainerListComponent },
  { path: 'trainee-list', component: TraineeListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user/:id', component: EditUserComponent },
  { path: 'trainee-progress', component: TraineeProgressDetailsComponent },
  { path: 'add-exercise', component: AddExerciseComponent },
  { path: 'update-exercise', component: UpdateExerciseComponent },
  { path: 'exercise-list', component: ExerciseListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
