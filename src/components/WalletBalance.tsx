import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';

export const WalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!connection || !publicKey) return;

    const getBalance = async () => {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    };

    connection.onAccountChange(publicKey, (account) => {
      setBalance(account.lamports / LAMPORTS_PER_SOL);
    });

    getBalance();
  }, [connection, publicKey]);

  if (!publicKey) return null;

  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
      <Wallet className="w-5 h-5" />
      <span>{balance.toFixed(4)} SOL</span>
    </div>
  );
};