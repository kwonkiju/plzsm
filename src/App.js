import React , { useEffect, useState}from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.post('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=%2FrH1%2BoYiAtbCXqXTZyLT0bL8eTGbv9c%2FU3vGHD9MwzkH%2FNOPvjfEG6CrqY2YOSgq6gxhah7x6qt3IssjcWcfqA%3D%3D'
    ,{
      "b_no": ["3138112212"]
    })

      .then(res => {
        console.log(res.data.data);

        setList(res.data.data);
      })
      .catch()
  }, [])
  return (
    
      <div className="headText">
        <h2>테스트</h2>

        {list.map((item) =>
        <div key='1'>
        <div>사업자 번호 : {item.b_no}</div>
        <div>사업자 stt : {item.b_stt}</div>
        <div>세금 유형 : {item.tax_type}</div>
        </div>
      )}

      <div>
      <form action="http://localhost:3001/" method="POST" encType="multipart/form-data">

        <input type="file" name="xlsx" />
        <input type="submit" />

      </form>
      </div>
      </div>
  );
}

export default App;
