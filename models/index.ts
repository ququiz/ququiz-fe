type BaseResponse<T> = {
  message: string;
  error?: string;
  statusCode?: string;
  data?: T;
};
