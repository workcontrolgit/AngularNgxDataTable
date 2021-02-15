import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Position } from '@shared/models/position';
import { ApiHttpService } from '@core/services/api-http.service';
import { ApiEndpointsService } from '@core/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

  dtOptions: DataTables.Settings = {};
  positions: Position[];
  isLoading = false;

  constructor(private apiHttpService: ApiHttpService, private apiEndpointsService: ApiEndpointsService) {}

  ngOnInit() {
    //const that = this;
    this.isLoading = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.apiHttpService
          .post(this.apiEndpointsService.postPositionsEndpoint(), dataTablesParameters)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )

          .subscribe((resp: DataTablesResponse) => {
            this.positions = resp.data;

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
