import React ,{}from "react";

const item = ({item}) =>{
    return(
        <div>
            <span> {item.id}</span>
            <span> {item.title}</span>
            <span> {item.cont}</span>
        </div>
    )
}

export default item;