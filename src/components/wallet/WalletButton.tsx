import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const WalletButton = () => {
  const { wallet } = useWallet();

  return (
    <div className="wallet-button">
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition-colors" />
      {wallet && (
        <p className="text-sm text-gray-400 mt-2">
          Connected to {wallet.adapter.name}
        </p>
      )}
    </div>
  );
};