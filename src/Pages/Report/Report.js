import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config/firebase-config";
import './Report.css'

function Report() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [invos, setInvos] = useState([]);
  const [filterInvos, setFilterInvos] = useState([]);
  const [totSale, setTotSale] = useState(0);

  const invoRef = collection(db, "Invoices");

  const getInvos = async () => {
    const items = await getDocs(invoRef);
    setInvos(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSearch = () => {
    getInvos();
  };

  const clear = () => {
      setToDate('');
      setFromDate('');
      setInvos([]);
  }

  const display = invos.map((invo) => {
    if (
      Number(invo.date.split("-")[0]) >= fromDate.split("-")[0] &&
      Number(invo.date.split("-")[1]) >= fromDate.split("-")[1] &&
      Number(invo.date.split("-")[2]) >= fromDate.split("-")[2] &&
      Number(invo.date.split("-")[0]) <= toDate.split("-")[0] &&
      Number(invo.date.split("-")[1]) <= toDate.split("-")[1] &&
      Number(invo.date.split("-")[2]) <= toDate.split("-")[2]
    ) {
      return (
        <tr>
          <td>{invo.ID}</td>
          <td>{invo.date}</td>
          <td>{invo.Total}</td>
          <td>{invo.CusName}</td>
        </tr>
      );
    }
  });

  return (
    <div className="reportMain">
      <text>Report</text>
        <div className="dateSearch">
        <span>Date From</span>
        <input
            type={"date"}
            onChange={(e) => {
            setFromDate(e.target.value);
            }}
        />
        <span>Date To</span>
        <input
            type={"date"}
            onChange={(e) => {
            setToDate(e.target.value);
            }}
        />

        <button
            onClick={() => {
            handleSearch();
            }}
        >
            Search
        </button>
      </div>

      <table>
        <tr>
          <th>Invoice No</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Customer</th>
        </tr>
        {display}
      </table>
      <div className="reportButtons">
        <button onClick={() => {clear()}}>Clear</button>
      </div>
    </div>
  );
}

export default Report;
