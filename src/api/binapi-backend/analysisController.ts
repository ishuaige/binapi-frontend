// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopBuyInterfaceInfo GET /api/analysis/top/interface/buy */
export async function listTopBuyInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListOrderVO>('/api/analysis/top/interface/buy', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listTopInvokeInterfaceInfo GET /api/analysis/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO>('/api/analysis/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}
