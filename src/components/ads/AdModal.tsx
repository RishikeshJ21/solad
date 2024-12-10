import { FC, useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AdModalProps {
  onComplete: () => void;
  onClose: () => void;
  onSkip: () => void;
}

export const AdModal: FC<AdModalProps> = ({ onComplete, onClose, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        if (prev <= 10) {
          setCanSkip(true);
        }
        return prev - 1;
      });
    }, 1000);

    // Initialize Google AdSense ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 glass-morphism">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Watch Ad to Cover Gas Fee
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="aspect-video bg-gray-700/50 rounded-xl mb-6 overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
               data-ad-slot="YOUR_AD_SLOT_ID"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
        
        <div className="mb-6">
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">
            Watch this ad to cover your transaction gas fees. Time remaining: {timeLeft}s
          </p>
        </div>

        <div className="flex gap-3">
          {canSkip && (
            <button
              onClick={onSkip}
              className="btn-secondary flex-1"
            >
              Skip Ad & Pay Gas Fee
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );
};