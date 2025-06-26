import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect } from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import BalanceChart from "./components/BalanceChart";
import WeeklyTrendChart from "./components/WeeklyTrendChart";

function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [lastResetDate, setLastResetDate] = useLocalStorage("lastResetDate", null);

  // Check if we need to reset transactions at the start of a new week
  useEffect(() => {
    const checkWeeklyReset = () => {
      const today = new Date();
      const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
      
      // Define which day is considered the start of the week (0 for Sunday, 1 for Monday)
      const weekStartDay = 1; // Monday as start of week
      
      // Check if today is the start of the week
      if (currentDay === weekStartDay) {
        // Format today's date as YYYY-MM-DD for comparison
        const todayFormatted = today.toISOString().split('T')[0];
        
        // If we haven't reset yet this week, clear the transactions
        if (lastResetDate !== todayFormatted) {
          console.log('Starting a new week - clearing transactions');
          setTransactions([]);
          setLastResetDate(todayFormatted);
        }
      }
    };
    
    // Run the check when the component mounts
    checkWeeklyReset();
    
    // Set up a daily check (runs once per day)
    const dailyCheckInterval = setInterval(checkWeeklyReset, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(dailyCheckInterval);
  }, [lastResetDate, setLastResetDate, setTransactions]);

  const addTransaction = (tx) => {
    setTransactions([...transactions, tx]);
  };
  const removeTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };
  
  // Function to manually reset transactions
  const resetTransactions = () => {
    setTransactions([]);
    setLastResetDate(new Date().toISOString().split('T')[0]);
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
            <button 
              onClick={resetTransactions} 
              className="reset-button"
              style={{ marginTop: '20px', padding: '8px 12px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Reset All Transactions
            </button>
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
