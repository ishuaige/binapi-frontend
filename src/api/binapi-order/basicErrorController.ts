// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** errorHtml GET /api/order/error */
export async function errorHtmlUsingGET(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/order/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** errorHtml PUT /api/order/error */
export async function errorHtmlUsingPUT(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/order/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** errorHtml POST /api/order/error */
export async function errorHtmlUsingPOST(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/order/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** errorHtml DELETE /api/order/error */
export async function errorHtmlUsingDELETE(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/order/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** errorHtml PATCH /api/order/error */
export async function errorHtmlUsingPATCH(options?: { [key: string]: any }) {
  return request<API.ModelAndView>('/api/order/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
