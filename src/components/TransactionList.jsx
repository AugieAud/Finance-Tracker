export default function TransactionList({ transactions }) {
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0); //.reduce to sum up all transaction amounts acc starts at 0 tx = the current transaction in the array.

  return (
    <div>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {/* key gives unique identifier */}
            {tx.desc}: ${tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
