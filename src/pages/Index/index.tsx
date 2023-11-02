import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, List, message, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { listInterfaceInfoByPageUsingGET } from '@/api/binapi-backend/interfaceInfoController';
import { updateUserUsingPOST } from '@/api/binapi-backend/userController';
import {addUserInterfaceInfoUsingPOST} from "@/api/binapi-backend/userInterfaceController";
import {userAddUsingPOST} from "@/api/binapi-backend/interfaceAuditController";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [addInterfaceModalShow, setAddInterfaceModalShow] = useState(false);
  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
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
  }, []);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const res = await userAddUsingPOST({
      ...values,
    });
    if (res.code === 0 && res.data === true) {
      message.success('提交审核成功，可能需要一定的时间审核');
    } else {
      message.error('提交失败，请刷新重试！');
    }
    setAddInterfaceModalShow(false);
  };
  return (
    <>
      <PageContainer
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setAddInterfaceModalShow(true);
            }}
          >
            添加我的接口
          </Button>,
        ]}
      >
        <List
          className="my-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => {
            const apiLink = `/interface_info/${item.id}`;
            return (
              <List.Item actions={[<a href={apiLink}>查看文档</a>]}>
                <List.Item.Meta
                  title={
                    <a key={item.id} href={apiLink}>
                      {item.name}
                    </a>
                  }
                  description={item.description}
                />
              </List.Item>
            );
          }}
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
        />
      </PageContainer>
      <Modal
        title="添加接口信息"
        open={addInterfaceModalShow}
        confirmLoading={loading}
        footer={null}
        onCancel={() => setAddInterfaceModalShow(false)}
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
            name="name"
            label="接口名称"
            rules={[{ required: true, message: '请输入你的接口名称' }]}
          >
            <Input placeholder="请输入你的接口名称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="description"
            label="接口描述"
            rules={[{ required: true, message: '请输入你的接口描述' }]}
          >
            <Input.TextArea placeholder="请输入你的接口描述" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="url"
            label="接口地址"
            rules={[{ required: true, message: '请输入你的接口地址' }]}
          >
            <Input placeholder="请输入你的接口地址" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="method"
            label="请求类型"
            rules={[{ required: true, message: '请输入你的请求类型' }]}
          >
            <Input placeholder="请输入你的请求类型" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="requestParams"
            label="请求参数"
            rules={[{ required: true, message: '请输入你的请求参数' }]}
          >
            <Input.TextArea placeholder="请输入你的请求参数" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="requestHeader"
            label="请求头"
            rules={[{ required: true, message: '请输入你的请求头' }]}
          >
            <Input.TextArea placeholder="请输入你的请求头" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="responseHeader"
            label="响应头"
            rules={[{ required: true, message: '请输入你的响应头' }]}
          >
            <Input.TextArea placeholder="请输入你的响应头" />
          </Form.Item>

          <Form.Item
            name="needCharge"
            label="收费类型"
            hasFeedback
            initialValue={0}
            rules={[{ required: true, message: '请选择你的收费类型' }]}
          >
            <Select placeholder="请选择你的收费类型">
              <Option value={0}>免费</Option>
              <Option value={1}>收费</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.needCharge !== currentValues.needCharge
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('needCharge') === 1 ? (
                <>
                  <Form.Item
                    name="charging"
                    label="收费金额"
                    dependencies={['needCharge']}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (getFieldValue('needCharge') === 1) {
                            if (!value) {
                              return Promise.reject('请输入收费金额');
                            }
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="availablePieces"
                    label="接口剩余调用次数"
                    dependencies={['needCharge']}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (getFieldValue('needCharge') === 1) {
                            if (!value) {
                              return Promise.reject('请输入接口剩余调用次数');
                            }
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交审核
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
