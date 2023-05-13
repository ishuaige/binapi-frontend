// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addOrder POST /api/order/addOrder */
export async function addOrderUsingPOST(
  body: API.OrderAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderVO>('/api/order/addOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPageOrder GET /api/order/list */
export async function listPageOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPageOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageOrderVO>('/api/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
