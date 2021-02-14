import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Person } from '@shared/models/person';
import { ApiHttpService } from '@core/services/api-http.service';
import { ApiEndpointsService } from '@core/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

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
          .post(this.apiEndpointsService.postPositionsEndpoint(), dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [{ data: 'positionNumber' }, { data: 'positionTitle' }, { data: 'positionDescription' }],
    };
  }
}
