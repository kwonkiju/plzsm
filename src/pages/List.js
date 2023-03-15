import React from "react";
import item from "./item";

const List = ({items}) =>{
    return(
        <div>
            {items.map((item) =>
                <item item={item}/>
            )}
        </div>
    );
}