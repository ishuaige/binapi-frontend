import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { listInterfaceInfoByPageUsingGET } from '@/api/binapi-backend/interfaceInfoController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

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

  return (
    <PageContainer>
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
                title={<a key={item.id} href={apiLink}>{item.name}</a>}
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
  );
};

export default Index;
