import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent }from './components/recipe/recipe.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';

import { AuthGuard } from './authguards/auth.guard';
import { NoAuthGuard } from './authguards/noauth.guard';


const appRoutes: Routes = [
    { path: '',
        component: HomeComponent
    },
    { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]          //access when logged in
    },
    { path: 'register',
        component: RegisterComponent,
        canActivate: [NoAuthGuard]       //access when NOT logged in
    },
    { path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]       //access when NOT logged in
    },
    { path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]         //access when logged in
    },
    { path: 'recipe',
        component: RecipeComponent,
        canActivate: [AuthGuard]         //access when logged in
    },
    { path: 'edit-recipe/:id',
        component: EditRecipeComponent,
        canActivate: [AuthGuard]         //access when logged in
    },
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )
      ],
    providers: [],
    bootstrap: [],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }