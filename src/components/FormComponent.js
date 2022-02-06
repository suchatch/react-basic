import { useEffect, useState } from 'react'
import './FormComponent.css'
import { v4 as uuidv4 } from 'uuid';

const FormComponent = (props) => {
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState(0)
    const [fromValid,setFormvalid] = useState(false)

    const inputTitle = (event) => {
        setTitle(event.target.value)
    }
    const inputAmount = (event) => {
        setAmount(event.target.value)
    }
    useEffect(()=>{
        const checkData = title.trim().length>0 && amount !==0
        setFormvalid(checkData)
    },[title,amount])

    const saveItem = (event) => {
        event.preventDefault()
        const itemData = {
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        props.onAddItem(itemData)
        setTitle('')
        setAmount(0)
    }
    return (
        <div>
            <form>
                <div className="form-constrol">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการของคถุณ" onChange={inputTitle} value={title} />
                </div>
                <div className="form-constrol">
                    <label>จำนวนเงิน</label>
                    <input type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount} />
                </div>
                <div>
                    <button type="submit" className='btn' onClick={saveItem} disabled={!fromValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}
export default FormComponent