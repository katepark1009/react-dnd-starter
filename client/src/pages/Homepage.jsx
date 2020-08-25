import React, { useState } from "react";
import Item from '../component/Item'
import Col from '../component/Col'
import DropWrapper from '../component/DropWrapper'
import { data, statuses } from '../data'

const Homepage = props => {
    const [items, setItems] = useState(data)

    const onDrop = ( item, monitor, status ) => {
        const mapping = statuses.find(si => si.status === status)
        console.log("onDrop -> mapping", mapping)
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon})
            console.log("onDrop -> newItems", newItems)
            return newItems
        })
    }

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex]
        console.log("moveItem -> item", item)
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex)
            newItems.splice(hoverIndex, 0, item)
            console.log("moveItem -> newItems", newItems)
            return [ ...newItems ]
        })
    }
    return (
        <div className='row'>
            {statuses.map((s, idx) => {
                return (
                    <div key={idx} className='col-wrapper'>
                        <h2 className='col-header'>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s}/>)
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                )
            })}
        </div>
    );
};

export default Homepage;