import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { FolderAddOutlined, PlusCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

const AddCard = () => {

    const [buckets, setBuckets] = useState([]);
    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    useEffect(() => {
        fetch("http://localhost:8000/buckets").then((res) => {
            return res.json();
        }).then((resp) => {
            setBuckets(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const showPromiseConfirm = () => {
        confirm({
            title: 'Enter details of the card',
            icon: <PlusCircleFilled />,
            content: (
                <Form className='text-center' form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                    <Form.Item name="name" label="Name" rules={[{required: true}, {type: 'string', min: 6}]}>
                        <Input placeholder="Enter Name of Video" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{required: true}, {type: 'string', min: 15}]} >
                        <Input placeholder="Enter Description of Video" />
                    </Form.Item>
                    <Form.Item name="url" label="URL" rules={[{required: true}, {type: 'url', warningOnly: true}, {type: 'string'}]} >
                        <Input placeholder="Enter Source of Video" />
                    </Form.Item>
                    <Form.Item name="bucket" label="Bucket" rules={[{required: true}, {type: 'string'}]} >
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
        const name = (form.getFieldValue('name'));
        const description = (form.getFieldValue('description'));
        const url = (form.getFieldValue('url'));
        const bucket = (form.getFieldValue('bucket'));

        let card = {name, description, url, bucket};
        
        fetch('http://localhost:8000/cards', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(card)
        }).then((res) => {
            alert("Saved Successfully");
        }).catch((err) => {
            console.log(err.message);
        })
        
        if(!buckets.find(buc => buc.name === bucket))
        {
            let addBucket = {name: bucket};
            
            fetch('http://localhost:8000/buckets', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(addBucket)
            }).then((res) => {

            }).catch((err) => {
                console.log(err.message);
            })
        }

        form.resetFields();
    }

    return (
        <div>
            <Button type="default" shape="round" icon={<FolderAddOutlined />} size='medium' onClick={showPromiseConfirm}>Add Card</Button>
        </div>
    );
}

export default AddCard