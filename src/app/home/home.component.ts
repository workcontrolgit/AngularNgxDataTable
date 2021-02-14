import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Person } from '../@shared/models/person';
import { ApiHttpService } from '@core/services/api-http.service';
import { ApiEndpointsService } from '@core/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  dtOptions: DataTables.Settings = {};
  persons: Person[];

  constructor(private apiHttpService: ApiHttpService, private apiEndpointsService: ApiEndpointsService) {}

  ngOnInit() {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.apiHttpService
          .post(this.apiEndpointsService.postPersonsEndpoint(), dataTablesParameters, false)
          .subscribe((resp: DataTablesResponse) => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }],
    };
  }
}
