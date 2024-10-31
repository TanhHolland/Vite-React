import React from 'react';
import {Table} from 'antd';
import type { TableProps } from 'antd';


interface DataType {
  key: string,
  fullName: string;
  password: number;
  email: string;
  phone: string;
}
type DataProps = {
  data: DataType[] 
};
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: 'name',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    key: 'phone',
    dataIndex: 'phone',
  },
];

const App: React.FC<DataProps> = ({data}) => <Table<DataType> columns={columns} dataSource={data} pagination={{ defaultPageSize: 5}}/>;

export default App;