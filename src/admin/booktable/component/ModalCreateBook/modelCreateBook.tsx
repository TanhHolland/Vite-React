import { useRef, useState, useEffect, useCallback } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button as NextButton,
    useDisclosure,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import {
    API_CreateBook,
    API_FetchCategory,
    API_UploadBookImg,
} from "../../../../service/api.admin.custom";
import { notification } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps, GetProp, UploadFile } from "antd";
import { Button, message, Upload, Image } from "antd";
import DefaultBook from "../../../../assets/238-2389220_white-papers-default-book.png";
interface TypeCategory {
    key: string;
    label: string;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const [categoryList, setCategoryList] = useState<TypeCategory[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImageSlider, setPreviewImageSlider] = useState("");
    const [previewThumbnail, setPreviewThumbnail] = useState<
        string | undefined
    >();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileThumb, setFileThumb] = useState<string | undefined>();
    const [fileSlider,setFileSlider] = useState<string[] | undefined>([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await API_FetchCategory();
                if (response.data.data) {
                    const list = response.data.data.map((item: string) => {
                        let data = {
                            key: item,
                            label: item,
                        };
                        return data;
                    });
                    // console.log(list);
                    setCategoryList(list);
                }
            } catch (error: any) {
                console.log(error);
                notification.error({
                    message: error.response.data.message,
                });
            }
        };
        fetchCategory();
    }, []);
    const getBase64 = useCallback(
        (file: FileType): Promise<string> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            }),
        []
    );
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImageSlider(file.url || (file.preview as string));
        setPreviewOpen(true);
    };
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    // Đặt kiểu `MutableRefObject<HTMLInputElement | null>` cho các ref
    const authorRef = useRef<HTMLInputElement | null>(null);
    const bookTitleRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const soldRef = useRef<HTMLInputElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null);
    const categoryRef = useRef<HTMLSelectElement | null>(null);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const dummyRequestThumbnail = async ({ file, onSuccess }: any) => {
        const res = await API_UploadBookImg(file);
        if(res && res.data) {
           onSuccess("ok");
           setFileThumb(res.data.data.fileUploaded);
           console.log(res.data); 
        }
    };
    const dummyRequestSlider = async ({ file, onSuccess }: any) => {
        const res = await API_UploadBookImg(file);
        if(res && res.data) {
           onSuccess("ok");
           setFileSlider((prevState) => [...(prevState || []), res.data.data.fileUploaded]);
        }
    };
    const propsThumbnail: UploadProps = {
        name: "file",
        maxCount: 1,
        accept: "image/png, image/gif, image/jpeg",
        customRequest: dummyRequestThumbnail,
        beforeUpload(file, fileList) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const url = event.target?.result;
                setPreviewThumbnail(url as string);
            };
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);                
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove() {
            setPreviewThumbnail(undefined);
            console.log(fileList);
        },
    };   
    const propsSlider: UploadProps = {
        name: "file",
        maxCount: 3,
        accept: "image/png, image/gif, image/jpeg",
        listType: "picture-card",
        fileList: fileList,
        onPreview: handlePreview,
        onChange: handleChange,
        customRequest: dummyRequestSlider,
    };
    const handleAddBook = async () => {
        const author = authorRef.current?.value;
        const bookTitle = bookTitleRef.current?.value;
        const price = Number(priceRef.current?.value);
        const sold = Number(soldRef.current?.value);
        const quantity = Number(quantityRef.current?.value);
        const category = categoryRef.current?.value;
        if(!fileSlider || !fileThumb) {
            notification.error({
                message: "Up anh len",
            });
        }
        const slider = fileSlider;
        const thumbnail = fileThumb;
        console.log(author,bookTitle,price,sold,quantity,category);
        if (
            author &&
            bookTitle &&
            price &&
            sold &&
            quantity &&
            category &&
            slider &&
            thumbnail
        ) {
            try {
                const data = {
                    thumbnail,
                    slider,
                    mainText: bookTitle,
                    author,
                    price,
                    sold,
                    quantity,
                    category,
                };
                const response = await API_CreateBook(data);
                if (response.data.data) {
                    notification.success({
                        message: "Tao sach thanh cong",
                    });
                }
            } catch (error: any) {
                console.log(error);
                notification.error({
                    message: error.response.data.message,
                });
            }
        } else {
            notification.error({
                message: "Khong duoc de trong thong tin",
            });
        }
    };

    return (
        <>
            <NextButton
                onPress={onOpen}
                color="primary"
                endContent={<PlusIcon />}
            >
                ADD BOOK
            </NextButton>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size="5xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add User
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start flex-col gap-3 ">
                                        <Image
                                            width={300}
                                            preview={false}
                                            src={
                                                !previewThumbnail
                                                    ? DefaultBook
                                                    : previewThumbnail
                                            }
                                        />
                                        <Upload {...propsThumbnail}>
                                            <Button icon={<UploadOutlined />}>
                                                Upload Thumbnail
                                            </Button>
                                        </Upload>
                                        <span>Slider</span>
                                        <Upload {...propsSlider}>
                                            {fileList.length >= 3
                                                ? null
                                                : uploadButton}
                                        </Upload>
                                        {previewImageSlider && (
                                            <Image
                                                wrapperStyle={{
                                                    display: "none",
                                                }}
                                                preview={{
                                                    visible: previewOpen,
                                                    onVisibleChange: (
                                                        visible
                                                    ) =>
                                                        setPreviewOpen(visible),
                                                    afterOpenChange: (
                                                        visible
                                                    ) =>
                                                        !visible &&
                                                        setPreviewImageSlider(
                                                            ""
                                                        ),
                                                }}
                                                src={previewImageSlider}
                                            />
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-10 w-1/2">
                                        <Input
                                            ref={authorRef}
                                            autoFocus
                                            label="Author"
                                            variant="bordered"
                                        />
                                        <Select
                                            ref={categoryRef}
                                            label="Category"
                                            placeholder="Select an category"
                                            className="max-w-xs"
                                        >
                                            {categoryList.map((item) => (
                                                <SelectItem key={item.key}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Input
                                            ref={bookTitleRef}
                                            label="Book Title"
                                            variant="bordered"
                                        />
                                        <Input
                                            ref={priceRef}
                                            label="Price"
                                            variant="bordered"
                                        />
                                        <Input
                                            ref={quantityRef}
                                            label="Quantity"
                                            variant="bordered"
                                        />
                                        <Input
                                            ref={soldRef}
                                            label="Sold"
                                            variant="bordered"
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <NextButton
                                    color="primary"
                                    type="submit"
                                    onPress={handleAddBook}
                                >
                                    ADD
                                </NextButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
