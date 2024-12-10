import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { AdModal } from '../ads/AdModal';
import { TransactionForm } from './TransactionForm';

export const TransactionButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [showAd, setShowAd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTx, setPendingTx] = useState<{
    recipient: string;
    amount: number;
    skipAd?: boolean;
  } | null>(null);

  const handleTransaction = async (recipient: string, amount: number, skipAd: boolean = false) => {
    if (!publicKey) return;
    setPendingTx({ recipient, amount, skipAd });
    if (skipAd) {
      processTransaction();
    } else {
      setShowAd(true);
    }
  };

  const processTransaction = async () => {
    if (!publicKey || !pendingTx) return;
    setIsLoading(true);

    try {
      const recipientPubKey = new PublicKey(pendingTx.recipient);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: pendingTx.amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      alert('Transaction successful!');
      setPendingTx(null);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
      setShowAd(false);
    }
  };

  return (
    <>
      <TransactionForm 
        onSubmit={(recipient, amount) => handleTransaction(recipient, amount, false)}
        onSkipAd={(recipient, amount) => handleTransaction(recipient, amount, true)}
        isLoading={isLoading}
      />

      {showAd && (
        <AdModal
          onComplete={() => {
            processTransaction();
          }}
          onSkip={() => {
            setShowAd(false);
            if (pendingTx) {
              handleTransaction(pendingTx.recipient, pendingTx.amount, true);
            }
          }}
          onClose={() => {
            setShowAd(false);
            setPendingTx(null);
          }}
        />
      )}
    </>
  );
};