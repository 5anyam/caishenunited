'use client';

import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { toast } from '../hooks/use-toast';
import { Crown, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  date_created?: string;
  reviewer: string;
  reviewer_email?: string;
  review: string;
  rating: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

interface ApiMetaItem {
  key: string;
  value: unknown;
}
interface ApiReview {
  id: number;
  date_created?: string;
  reviewer?: string;
  reviewer_email?: string;
  review?: string;
  rating?: number;
  meta_data?: ApiMetaItem[];
}

const isApiMetaItem = (m: unknown): m is ApiMetaItem =>
  typeof m === 'object' &&
  m !== null &&
  'key' in m &&
  'value' in m &&
  typeof (m as Record<string, unknown>).key === 'string';

const isApiReview = (r: unknown): r is ApiReview =>
  typeof r === 'object' &&
  r !== null &&
  typeof (r as Record<string, unknown>).id === 'number';

const stripHtml = (html: string): string => {
  if (!html) return '';
  const noP = html.replace(/<\/?p[^>]*>/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
  const text = noP.replace(/<[^>]+>/g, '');
  return text.replace(/\n{3,}/g, '\n\n').trim();
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    reviewer: string;
    reviewer_email: string;
    review: string;
    rating: number;
  }>({
    reviewer: '',
    reviewer_email: '',
    review: '',
    rating: 0,
  });

  const API_BASE = 'https://cms.edaperfumes.com/wp-json/wc/v3';
  const CONSUMER_KEY = 'ck_b1a13e4236dd41ec9b8e6a1720a69397ddd12da6';
  const CONSUMER_SECRET = 'cs_d8439cfabc73ad5b9d82d1d3facea6711f24dfd1';

  useEffect(() => {
    if (productId) {
      void loadReviews();
    }
  }, [productId]);

  const parseImageUrlsFromMeta = (meta?: ApiMetaItem[]): string[] | undefined => {
    if (!Array.isArray(meta)) return undefined;
    const urlsItem = meta.find((m) => isApiMetaItem(m) && m.key === 'amraj_review_image_urls');
    if (!urlsItem) return undefined;
    const v = urlsItem.value;
    if (Array.isArray(v) && v.every((x) => typeof x === 'string')) {
      return v as string[];
    }
    return undefined;
  };

  const loadReviews = async (): Promise<void> => {
    try {
      setLoading(true);

      const url =
        `${API_BASE}/products/reviews?product=${productId}` +
        `&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}` +
        `&per_page=100&status=approved`;

      const res = await fetch(url);
      if (!res.ok) {
        setReviews([]);
        return;
      }

      const data: unknown = await res.json();
      const list: ApiReview[] = Array.isArray(data) ? data.filter(isApiReview) : [];

      const mapped: Review[] = list.map((rev) => {
        const images = parseImageUrlsFromMeta(rev.meta_data);
        return {
          id: rev.id,
          reviewer: rev.reviewer ? String(rev.reviewer) : 'Anonymous',
          reviewer_email: rev.reviewer_email ? String(rev.reviewer_email) : undefined,
          review: stripHtml(rev.review ? String(rev.review) : ''),
          rating: typeof rev.rating === 'number' ? rev.rating : 0,
          date_created: rev.date_created ? String(rev.date_created) : undefined,
          images,
        };
      });

      setReviews(mapped);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formData.reviewer || !formData.review || formData.rating === 0) {
      toast({
        title: 'Error',
        description: 'Please fill all fields and select a rating',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      const url =
        `${API_BASE}/products/reviews?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

      const payload = {
        product_id: productId,
        review: formData.review,
        reviewer: formData.reviewer,
        reviewer_email: formData.reviewer_email || '',
        rating: formData.rating,
        status: 'approved',
      } as const;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errTxt = await res.text();
        throw new Error(errTxt || 'Failed to submit review');
      }

      toast({ 
        title: '✨ Thank you', 
        description: 'Your review has been submitted successfully' 
      });
      setFormData({ reviewer: '', reviewer_email: '', review: '', rating: 0 });
      setShowForm(false);
      await loadReviews();
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({
    rating,
    onChange,
    interactive = false,
  }: {
    rating: number;
    onChange?: (value: number) => void;
    interactive?: boolean;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onChange?.(star)}
          className={`${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } transition-all duration-300`}
          aria-label={`Rate ${star}`}
          disabled={!interactive}
        >
          {star <= rating ? (
            <StarIcon className="h-5 w-5 text-[#D4AF37] drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
          ) : (
            <StarOutlineIcon className="h-5 w-5 text-gray-300 hover:text-[#D4AF37]/50 transition-colors" />
          )}
        </button>
      ))}
    </div>
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce<number>((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      {/* Premium Header */}
      <div className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#F5E6D3]/10 via-transparent to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Customer Reviews
          </h2>
          
          <div className="relative w-20 h-px mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-3">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-lg font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">
              {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
            </span>
            <span className="text-sm font-light text-gray-600">out of 5</span>
          </div>
          <p className="text-xs text-gray-500 font-light">
            Based on <span className="text-[#D4AF37] font-medium">{reviews.length}</span> verified review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Premium Toggle Button */}
        <div className="mb-12 text-center">
          <button
            onClick={() => setShowForm((s) => !s)}
            className={`group relative inline-flex items-center gap-2 px-10 py-4 text-xs overflow-hidden transition-all duration-500 tracking-widest uppercase font-medium ${
              showForm
                ? 'border-2 border-gray-300 text-gray-600 hover:border-gray-400'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
            }`}
          >
            {showForm ? (
              <>
                <span className="relative z-10">Cancel</span>
              </>
            ) : (
              <>
                <Crown className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Write a Review</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </>
            )}
          </button>
        </div>

        {/* Premium Form */}
        {showForm && (
          <form 
            onSubmit={submitReview} 
            className="mb-16 p-8 lg:p-10 border border-gray-100 space-y-8 bg-white relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-xl font-light text-gray-900 tracking-wide">Share Your Experience</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-medium text-gray-600 mb-3 uppercase tracking-[0.2em]">
                    Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reviewer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((s) => ({ ...s, reviewer: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#D4AF37] focus:outline-none text-sm font-light transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-600 mb-3 uppercase tracking-[0.2em]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.reviewer_email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData((s) => ({ ...s, reviewer_email: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#D4AF37] focus:outline-none text-sm font-light transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-600 mb-3 uppercase tracking-[0.2em]">
                  Rating <span className="text-[#D4AF37]">*</span>
                </label>
                <StarRating
                  rating={formData.rating}
                  onChange={(v: number) => setFormData((s) => ({ ...s, rating: v }))}
                  interactive
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-600 mb-3 uppercase tracking-[0.2em]">
                  Your Review <span className="text-[#D4AF37]">*</span>
                </label>
                <textarea
                  required
                  value={formData.review}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData((s) => ({ ...s, review: e.target.value }))
                  }
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#D4AF37] focus:outline-none text-sm resize-none font-light transition-all duration-300"
                  placeholder="Tell us about your experience with this product..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`group relative w-full px-8 py-4 text-xs bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-widest uppercase font-bold overflow-hidden ${
                  submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </span>
                {!submitting && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
              <Crown className="absolute inset-0 m-auto w-6 h-6 text-[#D4AF37]" />
            </div>
            <p className="text-gray-600 text-sm font-light">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center border border-gray-100 mb-16 bg-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-900 text-lg font-light mb-2">No Reviews Yet</p>
              <p className="text-gray-600 text-sm font-light">Be the first to review <span className="text-[#D4AF37]">{productName}</span></p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mb-16">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="group p-6 lg:p-8 border border-gray-100 bg-white hover:border-[#D4AF37]/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5E6D3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
                      <span className="text-black font-medium text-base">
                        {(r.reviewer || 'A')[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-gray-900 text-sm">
                          {r.reviewer || 'Anonymous'}
                        </p>
                        <CheckBadgeIcon className="h-4 w-4 text-[#D4AF37]" title="Verified Purchase" />
                      </div>
                      <StarRating rating={r.rating || 0} />
                      {r.date_created && (
                        <p className="text-xs text-gray-500 font-light mt-2">
                          {new Date(r.date_created).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-light pl-16">
                    {stripHtml(r.review || '')}
                  </p>

                  {Array.isArray(r.images) && r.images.length > 0 && (
                    <div className="mt-6 pl-16 grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {r.images.map((src, i) => (
                        <div key={`${r.id}-${i}`} className="relative group/img overflow-hidden">
                          <img
                            src={src}
                            alt="Review"
                            className="w-full h-28 object-cover border border-gray-200 group-hover/img:border-[#D4AF37] transition-all duration-300 cursor-pointer"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
