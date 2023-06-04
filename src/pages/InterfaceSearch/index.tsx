import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import { Card, List, message, Tabs, TabsProps } from 'antd';
import { searchUsingPOST } from '@/api/binapi-backend/interfaceInfoController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState();
  const [total, setTotal] = useState<number>(0);
  const loadData = async (current = 1, pageSize = 12) => {
    setLoading(true);
    try {
      const res = await searchUsingPOST({
        searchText,
        type,
        current,
        pageSize,
      });
      // console.log(res);
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
    return;
  };

  useEffect(() => {
    loadData();
  }, [type, searchText]);

  const doSearch = (value: any) => {
    setSearchText(value);
  };

  const items: TabsProps['items'] = [
    {
      key: 'native',
      label: `本站`,
    },
    {
      key: 'Apiaa1',
      label: `夏柔Api`,
    },
  ];
  const typeChange = (activeKey: any) => {
    // console.log(activeKey);
    setType(activeKey);
  };
  return (
    <>
      <PageContainer title="搜索接口">
        <Search
          placeholder="请输入接口的名称或描述"
          onSearch={doSearch}
          enterButton="搜索"
          size="large"
          loading={loading}
        />
        <Tabs defaultActiveKey="native" items={items} onChange={typeChange} />

        <List
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 6,
          }}
          pagination={
            type === 'Apiaa1'
              ? false
              : {
                  showTotal(total: number) {
                    return '总数：' + total;
                  },
                  pageSize: 12,
                  total,
                  onChange(page, pageSize) {
                    loadData(page, pageSize);
                  },
                }
          }
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{ height: 250 }}
                title={item.name}
                extra={
                  type === 'Apiaa1' ? (
                    <a href={item.url} target="_blank">
                      查看文档
                    </a>
                  ) : (
                    <a href={`/interface_info/${item.id}`}>查看文档</a>
                  )
                }
              >
                {item.description}
              </Card>
            </List.Item>
          )}
        />
      </PageContainer>
    </>
  );
};

export default Index;
