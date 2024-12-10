import React from 'react';
import { WalletContextProvider } from './components/WalletProvider';
import { Header } from './components/layout/Header';
import { WalletCard } from './components/wallet/WalletCard';

function App() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <div className="max-w-md mx-auto">
            <WalletCard />
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}

export default App;