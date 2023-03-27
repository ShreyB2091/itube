import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Skeleton, Modal, Form, Input, Badge } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import cover from './cover.jpg';

const { Meta } = Card;
const { confirm } = Modal;

const MyCard = (props) => {

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEdit = () => {
        confirm({
            title: 'Enter details of the card',
            icon: <PlusCircleFilled />,
            content: (
                <Form className='text-center' form={form} layout="vertical" autoComplete="off" >
                    <Form.Item name="name" label="Name" rules={[{type: 'string', min: 6}]}>
                        <Input placeholder="Enter Name of Video" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{type: 'string', min: 15}]} >
                        <Input placeholder="Enter Description of Video" />
                    </Form.Item>
                    <Form.Item name="url" label="URL" rules={[{type: 'url', warningOnly: true}, {type: 'string'}]} >
                        <Input placeholder="Enter Source of Video" />
                    </Form.Item>
                    <Form.Item name="bucket" label="Bucket" rules={[{type: 'string'}]} >
                        <Input placeholder="Enter Bucket" />
                    </Form.Item>
                </Form>
            ),
            onOk() {
                handleOk();
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {form.resetFields();},
        });
    };

    const handleOk = () => {
        let name = form.getFieldValue('name') === undefined ? props.title : form.getFieldValue('name');
        let description = form.getFieldValue('description') === undefined ? props.description : form.getFieldValue('description');
        let url = form.getFieldValue('url') === undefined ? props.url : form.getFieldValue('url');
        let bucket = form.getFieldValue('bucket') === undefined ? props.bucket : form.getFieldValue('bucket');

        let card = {name, description, url, bucket};
        
        fetch(`http://localhost:8000/cards/${props.id}`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(card)
        }).then((res) => {
            alert("Saved Successfully");
        }).catch((err) => {
            console.log(err.message);
        })

        form.resetFields();
    }

    const handleDelete = () => {
        fetch(`http://localhost:8000/cards/${props.id}`,{
            method: "DELETE",
        }).then((res) => {
            if(!res.ok){
                return Modal.error({
                    title: 'ERROR!',
                    content: "Couldn't delete the cars",
                  });
            }
        }).catch(error => {
            console.error("There was a problem deleting the card: ", error);
        });
    }
    
    return (
        <>
            <Badge count={props.id}>
                <Card hoverable style={{ width: '100%', marginTop: 16 }} actions={[<EditOutlined key="edit" onClick={handleEdit}/>, <DeleteOutlined key="delete" onClick={handleDelete}/> ]} cover={<img alt="example" src={cover} style={{ objectFit: 'cover', height: '150px' }} onClick={showModal}/>}>
                    <Skeleton loading={props.loading} avatar active>
                        <Meta title={props.title} description={`${props.description.slice(0,25)}`+ `...`} onClick={showModal}/>
                    </Skeleton>
                </Card>
            </Badge>
            <Modal mask={true} bodyStyle={{height:'100%', width:'100%', display:"flex"}} title={props.title} open={isModalOpen} onCancel={handleCancel} footer={null} centered={true}>
                <iframe width={'900'} height={'400'} src={props.url} title={props.description} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Modal>
        </>
    );
};
export default MyCard;