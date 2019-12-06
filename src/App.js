import React, {useState, useEffect} from 'react';
import ExpenseList from "./components/ExpenseList";
import ExpenseFrom from "./components/ExpenseFrom";
import Alert from "./components/Alert";
import uuid from 'uuid/v4';
import './App.css';

// const initialExpenses = [
//     {id:uuid(), charge:"rent",amount:1200},
//     {id:uuid(), charge:"car gazolin",amount:200},
//     {id:uuid(), charge:"food",amount:500},
// ]
const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []

function App() {
    // state values
    // all expenses
    const [expenses, setExpenses] = useState(initialExpenses);
    // single expense
    const [charge, setCharge] = useState('')
    // single amount
    const [amount, setAmount] = useState('')
    // alert
    const [alert, setAlert] = useState({show: false})
    // edit
    const [edit, setEdit] = useState(false)
    // edit item
    const [id, setId] = useState(0)
    // use Effecet
    useEffect(() => {

        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])
    // funtionality
    const handleCharge = event => {
        setCharge(event.target.value)
    }
    const handleAmount = event => {
        setAmount(event.target.value)
    }
    // handle alret
    const handleAlert = ({type, text}) => {
        setAlert({show: true, type, text})
        setTimeout(() => {
            setAlert({show: false})
        }, 3000)

    }
    // clear all items
    const clearItems = () => {
        setExpenses([])
        handleAlert({type: 'danger', text: `all items deleted`})
    }
    const handleDelete = (id) => {
        let temExpenses = expenses.filter(item => item.id !== id)
        setExpenses(temExpenses)
        handleAlert({type: 'danger', text: `Item Deleted`})
    }
    const handleEdit = (id) => {
        let expense = expenses.filter(item => item.id === id)
        console.log(expense)
        let {amount, charge} = expense[0]
        setCharge(charge)
        setAmount(amount)
        setEdit(true)
        setId(id)


    }

    // handle submit
    const handleSubmit = event => {
        event.preventDefault()
        if (charge !== '' && amount > 0) {
            if (edit) {
                let tempExpeses = expenses.map(item => {
                    return item.id === id ? {...item, charge, amount} : item
                })
                setExpenses(tempExpeses)
                setEdit(false)
                handleAlert({type: 'success', text: 'Item Edited'})
            } else {
                const singleExpense = {id: uuid(), charge, amount}
                setExpenses([...expenses, singleExpense])
                handleAlert({type: 'success', text: 'Item Added'})

            }
            setCharge('')
            setAmount('')

        } else {
            //handle alert
            handleAlert({type: 'danger', text: ` charge Can't Be Empty Value And Amount Value Has To Bigger Than Zero`})
        }
    }
    return <>
        {alert.show && <Alert type={alert.type} text={alert.text}/>}
        <Alert/>
        <h1>budget manager tool</h1>
        <main className="App Main">

                <ExpenseFrom charge={charge}
                             amount={amount}
                             handleCharge={handleCharge}
                             handleAmount={handleAmount}
                             handleSubmit={handleSubmit}
                             edit={edit}
                />
                <ExpenseList expenses={expenses}
                             handleDelete={handleDelete}
                             handleEdit={handleEdit}
                             clearItems={clearItems}
                />

        </main>
        <h1>
            total spending: <span className="total">
          $ {expenses.reduce((acc, curr) => {
            return acc += parseInt(curr.amount)
            }, 0)}
                             </span>
        </h1>

    </>;
}

export default App;
