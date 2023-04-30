import {
  ModalForm,
  ProColumns,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

const UpdateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit, values } = props;

  const formRef = useRef<any>();

  useEffect(()=>{
    if(formRef){
      formRef.current?.setFieldsValue(values);
    }
  },[values])

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
      formRef={formRef}
        onSubmit={async (values) => {
          onSubmit?.(values);
        }}
      />
    </Modal>
  );
};
export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
  values: API.InterfaceInfo;
};
export default UpdateModal;
