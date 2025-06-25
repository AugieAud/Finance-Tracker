import { useLocalStorage } from "./hooks/useLocalStorage";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import BalanceChart from "./components/BalanceChart";
import WeeklyTrendChart from "./components/WeeklyTrendChart";

function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);

  const addTransaction = (tx) => {
    setTransactions([...transactions, tx]);
  };
  const removeTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Personal Finance Tracker</h1>
      <div className="content-layout">
        <div className="left-panel">
          <AddTransactionForm onAdd={addTransaction} />
          <div className="left-column">
            <TransactionList
              transactions={transactions}
              onRemove={removeTransaction}
            />
          </div>
        </div>
        <div className="right-column">
          <BalanceChart transactions={transactions} />
          <div className="chart-spacer"></div>
          <WeeklyTrendChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
