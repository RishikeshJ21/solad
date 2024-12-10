import { Coins } from 'lucide-react';
import { WalletBalance } from '../wallet/WalletBalance';

export const Header = () => {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center space-x-2">
        <Coins className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold">Solana Wallet</h1>
      </div>
      <WalletBalance />
    </div>
  );
};