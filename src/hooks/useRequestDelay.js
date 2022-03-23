import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, intialData = []) {
  const [data, setData] = useState(intialData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTime);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    }
    delayFunc();
  }, []);

  function insertRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        // make sure it's defined, then call
        if (doneCallback) {
          doneCallback();
        }
      } catch {
        console.log(`Error thrown inside delayFunction: ${error.toString()}`);
        if (doneCallback) {
          doneCallback;
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function deleteRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.filter(function (rec) {
      return rec.id != record.id;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        // make sure it's defined, then call
        if (doneCallback) {
          doneCallback();
        }
      } catch {
        console.log(`Error thrown inside delayFunction: ${error.toString()}`);
        if (doneCallback) {
          doneCallback;
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function updateRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.map(function (rec) {
      return rec.id === record.id ? record : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        // make sure it's defined, then call
        if (doneCallback) {
          doneCallback();
        }
      } catch {
        console.log(`Error thrown inside delayFunction: ${error.toString()}`);
        if (doneCallback) {
          doneCallback;
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

export default useRequestDelay;
