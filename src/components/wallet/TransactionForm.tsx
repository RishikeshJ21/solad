import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { ArrowRight, Wallet } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (recipient: string, amount: number) => void;
  onSkipAd: (recipient: string, amount: number) => void;
  isLoading: boolean;
}

export const TransactionForm = ({ onSubmit, onSkipAd, isLoading }: TransactionFormProps) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const validateAndProcess = (callback: (recipient: string, amount: number) => void) => {
    setError('');

    try {
      new PublicKey(recipient);
      const parsedAmount = parseFloat(amount);
      
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      callback(recipient, parsedAmount);
    } catch (err) {
      setError('Invalid Solana address');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndProcess(onSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-2">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="input-field"
            placeholder="Enter Solana address"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
            Amount (SOL)
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder="0.00"
              disabled={isLoading}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading || !recipient || !amount}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              Watch Ad & Skip Gas Fee
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        
        <button
          type="button"
          disabled={isLoading || !recipient || !amount}
          onClick={() => validateAndProcess(onSkipAd)}
          className="btn-secondary flex-1"
        >
          Pay Gas Fee
        </button>
      </div>
    </form>
  );
};