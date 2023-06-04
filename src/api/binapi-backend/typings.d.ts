declare namespace API {
  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInterfaceCharging = {
    code?: number;
    data?: InterfaceCharging;
    message?: string;
  };

  type BaseResponseInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO;
    message?: string;
  };

  type BaseResponseListInterfaceCharging = {
    code?: number;
    data?: InterfaceCharging[];
    message?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
  };

  type BaseResponseListInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO[];
    message?: string;
  };

  type BaseResponseListOrderVO = {
    code?: number;
    data?: OrderVO[];
    message?: string;
  };

  type BaseResponseListUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo[];
    message?: string;
  };

  type BaseResponseListUserInterfaceInfoVO = {
    code?: number;
    data?: UserInterfaceInfoVO[];
    message?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageInterfaceCharging = {
    code?: number;
    data?: PageInterfaceCharging;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
  };

  type BaseResponsePageUserInterfaceInfo = {
    code?: number;
    data?: PageUserInterfaceInfo;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserDevKeyVO = {
    code?: number;
    data?: UserDevKeyVO;
    message?: string;
  };

  type BaseResponseUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getInterfaceChargingByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getInterfaceInfoByUserIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceCharging = {
    availablePieces?: string;
    charging?: number;
    createTime?: string;
    id?: number;
    interfaceId?: number;
    isDelete?: number;
    updateTime?: string;
    userId?: number;
  };

  type InterfaceChargingAddRequest = {
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    url?: string;
  };

  type InterfaceChargingUpdateRequest = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    method?: string;
    methodName?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    url?: string;
  };

  type InterfaceInfoInvokeRequest = {
    id?: number;
    userRequestParams?: string;
  };

  type InterfaceInfoSearchRequest = {
    current?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    type?: string;
  };

  type InterfaceInfoUpdateRequest = {
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoVO = {
    availablePieces?: string;
    charging?: number;
    chargingId?: number;
    createTime?: string;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type listInterfaceChargingByPageUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type listInterfaceChargingUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type listInterfaceInfoByPageUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type listInterfaceInfoUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type listUserByPageUsingGETParams = {
    createTime?: string;
    current?: number;
    gender?: number;
    id?: number;
    pageSize?: number;
    phoneNum?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type listUserInterfaceInfoByPageUsingGETParams = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type listUserInterfaceInfoUsingGETParams = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type listUserUsingGETParams = {
    createTime?: string;
    current?: number;
    gender?: number;
    id?: number;
    pageSize?: number;
    phoneNum?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type OrderVO = {
    charging?: number;
    createTime?: string;
    expirationTime?: string;
    interfaceDesc?: string;
    interfaceId?: number;
    interfaceName?: string;
    orderNumber?: string;
    status?: number;
    total?: number;
    totalAmount?: number;
    userId?: number;
  };

  type PageInterfaceCharging = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceCharging[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserInterfaceInfo = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserInterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type smsCaptchaUsingGETParams = {
    /** phoneNum */
    phoneNum: string;
  };

  type UpdateUserInterfaceInfoDTO = {
    interfaceId?: number;
    lockNum?: number;
    userId?: number;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    phoneNum?: string;
    secretKey?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    gender?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserDevKeyVO = {
    accessKey?: string;
    secretKey?: string;
  };

  type UserInterfaceInfo = {
    createTime?: string;
    id?: number;
    interfaceInfoId?: number;
    isDelete?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserInterfaceInfoAddRequest = {
    interfaceInfoId?: number;
    leftNum?: number;
    totalNum?: number;
    userId?: number;
  };

  type UserInterfaceInfoUpdateRequest = {
    id?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
  };

  type UserInterfaceInfoVO = {
    description?: string;
    id?: number;
    interfaceInfoId?: number;
    interfaceStatus?: number;
    leftNum?: number;
    method?: string;
    name?: string;
    status?: number;
    totalNum?: number;
    url?: string;
  };

  type UserLoginRequest = {
    phoneCaptcha?: string;
    phoneNum?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    captcha?: string;
    checkPassword?: string;
    phoneCaptcha?: string;
    phoneNum?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    gender?: number;
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    gender?: number;
    id?: number;
    phoneNum?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
