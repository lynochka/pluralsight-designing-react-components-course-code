import { useState, useEffect } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const restUrl = "api/speakers";

function useRequestRest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  useEffect(() => {
    async function delayFunc() {
      try {
        const { data: newData } = await axios.get(restUrl);
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${newData.length}`
        );
        const responseJson = await response.json();
        const imageUrls = responseJson.map(function (item) {
          return item.url;
        });
        const dataWithImageUrls = newData.map((record, index) => {
          return { ...record, imageUrl: imageUrls[index] };
        });
        setData(dataWithImageUrls);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e.toString());
      }
    }
    delayFunc();
  }, []);

  function updateRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.map(function (rec) {
      return rec.id === record.id ? record : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${record.id}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log(`Error thrown inside delayFunction: ${error.toString()}`);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function deleteRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.filter(function (rec) {
      return rec.id !== record.id;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log(`Error thrown inside delayFunction: ${error.toString()}`);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function insertRecord(record, doneCallback) {
    const originalRecords = [...data];

    async function delayFunction() {
      try {
        const results = await axios.post(`${restUrl}/99999`, record);
        const { data: insertedRecord } = results;
        const newRecords = [insertedRecord, ...data];
        setData(newRecords);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log(`Error thrown inside delayFunction: ${error.toString()}`);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}

export default useRequestRest;
