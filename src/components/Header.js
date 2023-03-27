import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteCard from './DeleteCard';
import AddCard from './AddCard';

const Header = (props) => {

    const [ buckets, setBuckets ] = useState([]);
    const [value, setValue] = useState('a');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onBucketChange(newValue);
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

    return (
        <div className="row my-3 d-flex justify-content-center align-items-center">
            <div className="col-7" sx={{ maxWidth: { xs: 300, sm: 480 }, bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="scrollable prevent tabs example" style={{ width: '100%' }}>
                    {
                        buckets?.map((item) => {
                            return (<Tab label={item.name} key={item.name} value={item.name}/>);
                        })
                    }
                </Tabs>
            </div>
            <div className="col-2 mx-1">
                <AddCard bucket={value}/>
            </div>
            <div className="col-2 mx-1">
                <DeleteCard bucket={value}/>
            </div>
        </div>
    );
}

export default Header;