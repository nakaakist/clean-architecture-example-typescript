export type Request = {
  body: { [key: string]: any };
  params: { [key: string]: any };
  headers: { [key: string]: any };
  query: { [key: string]: any };
};
