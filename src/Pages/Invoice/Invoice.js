import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config/firebase-config';
import './Invoice.css'

function Invoice() {

    const [date, setDate] = useState('');
    const [invID, setInvID] = useState(0);
    const [cusName, setCusName] = useState('');
    const [itemID, setItemID] = useState(0);
    const [desc, setDesc] = useState('');
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState('');
    const [itemArray, setItemArray] = useState([]);
    const [total, setTotal] = useState(0);

    const InvoiceRef = collection(db, "Invoices")

    const handleAdd = () => {
        if(desc !== '' && itemID >= 0 && qty > 0){
            itemArray.push(`${itemID} - ${desc} - ${qty} - ${price}`)
            console.log(itemArray)
            calTot();
        }
        else{
            alert("Please Fill Details");
            return
        }
    }

    let calTot = () => {
        itemArray.map((item) => {
            setTotal(total + Number(item.split(" - ")[3]))
            console.log(total)
        })
    }

    const handleProcess = () => {
        if(itemArray !== [] && date != '' && invID >= 0 && cusName !== ''){
            const data = {
                CusName: cusName,
                ID: invID,
                date: date,
                Items: itemArray,
                Total: total
            }

            addDoc(InvoiceRef, data);
            alert("done")
        }
        else{
            alert("Please Fill Details!")
        }
    }

  return (
    <div className='invoiceMain'>
        <text>Invoice</text>
        <div className='invoiceTop'>
            <span>Date</span>
            <input type={'date'} onChange={(e) => {setDate(e.target.value)}}/>
            <span>Invoice ID</span>
            <input type={'text'} onChange={(e) => {setInvID(e.target.value)}}/>
            <span>Customer</span>
            <input type={'text'} onChange={(e) => {setCusName(e.target.value)}}/>
        </div>
        <table className='itemDetailsAdd'>
            <tr>
                <th>Item ID</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
            </tr>
            <tr>
                <td><input type={'number'} onChange={(e) => {setItemID(e.target.value)}}/></td>
                <td><input type={'text'} onChange={(e) => {setDesc(e.target.value)}}/></td>
                <td><input type={'number'} onChange={(e) => {setQty(e.target.value)}}/></td>
                <td><input type={'text'} onChange={(e) => {setPrice(e.target.value)}}/></td>
                <td><button onClick={() => {handleAdd()}}>Add</button></td>
            </tr>
        </table>
        <table className='itemDetailsTable'>
            <tr>
                <th>Item ID</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
            </tr>
            {itemArray.map((item) => {
                return(
                    <tr>
                        <td>{item.split(" - ")[0]}</td>
                        <td>{item.split(" - ")[1]}</td>
                        <td>{item.split(" - ")[2]}</td>
                        <td>{item.split(" - ")[3]}</td>
                    </tr>
                )
            })}
        </table>
        <div className='invoiceBottom'>
            <span>Total</span>
            <span>{total}</span>
            <button onClick={() => handleProcess()}>Process</button>
            <button>Clear</button>
        </div>
    </div>
  )
}

export default Invoice