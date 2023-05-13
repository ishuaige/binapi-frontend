import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Descriptions,
  Divider,
  Image,
  message,
  Modal,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { listPageOrderUsingGET } from '@/api/binapi-order/orderController';
import { payCodeUsingPOST } from '@/api/binapi-third/aliPayController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.OrderVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [type, setType] = useState<string>('0');
  const [orderDetailModalOpen, setOrderDetailModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [onClickOrder, setOnClickOrder] = useState<API.OrderVO>();
  const [payCode, setPayCode] = useState();

  const showOrderDetailModal = async (record: API.OrderVO) => {
    await setOnClickOrder(record);
    // console.log(record);
    setOrderDetailModalOpen(true);
  };

  const handleOrderDetailOk = async () => {
    setOrderDetailModalOpen(false);
  };

  const handleOrderDetailCancel = () => {
    setOrderDetailModalOpen(false);
  };

  const showOrderPayModal = async (record: API.OrderVO) => {
    await setOnClickOrder(record);
    // console.log(record);
    const res = await payCodeUsingPOST({
      totalAmount: record.totalAmount,
      subject: record.interfaceName,
      traceNo: record.orderNumber,
    });
    // console.log(res);
    setPayCode(res.data);
    setPayModalOpen(true);
  };

  const handleOrderPayOk = async () => {
    await loadData();
    setPayModalOpen(false);
  };

  const handleOrderPayCancel = () => {
    loadData();
    setPayModalOpen(false);
  };

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listPageOrderUsingGET({
        type,
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [type]);

  const onChange = (key: string) => {
    setType(key);
    console.log(key);
  };

  const columns: ColumnsType<API.OrderVO> = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '接口名',
      dataIndex: 'interfaceName',
      key: 'interfaceName',
      render: (_,item) => <a href={"/interface_info/"+item.interfaceId}>{item?.interfaceName}</a>,
    },
    {
      title: '接口描述',
      dataIndex: 'interfaceDesc',
      key: 'interfaceDesc',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <>
          {status === 0 ? (
            <Tag color="red" key={status}>
              未支付
            </Tag>
          ) : status === 1 ? (
            <Tag color="green" key={status}>
              已支付
            </Tag>
          ) : status === 2 ? (
            <Tag color="yellow" key={status}>
              已失效
            </Tag>
          ) : null}
        </>
      ),
    },
    {
      title: '数量',
      key: 'total',
      dataIndex: 'total',
    },
    {
      title: '总价',
      key: 'totalAmount',
      dataIndex: 'totalAmount',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 0 ? (
            <Button type="primary" onClick={() => showOrderPayModal(record)}>
              去支付
            </Button>
          ) : null}
          <Button onClick={() => showOrderDetailModal(record)}>查看详情</Button>
        </Space>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '0',
      label: `待支付`,
    },
    {
      key: '1',
      label: `已支付`,
    },
    {
      key: '2',
      label: `已过期/失效`,
    },
  ];
  return (
    <>
      <PageContainer title="我的订单">
        <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
        <Table
          columns={columns}
          pagination={{
            // eslint-disable-next-line @typescript-eslint/no-shadow
            showTotal(total: number) {
              return '总数：' + total;
            },
            pageSize: 10,
            total,
            onChange(page, pageSize) {
              loadData(page, pageSize);
            },
          }}
          dataSource={list}
          loading={loading}
          rowKey={(record) => record.orderNumber}
        />
      </PageContainer>
      <Modal
        title="订单详情"
        open={orderDetailModalOpen}
        onOk={handleOrderDetailOk}
        onCancel={handleOrderDetailCancel}
      >
        <Descriptions
          title={onClickOrder?.interfaceName}
          size="middle"
          column={1}
          layout="vertical"
          bordered
        >
          <Descriptions.Item label="订单号">{onClickOrder?.orderNumber} </Descriptions.Item>
          <Descriptions.Item label="接口名-接口描述">{onClickOrder?.interfaceName +" - "+ onClickOrder?.interfaceDesc} </Descriptions.Item>
          <Descriptions.Item label="订单状态">
            {onClickOrder?.status === 0
              ? '未支付'
              : onClickOrder?.status === 1
              ? '已支付'
              : '已失效'}
          </Descriptions.Item>
          <Descriptions.Item label="计费">{onClickOrder?.charging} 元 / 次</Descriptions.Item>
          <Descriptions.Item label="购买次数">{onClickOrder?.total}</Descriptions.Item>
          <Descriptions.Item label="过期时间">{onClickOrder?.expirationTime}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <b>总计：{onClickOrder?.totalAmount}元</b>
      </Modal>

      <Modal
        title="订单详情"
        open={payModalOpen}
        onOk={handleOrderPayOk}
        onCancel={handleOrderPayCancel}
      >
        <Descriptions
          title={onClickOrder?.interfaceName}
          size="middle"
          column={1}
          layout="vertical"
          bordered
        >
          <Descriptions.Item label="订单号">{onClickOrder?.orderNumber} </Descriptions.Item>
          <Descriptions.Item label="接口描述">{onClickOrder?.interfaceDesc} </Descriptions.Item>
          <Descriptions.Item label="计费">{onClickOrder?.charging} 元 / 次</Descriptions.Item>
          <Descriptions.Item label="购买次数">{onClickOrder?.total}</Descriptions.Item>
          <Descriptions.Item label="过期时间">{onClickOrder?.expirationTime}</Descriptions.Item>
          <Descriptions.Item label="请使用支付宝支付">
            <Image width={200} src={payCode} />
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <b>总计：{onClickOrder?.totalAmount}元</b>
      </Modal>
    </>
  );
};

export default Index;
