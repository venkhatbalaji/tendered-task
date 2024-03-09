export enum ErrorMessage {
  SERVER_ERROR = "SE_0001",
  DEFAULT_ERROR = "EM_9999",
  BAD_REQUEST = "EM_8888",
  VEHICLE_NOT_FOUND = "SE_0002",
  VEHICLE_UNDERMAINTENANCE = "SE_0003",
  VEHICLE_MAINTENANCE_NOT_FOUND = "SE_0004",
  TRIP_AVAILABLE = "SE_0005",
  TRIP_NOT_FOUND = "SE_0006",
}

export interface Response<T> {
  success: boolean;
  data: T;
}

export interface ErrorResponse<T> {
  success: boolean;
  data: T;
  errorCode: ErrorMessage;
}

export function createSuccessResponse<T>(data: T): Response<T> {
  return {
    success: true,
    data,
  };
}

export function createFailureResponse(
  data: any,
  errorCode: ErrorMessage = ErrorMessage.DEFAULT_ERROR
): ErrorResponse<any> {
  return {
    success: false,
    errorCode: errorCode,
    data,
  };
}
