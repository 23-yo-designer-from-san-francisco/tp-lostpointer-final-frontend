export const ContentType = {
  JSON: 'application/json',
  IMG: {
    IMG_JPEG: 'image/jpeg',
    IMG_PNG: 'image/png',
    IMG_SVG: 'image/svg+xml',
  },
  FORM: 'multipart/form-data',
};

export enum RequestMethods {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  GET ='GET',
  DELETE = 'DELETE',
}

export const defaultBackendRootURL = 'https://lostpointer.tech';
// export const defaultBackendRootURL = 'http://localhost';
export const defaultBackendURL = `${defaultBackendRootURL}/api/`;
