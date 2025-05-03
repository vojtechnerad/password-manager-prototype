import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";

export default function PasswordsList() {
  interface DataType {
    key: React.Key;
    userName: string;
    password: string;
  }

  const data: DataType[] = [
    {
      key: "1",
      userName: "test",
      password: "aaaa",
    },
    {
      key: "2",
      userName: "test",
      password: "aaaa",
    },
    {
      key: "3",
      userName: "test",
      password: "aaaa",
    },
  ];

  return (
    <Table<DataType> dataSource={data}>
      <ColumnGroup title="Name">
        <Column title="Uživatelské jméno" dataIndex="userName" key="userName" />
        <Column title="Heslo" dataIndex="password" key="lastName" />
      </ColumnGroup>
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => <Space size="middle"></Space>}
      />
    </Table>
  );
}
