import React, { useEffect, useState } from 'react';
import { X, Star, Loader2, MessageSquare } from 'lucide-react';
import { getAssetReviews } from '@/lib/assetService';
import type { Review } from '@/types/database';

interface AssetReviewsModalProps {
  assetId: string;
  assetName: string;
  onClose: () => void;
}

export default function AssetReviewsModal({ assetId, assetName, onClose }: AssetReviewsModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      try {
        const data = await getAssetReviews(assetId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, [assetId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              Device Reviews
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{assetName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 h-full">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">No reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This asset hasn't received any feedback.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{review.rating}.0</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment ? (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                      "{review.comment}"
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-2">
                      No comment provided.
                    </p>
                  )}
                  <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                    Reviewer ID: <span className="font-mono">{review.reviewer_id.substring(0, 8)}...</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}