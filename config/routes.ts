export default [
  {
    path: '/',
    name: '主页',
    icon: 'smile',
    component: './Index',
  },
  {
    path: '/interface_info/:id',
    name: '查看接口',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/user',
    layout: false,
    name: '欢迎页',
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/user',
    routes: [{ name: '个人信息', path: '/user/info', component: './User/Info' }],
  },
  {
    path: '/search',
    name: '搜索接口',
    icon: 'SearchOutlined',
    component: './InterfaceSearch',
  },
  {
    path: '/order',
    name: '订单',
    icon: 'containerOutlined',
    component: './Order',
  },
  {
    path: '/myInterface',
    name: '我的接口',
    icon: 'appstoreOutlined',
    component: './User/MyInterface',
  },
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '用户管理',
        icon: 'table',
        path: '/admin/user',
        component: './Admin/UserManager',
      },
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_Info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'table',
        path: '/admin/interface_analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
