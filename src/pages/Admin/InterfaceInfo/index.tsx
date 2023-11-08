import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Badge, Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/api/binapi-backend/interfaceInfoController';
import type { SortOrder } from 'antd/es/table/interface';
import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';
import UpdateModal from '@/pages/Admin/InterfaceInfo/components/UpdateModal';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('操作失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();

      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('正在发布');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();

      return true;
    } catch (error: any) {
      hide();
      message.error('发布失败，' + error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();

      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败，' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
      width: 50,
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
      ellipsis: true,
      hideInTable: true,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      ellipsis: true,
      hideInTable: true,
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (_, record) => {
        switch (record.status) {
          case 0:
            return <Badge key={record.status} color={'red'} text={'已关闭'} />;
          case 1:
            return <Badge key={record.status} color={'green'} text={'已开启'} />;
          case 2:
            return <Badge key={record.status} color={'orange'} text={'待审核'} />;
          default:
            return <Badge key={record.status} color={'blue'} text={'未知'} />;
        }
      },
      valueEnum: new Map([
        [0, '已关闭'],
        [1, '已开启'],
        [2, '待审核'],
      ]),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          size={'small'}
          type={'text'}
          key="edit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,
        record.status === 0 ? (
          <Button
            size={'small'}
            type={'text'}
            key="online"
            onClick={() => {
              handleOnline(record);
            }}
          >
            发布
          </Button>
        ) : (
          <Button
            size={'small'}
            type={'text'}
            key="offline"
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </Button>
        ),

        <Button
          type={'text'}
          size={'small'}
          danger
          key="remove"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey={currentRow?.id}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params: U & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res = await listInterfaceInfoByPageUsingGET({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalVisible(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalVisible}
      />
    </PageContainer>
  );
};
export default TableList;
