import React, {useEffect} from "react";
import axios from "axios";


function Home() {

    useEffect (() => {
        
        var data = {
            "b_no" : ["1111111"]
          };
          async function postData() {
            try {
              //응답 성공 
              const response = await axios.post('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=//rH1+oYiAtbCXqXTZyLT0bL8eTGbv9c/U3vGHD9MwzkH/NOPvjfEG6CrqY2YOSgq6gxhah7x6qt3IssjcWcfqA==',{
                  //보내고자 하는 데이터 
                  type: "post",
                  data: JSON.stringify(data),
                  dataType : "json",
                  contentType : "application/json",
                  accept : "application/json",
                  authorization : "/rH1+oYiAtbCXqXTZyLT0bL8eTGbv9c/U3vGHD9MwzkH/NOPvjfEG6CrqY2YOSgq6gxhah7x6qt3IssjcWcfqA=="
              });
              console.log(response);
            } catch (error) {
              //응답 실패
              console.error(error);
            }
          }
          postData();
    },[]);

    return (
        <h1>홈 화면 입니다.</h1>
    );
}

export default Home;