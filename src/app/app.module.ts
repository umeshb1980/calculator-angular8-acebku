import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Calculator Components
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
