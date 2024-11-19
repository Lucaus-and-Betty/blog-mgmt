export const SERVER_URL = '//localhost:3001/v1';

export const IMGS_BASIC_URL = '//localhost:3001/static';

export enum HTTP_STATUS_ENUM {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export enum LOGIN_STATE_ENUM {
  LOGIN,
  LOGOUT,
  READY
}
