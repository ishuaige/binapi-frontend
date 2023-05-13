import {PageContainer} from '@ant-design/pro-components';
import {Button, Collapse, Descriptions, Empty, message, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {useModel} from '@@/exports';
import {getInterfaceInfoByUserIdUsingGET} from '@/api/binapi-backend/userInterfaceController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.UserInterfaceInfoVO[]>();
  const {initialState, setInitialState} = useModel('@@initialState');

  const loadData = async () => {
    const {loginUser} = initialState;

    setLoading(true);
    try {
      const res = await getInterfaceInfoByUserIdUsingGET({
        userId: loginUser.id,
      });
      console.log(res);
      console.log(res.data);
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

  const toInterfaceDetail = (interfaceInfoId: number) => {
    window.location.href = '/interface_info/' + interfaceInfoId;
  };

  const panelStyle = {
    marginBottom: 24,
  };
  return (
    <>
      <PageContainer title="我拥有的接口">
        {data?.size !== 0 ? (
          data?.map((item) => (
            <Collapse>
              <Collapse.Panel key={item.id} header={item.name} style={panelStyle}>
                <Descriptions
                  bordered
                  title={item.name}
                  column={2}
                  extra={
                    <Button type="primary" onClick={() => toInterfaceDetail(item?.interfaceInfoId)}>
                      查看接口详情
                    </Button>
                  }
                >
                  <Descriptions.Item label="接口描述">{item.description}</Descriptions.Item>
                  <Descriptions.Item label="接口url">{item.url}</Descriptions.Item>
                  <Descriptions.Item label="接口方法">{item.method}</Descriptions.Item>
                  <Descriptions.Item label="接口状态">
                    {item.interfaceStatus ? (
                      <Tag color="green">正常</Tag>
                    ) : (
                      <Tag color="red">关闭</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="已调用次数">{item.totalNum}</Descriptions.Item>
                  <Descriptions.Item label="总调用次数">{item.leftNum}</Descriptions.Item>
                  <Descriptions.Item label="调用状态">
                    {item.status ? <Tag color="red">禁用</Tag> : <Tag color="green">正常</Tag>}
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
            </Collapse>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        )}
      </PageContainer>
    </>
  );
};

export default Index;
