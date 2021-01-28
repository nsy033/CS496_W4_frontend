import axios from "axios";
import React, { useState, useEffect} from 'react';

const TestCrawl = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const datas = await axios.get("http://192.249.18.241:4000/testcrawling/all");
      setData(datas.data);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data === null) {
    return <div>Load..</div>;
  } else {
    console.log(data);
    return (
      <div>
        {data.map((ele) => (
          <>
            <div>
              현재 {ele.text}의 현황 : {ele.num}
            </div>
            <br />
          </>
        ))}
      </div>
    );
  }
};

export default TestCrawl;