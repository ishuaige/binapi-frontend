import { Avatar, Button, Card, Descriptions, message, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useModel } from '@@/exports';
import { genKeyUsingPOST, getKeyUsingGET } from '@/api/binapi-backend/userController';
import { requestConfig } from '@/requestConfig';
import { RcFile } from 'antd/es/upload';
import { UserOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.UserDevKeyVO>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState;
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getKeyUsingGET();
      // console.log(res);
      // console.log(res.data);
      setData(res.data);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
    return;
  };

  const genKey = async () => {
    try {
      const res = await genKeyUsingPOST();
      setData(res.data);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
  };
  const getSdk = () => {
    window.location.href = requestConfig.baseURL + '/api/interfaceInfo/sdk';
  };
  const showDevKey = () => {
    loadData();
  };
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card
          title="个人信息"
          actions={[
            <b key="gender">性别：{loginUser.gender ? '女' : '男'}</b>,
            <b key="time">创建时间：{loginUser.createTime}</b>,
            <b key="role">身份：{loginUser.userRole === 'admin' ? '管理员' : '普通用户'}</b>,
          ]}
          extra={<a href="#">编辑</a>}
        >
          <Card.Meta
            avatar={
              <Avatar
                size={{ xs: 30, sm: 40, md: 48, lg: 70, xl: 88, xxl: 100 }}
                src={loginUser.userAvatar}
                icon={<UserOutlined />}
              />
            }
            title={loginUser.userName}
            description={'账号：' + loginUser.userAccount}
          />
        </Card>

        <Card
          title="开发者密钥（调用接口的凭证）"
          extra={
            <>
              <Space>
                <Button onClick={getSdk}>下载SDK</Button>
                <Button onClick={showDevKey}>显示密钥</Button>
                <Button onClick={genKey}>重新生成</Button>
              </Space>
            </>
          }
        >
          <Descriptions column={1} bordered size="small" layout="vertical">
            <Descriptions.Item label="accessKey">
              <Paragraph copyable={{ tooltips: false }}>
                {data?.accessKey ?? '******************'}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="secretKey">
              <Paragraph copyable={{ tooltips: false }}>
                {data?.secretKey ?? '******************'}
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </>
  );
};

export default Index;
