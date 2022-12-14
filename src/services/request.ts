import { ContentType, defaultBackendURL, RequestMethods } from './requestUtils';

export interface IResponseBody {
    status: number;
    message: string;
}

export class Request {
  private readonly backendDomain: string;

  constructor(domain: string = defaultBackendURL) {
    this.backendDomain = domain;
  }

  patch(
    path: string,
    requestBody?: BodyInit,
    contentType?: string,
    customHeaders?: object
  ): Promise<any> {
    return this._fetchRequest(
      this._createURL(this.backendDomain, path),
      RequestMethods.PATCH,
      requestBody,
      contentType,
      customHeaders
    );
  }

  put(
    path: string,
    requestBody?: BodyInit,
    contentType?: string
  ): Promise<any> {
    return this._fetchRequest(
      this._createURL(this.backendDomain, path),
      RequestMethods.PUT,
      requestBody,
      contentType
    );
  }

  delete(
    path: string,
    requestBody?: BodyInit,
    contentType?: string
  ): Promise<any> {
    return this._fetchRequest(
      this._createURL(this.backendDomain, path),
      RequestMethods.DELETE,
      requestBody,
      contentType
    );
  }

  post(
    path: string,
    requestBody?: BodyInit,
    contentType?: string
  ): Promise<any> {
    return this._fetchRequest(
      this._createURL(this.backendDomain, path),
      RequestMethods.POST,
      requestBody,
      contentType
    );
  }

  get(path: string): Promise<any> {
    return this._fetchRequest(
      this._createURL(this.backendDomain, path),
      RequestMethods.GET
    );
  }

  _fetchRequest(
    url: string,
    requestMethod: string,
    requestBody: any = null,
    contentType: string = ContentType.JSON,
    customHeaders: any = null
  ): Promise<any> {
    const myHeaders = new Headers();
    const { POST, PUT, DELETE, PATCH } = RequestMethods;
    if (requestBody && contentType !== ContentType.FORM && [POST, PUT, DELETE, PATCH].includes(<RequestMethods>requestMethod)) {
      myHeaders.append('Content-Type', contentType);
    }
    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        myHeaders.append(key, customHeaders[key]);
      });
    }

    return fetch(url, {
      method: requestMethod,
      mode: 'cors',
      credentials: 'include',
      headers: myHeaders,
      body: requestBody,
    })
      .then((r) => r.json())
      .then((r) => r.response);
  }

  _createURL(domain: string, path: string): string {
    return domain + path;
  }
}

export const apiRequest = new Request();
