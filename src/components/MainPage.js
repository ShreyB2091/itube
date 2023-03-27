import React, { useEffect, useState } from 'react'
import MyCard from './Card';

const MainPage = (props) => {

    const [cards, setCards] = useState([]);

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
    },[props]);

    return (
        <div className="container">
            <div className="row">
                {
                    cards?.map((element) => {
                        return(
                            <div className="col-md-4 my-3" key={element.id}>
                                <MyCard title={element.name} description={element.description} loading={false} url={element.url} id={element.id} bucket={element.bucket}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MainPage
