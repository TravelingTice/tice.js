export type ConstructorParams = {
  baseEndpoint?: string;
  defaultOnError?: (err?: any) => void;
  defaultBearerToken?: string;
  defaultSendToken?: boolean;
};

export type InputOptions =
  | {
      sendToken?: boolean;
    }
  | undefined;

export type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type FetchOptions = {
  method?: Method;
  body?: string;
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
  };
};

export type Body = Object;
