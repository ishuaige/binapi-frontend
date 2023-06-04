import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  listTopBuyInterfaceInfoUsingGET,
  listTopInvokeInterfaceInfoUsingGET, topBuyInterfaceInfoExcelUsingGET, topInvokeInterfaceInfoExcelUsingGET,
} from '@/api/binapi-backend/analysisController';
import { Button, Card, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import {requestConfig} from "@/requestConfig";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  const [invokeTopdata, setInvokeTopdata] = useState<API.InterfaceInfoVO[]>([]);
  const [buyTopdata, setBuyTopdata] = useState<API.OrderVO[]>([]);

  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGET().then((res) => {
        if (res.data) {
          setInvokeTopdata(res.data);
        }
      });
      listTopBuyInterfaceInfoUsingGET().then((res) => {
        if (res.data) {
          setBuyTopdata(res.data);
        }
      });
    } catch (e: any) {}
  }, []);

  // 映射：{ value: 1048, name: 'Search Engine' },
  const invokeChartData = invokeTopdata.map((item) => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });

  const invokeOption = {
    title: {
      text: '调用次数最多的接口TOP5',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '接口名：次数',
        type: 'pie',
        radius: '50%',
        data: invokeChartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // 映射：{ value: 1048, name: 'Search Engine' },
  const buyChartData = buyTopdata.map((item) => {
    return {
      value: item.total,
      name: item.interfaceName,
    };
  });

  const buyOption = {
    title: {
      text: `购买次数最多的接口TOP5`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '接口名：次数',
        type: 'pie',
        radius: '50%',
        data: buyChartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <PageContainer>
      <Card
        bordered={false}
        extra={
          <Button type="primary" icon={<DownloadOutlined />} onClick={()=>{
            window.location.href = requestConfig.baseURL + '/api/analysis/top/interface/invoke/excel';
          }
          }>
            下载统计表格
          </Button>
        }
      >
        <ReactECharts option={invokeOption} />
      </Card>
      <Divider />
      <Card
        bordered={false}
        extra={
          <Button type="primary" icon={<DownloadOutlined />}onClick={()=>{
            window.location.href = requestConfig.baseURL + '/api/analysis/top/interface/buy/excel';
          }
          }>
            下载统计表格
          </Button>
        }
      >
        <ReactECharts option={buyOption} />
      </Card>
    </PageContainer>
  );
};
export default InterfaceAnalysis;
