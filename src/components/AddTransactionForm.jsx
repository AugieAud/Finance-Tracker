import { useState } from "react";

export default function AddTransactionForm({ onAdd }) {
  const [desc, setDesc] = useState(""); //transaction description
  const [amount, setAmount] = useState(""); //transaction amount

  const handleSubmit = (e) => {
    e, preventDefault();
    onAdd({ id: Date.now(), desc, amount: parseFloat(amount) });
    setDesc(""); //clear form inputs after submission
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={desc}
        onChange={(e) => setAmount(e.target.value)}
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
      <button>Add</button>
    </form>
  );
}
