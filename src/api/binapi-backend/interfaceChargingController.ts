// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceCharging POST /api/interfaceCharging/add */
export async function addInterfaceChargingUsingPOST(
  body: API.InterfaceChargingAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/interfaceCharging/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceCharging POST /api/interfaceCharging/delete */
export async function deleteInterfaceChargingUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceCharging/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceChargingById GET /api/interfaceCharging/get */
export async function getInterfaceChargingByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceChargingByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceCharging>('/api/interfaceCharging/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfaceCharging GET /api/interfaceCharging/list */
export async function listInterfaceChargingUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceChargingUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceCharging>('/api/interfaceCharging/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfaceChargingByPage GET /api/interfaceCharging/list/page */
export async function listInterfaceChargingByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceChargingByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceCharging>('/api/interfaceCharging/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateInterfaceCharging POST /api/interfaceCharging/update */
export async function updateInterfaceChargingUsingPOST(
  body: API.InterfaceChargingUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceCharging/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
