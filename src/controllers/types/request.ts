export type Request = {
  body: { [key: string]: unknown };
  params: { [key: string]: unknown };
  headers: { [key: string]: string };
  query: { [key: string]: unknown };
};
