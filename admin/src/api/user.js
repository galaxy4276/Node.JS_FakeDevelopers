import client from "./client";

export const postUserLogin = (data) =>
  client.post('/admin/login', data);

export const postUserLogout = (data) =>
  client.post('/admin/logout', data);

