import React, { useState, useEffect } from 'react'
import { Button, Modal, Select } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

const DeleteCard = (props) => {

    let toDelete = [];
    const [cards, setCards] = useState();

    useEffect(() => {
        fetch("http://localhost:8000/cards").then((res) => {
            return res.json();
        }).then((resp) => {
            setCards(resp.filter((cards) => {
                return cards.bucket === props.bucket;
            }));
        }).catch((err) => {
            console.log(err.message);
        })
    }, [props]);

    const showPromiseConfirm = () => {

        const options = [];

        for(let i = 0; i < cards.length; i++)
        {
            options.push({
                label: `${cards[i].name} - ${cards[i].id}`,
                value: cards[i].id,
            });
        }

        confirm({
            title: 'Choose the cards you want to delete',
            icon: <ExclamationCircleFilled />,
            content: (
                <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select"  onChange={handleChange} options={options} />
            ),
            onOk() {
                handleOk();
                return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    };

    const handleChange = (id) => {
        toDelete = [...toDelete, id];
    };

    const handleOk = () => {
        const remove = toDelete[toDelete.length - 1];

        for(let i = 0; i < remove.length; i++)
        {
            fetch(`http://localhost:8000/cards/${remove[i]}`,{
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
    }

    return (
        <div>
            <Button type="default" shape="round" icon={<DeleteOutlined />} size='medium' onClick={showPromiseConfirm}> Delete Cards </Button>
        </div>
    );
}

export default DeleteCard
