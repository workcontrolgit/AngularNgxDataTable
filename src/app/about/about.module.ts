import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, AboutRoutingModule, DataTablesModule],
  declarations: [AboutComponent],
})
export class AboutModule {}
