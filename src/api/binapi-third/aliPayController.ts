// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** payNotify POST /api/third/alipay/notify */
export async function payNotifyUsingPOST(options?: { [key: string]: any }) {
  return request<any>('/api/third/alipay/notify', {
    method: 'POST',
    ...(options || {}),
  });
}

/** pay GET /api/third/alipay/pay */
export async function payUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/third/alipay/pay', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** payCode POST /api/third/alipay/payCode */
export async function payCodeUsingPOST(body: API.AlipayRequest, options?: { [key: string]: any }) {
  return request<any>('/api/third/alipay/payCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** tradeQuery POST /api/third/alipay/tradeQuery */
export async function tradeQueryUsingPOST(options?: { [key: string]: any }) {
  return request<any>('/api/third/alipay/tradeQuery', {
    method: 'POST',
    ...(options || {}),
  });
}
