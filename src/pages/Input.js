import React, { useState } from "react";

const Input = () =>{
    const [vals,setVals] = useState({
        name : "",
        tel : "",
        email : ""
    })

    const {name, tel, email} = vals;

    const onChange  = (e) =>{
        var id = e.target.id;
        var value = e.target.value;

        setVals({
            ...vals,
            [id] : value

        })
        
        
    }
    return (
        <div>
            <label>이름</label>
            <input type ="text"  id = "name" value ={name} onChange={onChange}></input>

            <label>번호</label>
            <input type ="tel" id = "tel"  value={tel} onChange={onChange}></input>

            <label>이메일</label>
            <input type ="address" id ="email" value ={email} onChange={onChange}></input>

            <span> {name}</span>
            
            <span> {tel}</span>

            <span> {email}</span>
        </div>
    );
}

export default Input;