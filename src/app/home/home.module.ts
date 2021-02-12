import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, DataTablesModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
