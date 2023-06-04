import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import React, { useState } from 'react';
import { useModel } from '@@/exports';
import {
  genKeyUsingPOST,
  getKeyUsingGET,
  updateUserUsingPOST,
} from '@/api/binapi-backend/userController';
import { requestConfig } from '@/requestConfig';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;
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
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt3M;
};

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.UserDevKeyVO>();
  const [updateModalShow, setUpdateModalShow] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState;
  const [imageUrl, setImageUrl] = useState<string>(loginUser.userAvatar);

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

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
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
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const res = await updateUserUsingPOST({
      ...values,
      id: loginUser.id,
    });
    if (res.code === 0 && res.data === true) {
      message.success('修改成功');
    } else {
      message.error('修改失败，请刷新重试！');
    }
    setUpdateModalShow(false);
    location.reload();
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
          extra={
            <Button type={'link'} onClick={() => setUpdateModalShow(true)}>
              编辑
            </Button>
          }
        >
          <Card.Meta
            avatar={
              <>
                <Upload
                  name="file"
                  // listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  maxCount={1}
                  withCredentials={true}
                  action={requestConfig.baseURL + '/api/user/update/avatar'}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <Avatar
                      size={{ xs: 30, sm: 40, md: 48, lg: 70, xl: 88, xxl: 100 }}
                      src={imageUrl}
                      icon={<UserOutlined />}
                    />
                  ) : (
                    <div>
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>上传头像</div>
                    </div>
                  )}
                </Upload>
              </>
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

      <Modal
        title="编辑信息"
        open={updateModalShow}
        confirmLoading={loading}
        footer={null}
        onCancel={() => setUpdateModalShow(false)}
      >
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            {...formItemLayout}
            name="userName"
            label="昵称"
            initialValue={loginUser.userName}
            rules={[{ required: true, message: '请输入你的昵称' }]}
          >
            <Input placeholder="请输入你的昵称" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            hasFeedback
            initialValue={loginUser.gender}
            rules={[{ required: true, message: '请选择你的性别' }]}
          >
            <Select placeholder="请选择你的性别">
              <Option value={0}>男</Option>
              <Option value={1}>女</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
