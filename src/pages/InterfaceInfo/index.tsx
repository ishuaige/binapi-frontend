import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/binapi/interfaceController';
import { useParams } from '@@/exports';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams();
  const [invokeRes, setInvokeRes] = useState<any>();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return true;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
    return;
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return true;
    }
    try {
      setInvokeLoading(true);
      const res = await invokeInterfaceInfoUsingPOST({
        ...values,
        id: params.id,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (e: any) {
      message.error('请求失败，' + e.message);
    }
    setInvokeLoading(false);
    return;
  };

  return (
    <PageContainer title="查看接口文档">
      <Card loading={loading}>
        {data ? (
          <Descriptions title={data?.name} column={1} extra={<Button>调用</Button>}>
            <Descriptions.Item label="接口状态">{data.status ? '正常' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>

      <Divider />
      <Card title="在线测试">
        <Form name="invoke" onFinish={onFinish} layout="vertical">
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="测试结果：" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
