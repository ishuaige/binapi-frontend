// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** auditInterface POST /api/interfaceAudit/auditInterface */
export async function auditInterfaceUsingPOST(
  body: API.InterfaceAuditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceAudit/auditInterface', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceAuditList POST /api/interfaceAudit/getInterfaceAuditList */
export async function getInterfaceAuditListUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceAuditListUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceAuditVO>(
    '/api/interfaceAudit/getInterfaceAuditList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** userAdd POST /api/interfaceAudit/userAdd */
export async function userAddUsingPOST(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/interfaceAudit/userAdd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
