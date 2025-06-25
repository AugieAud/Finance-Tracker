export default function TransactionList({ transactions, onRemove }) {
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0); //.reduce to sum up all transaction amounts acc starts at 0 tx = the current transaction in the array.

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date || 0) - new Date(a.date || 0);
  });

  return (
    <div>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <ul className="transaction-list">
        {sortedTransactions.map((tx) => (
          <li key={tx.id} className="transaction-item">
            <div className="transaction-details">
              <span className="transaction-date">{tx.date ? new Date(tx.date).toLocaleDateString() : 'No date'}</span>
              <span className="transaction-desc">{tx.desc}: ${tx.amount.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => onRemove(tx.id)} 
              className="delete-btn"
              aria-label="Delete transaction"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
