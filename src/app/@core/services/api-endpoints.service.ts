// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '@shared/classes/url-builder';
import { QueryStringParameters } from '@shared/classes/query-string-parameters';
// Application Constants
import { Constants } from '@app/config/constants';

@Injectable()

// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private constants: Constants
  ) {}

  /* #region EXAMPLES */
  public getDataByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('data', [id]);

  public getDataByIdAndCodeEndpoint = (id: string, code: number): string =>
    this.createUrlWithPathVariables('data', [id, code]);

  public getDataByIdCodeAndYearEndpoint(id: string, code: number, year: number): string {
    const queryString: QueryStringParameters = new QueryStringParameters();
    queryString.push('year', year);
    return `${this.createUrlWithPathVariables('data', [id, code])}?${queryString.toString()}`;
  }

  public getProductListByCountryCodeEndpoint(countryCode: string): string {
    return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) =>
      qs.push('countryCode', countryCode)
    );
  }

  public getProductListByCountryAndPostalCodeEndpoint(countryCode: string, postalCode: string): string {
    return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => {
      qs.push('countryCode', countryCode);
      qs.push('postalCode', postalCode);
    });
  }

  // call Mock endpoint
  public getNewsEndpoint = (): string => this.createUrl('41gRGwOaw', true);

  public invalidUrlEndpoint = (): string => this.createUrl('invalidurl', true);

  // call regular endpoint without boolean true at end
  public getPersonsEndpoint = (): string => this.createUrl('Persons');
  // call regular endpoint without boolean true at end

  public postPersonsEndpoint = (): string => this.createUrl('');

  /* #endregion */

  /* #region URL CREATOR */
  // URL
  private createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.Api_Mock_Endpoint : this.constants.Api_Endpoint,
      action
    );
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.Api_Endpoint, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.Api_Endpoint, `${action}${encodedPathVariablesUrl}`);
    return urlBuilder.toString();
  }
  /* #endregion */
}
