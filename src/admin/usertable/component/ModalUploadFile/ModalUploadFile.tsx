import React, { useState } from "react";
import { Modal, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { API_ImportUser } from "../../../../service/api.admin.custom";
import * as XLSX from "xlsx";
import Table from "./Table";
import { Link } from "@nextui-org/react";
import testuser from "../../../../assets/testuser.xlsx?url";
import { Button } from "@nextui-org/react";
// Table

// Upload
const { Dragger } = Upload;
interface DataType {
  key: string;
  fullName: string;
  password: number;
  email: string;
  phone: string;
}
type DataTypeWithoutKey = Omit<DataType, "key">;
// Main
const App: React.FC = () => {
  // Upload
  const [data, setData] = React.useState<DataType[]>([]);

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    maxCount: 1,
    accept:
      ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    customRequest: dummyRequest,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    beforeUpload(file, fileList) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const binaryString = data.reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ""
        );

        const workbook = XLSX.read(binaryString, { type: "binary" });
        // console.log(workbook);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // console.log(sheet);
        const sheetData: DataType[] = XLSX.utils.sheet_to_json(sheet, {
          header: ["key", "fullName", "password", "email", "phone"],
          range: 1,
        });
        // console.log(sheetData);
        setData(sheetData);
        // console.log("Data import", sheetData);
      };
      reader.readAsArrayBuffer(file);
      // reader.readAsBinaryString(file); // khong ho tro
      // return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove() {
      setData([]);
    },
  };
  // App
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const validateData = data.map((item) => {
        let x: DataTypeWithoutKey = {
          fullName: item.fullName,
          password: item.password,
          email: item.email,
          phone: item.phone,
        };
        return x;
      });
      const res = await API_ImportUser(validateData);
      if (res.data) {
        notification.success({
          message: "Import user thanh cong",
        });
      }
    } catch (error: any) {
      console.log(error);
      notification.error({
        message: error.response.data.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button color="secondary" onPress={showModal}>
        Import
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.{" "}
            <Link href={testuser} color="success" underline="always">
              Download example
            </Link>
          </p>
        </Dragger>
        <Table data={data}></Table>
      </Modal>
    </>
  );
};

export default App;
