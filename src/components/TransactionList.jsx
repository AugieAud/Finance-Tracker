export default function TransactionList({ transactions, onRemove }) {
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0); //.reduce to sum up all transaction amounts acc starts at 0 tx = the current transaction in the array.

  return (
    <div>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <ul className="transaction-list">
        {transactions.map((tx) => (
          <li key={tx.id} className="transaction-item">
            <span>{tx.desc}: ${tx.amount.toFixed(2)}</span>
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
