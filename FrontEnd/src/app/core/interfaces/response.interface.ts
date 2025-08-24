export interface IResponse<T> {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  result: T;
}
