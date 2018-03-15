import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthGuard } from './authguards/auth.guard';
import { NoAuthGuard } from './authguards/noauth.guard';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './components/recipe/delete-recipe/delete-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    RecipeComponent,
    RecipeListComponent,
    EditRecipeComponent,
    DeleteRecipeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [AuthService,FlashMessagesService, AuthGuard, NoAuthGuard, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
