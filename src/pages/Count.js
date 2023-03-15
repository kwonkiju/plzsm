import React, { useState } from "react";

const Count = () =>{
    var [val,setVal] = useState(0);

    const increase = () =>{
        setVal(val+1);
    }

    const decrease = () =>{
        setVal(val-1);
    }
    return (
        <div>
            <button onClick={ increase }>+1</button>

            <button onClick={ decrease }>-1</button>

            <span> { val }</span>
        </div>
    );
}

export default Count;