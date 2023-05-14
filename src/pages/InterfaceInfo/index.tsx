import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/api/binapi-backend/interfaceInfoController';
import { useModel, useParams } from '@@/exports';
import { addOrderUsingPOST } from '@/api/binapi-order/orderController';
import { getFreeInterfaceCountUsingPOST } from '@/api/binapi-backend/userInterfaceController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const params = useParams();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [orderModalOpen, setAddOrderModalOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(1.0);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState;

  const showAddOrderModal = () => {
    setTotalAmount(parseFloat((orderCount * parseFloat(data?.charging)).toFixed(2)));
    setAddOrderModalOpen(true);
  };

  const handleAddOrderOk = async () => {
    setLoading(true);
    try {
      const res = await addOrderUsingPOST({
        interfaceId: data.id,
        count: orderCount,
        userId: loginUser.id,
        totalAmount: totalAmount,
        charging: data.charging,
        chargingId: data.chargingId,
      });
      if (res.code === 0) {
        message.success('订单创建成功');
      }
    } catch (e: any) {
      message.error('请求失败，' + e.message);
    }
    setLoading(false);
    loadData();
    setAddOrderModalOpen(false);
  };

  const handleAddOrderCancel = () => {
    setAddOrderModalOpen(false);
  };

  const onChangeOrderCount = (value: number) => {
    setOrderCount(value);
    setTotalAmount(parseFloat((value * parseFloat(data?.charging)).toFixed(2)));
    console.log('changed', value);
  };

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
      console.log(res);
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

      if(res.code === 0){
        setInvokeRes(res.data);
        message.success('请求成功');
      }
    } catch (e: any) {
      message.error('请求失败，' + e.message);
    }
    setInvokeLoading(false);
    return;
  };

  const getFreeInterface = async () => {
    setInvokeLoading(true);
    try {
      const res = await getFreeInterfaceCountUsingPOST({
        userId: loginUser.id,
        interfaceId: data?.id,
        lockNum: 100,
      });
      if (res.data) {
        message.success('获取调用次数成功');
      } else {
        message.error('获取失败请重试');
      }
    } catch (e:any) {
      message.error('请求失败，' + e.message);
    }
    setInvokeLoading(false);
    return
  };
  return (
    <>
      <PageContainer title="查看接口文档">
        <Card loading={loading}>
          {data ? (
            <Descriptions
              title={data?.name}
              column={1}
              extra={
                data.charging ? (
                  <Button onClick={showAddOrderModal}>购买</Button>
                ) : (
                  <Button onClick={getFreeInterface}>获取</Button>
                )
              }
            >
              <Descriptions.Item label="接口状态">
                {data.status ? '正常' : '关闭'}
              </Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              {data.charging ? (
                <>
                  <Descriptions.Item label="计费">{data.charging} 元 / 条</Descriptions.Item>
                  <Descriptions.Item label="接口剩余调用次数">
                    {data.availablePieces}次
                  </Descriptions.Item>
                </>
              ) : null}
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

      <Modal
        title="购买接口"
        open={orderModalOpen}
        onOk={handleAddOrderOk}
        onCancel={handleAddOrderCancel}
      >
        <Descriptions title={data?.name} size="small" layout="vertical" bordered>
          <Descriptions.Item label="接口状态">{data?.status ? '正常' : '关闭'}</Descriptions.Item>
          <Descriptions.Item label="计费">{data?.charging} 元 / 次</Descriptions.Item>
          <Descriptions.Item label="接口剩余调用次数">{data?.availablePieces}次</Descriptions.Item>
          <Descriptions.Item label="请求方法">{data?.method}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{data?.url}</Descriptions.Item>
          <Descriptions.Item label="购买次数">
            <InputNumber
              min={1}
              max={data?.availablePieces}
              defaultValue={1}
              onChange={onChangeOrderCount}
            />
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <b>总计：{totalAmount}元</b>
      </Modal>
    </>
  );
};

export default Index;
