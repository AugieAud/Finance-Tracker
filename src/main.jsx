import { useLocalStorage } from "./hooks/useLocalStorage";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import BalanceChart from "./components/BalanceChart";

function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);

  const addTransaction = (tx) => {
    setTransactions([...transactions, tx]);
  };

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <AddTransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
      <BalanceChart transactions={transactions} />
    </div>
  );
}

export default App;
