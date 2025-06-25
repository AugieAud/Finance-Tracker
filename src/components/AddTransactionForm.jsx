import { useState } from "react";

export default function AddTransactionForm({ onAdd }) {
  const [desc, setDesc] = useState(""); //transaction description
  const [amount, setAmount] = useState(""); //transaction amount
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); //transaction date with today as default

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ 
      id: Date.now(), 
      desc, 
      amount: parseFloat(amount),
      date: date // Store the date with the transaction
    });
    setDesc(""); //clear form inputs after submission
    setAmount("");
    setDate(new Date().toISOString().split('T')[0]); // Reset date to today
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Amount"
        required
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        required
      />
      <button>Add</button>
    </form>
  );
}
