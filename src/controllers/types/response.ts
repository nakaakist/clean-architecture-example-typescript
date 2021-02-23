export type Response = {
  body: { [key: string]: unknown } | unknown[];
  status: number;
};
