import { WalletButton } from './WalletButton';
import { TransactionButton } from './TransactionButton';
import { useWallet } from '@solana/wallet-adapter-react';

export const WalletCard = () => {
  const { publicKey } = useWallet();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
      <h2 className="text-xl font-semibold mb-6 text-center">
        {publicKey ? 'Send SOL' : 'Connect Your Wallet'}
      </h2>
      <div className="flex flex-col gap-4">
        <WalletButton />
        {publicKey && <TransactionButton />}
      </div>
      <p className="text-sm text-gray-400 text-center mt-4">
        {publicKey 
          ? 'Watch an ad to cover your transaction gas fees'
          : 'Connect with Phantom wallet to send SOL'}
      </p>
    </div>
  );
};