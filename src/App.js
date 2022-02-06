import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import "./App.css";
import { useEffect, useState } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const initData = [
    { id: 1, title: "ค่ารักษาพยาบาล", amount: -300 },
    { id: 2, title: "เงินเดือน", amount: 50000 },
    { id: 3, title: "ค่าน้ำมัน", amount: -400 },
    { id: 4, title: "จ่ายค่าประกัน", amount: -300 },
    { id: 5, title: "ถ่ายรูป", amount: 10000 },
  ];
  const [items, setItems] = useState(initData);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };
  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((e) => e > 0)
      .reduce((total, e) => (total += e), 0);
    const expense =
      amounts.filter((e) => e < 0).reduce((total, e) => (total += e), 0) * -1;

    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items, reportIncome, reportExpense]);

  return (
    <DataContext.Provider
      value={{ income: reportIncome, expense: reportExpense }}
    >
      <div className="container">
        <h1 style={{ color: "black", textAlign: "center", fontSize: "1.5rem" }}>
          โปรแกรมบัญชีรายวัน - รายจ่าย
        </h1>

        <Router>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          ​
          <Switch>
            <Route path="/" exact>
              <ReportComponent />
            </Route>
            <Route path="/insert">
              <FormComponent onAddItem={onAddNewItem} />
              <Transaction items={items} />
            </Route>
          </Switch>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
