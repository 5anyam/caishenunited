'use client';

import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { toast } from '../hooks/use-toast';

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

      toast({ title: 'Thank you', description: 'Review submitted successfully' });
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
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onChange?.(star)}
          className={`${interactive ? 'cursor-pointer hover:opacity-70' : 'cursor-default'} transition-opacity`}
          aria-label={`Rate ${star}`}
          disabled={!interactive}
        >
          {star <= rating ? (
            <StarIcon className="h-4 w-4 text-gray-900" />
          ) : (
            <StarOutlineIcon className="h-4 w-4 text-gray-300" />
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
    <section className="bg-white border-t border-gray-200">
      {/* Header */}
      <div className="py-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
          Customer Reviews
        </h2>
        <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
        <div className="flex items-center justify-center gap-4 mb-2">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-sm font-light text-gray-900">
            {averageRating > 0 ? averageRating.toFixed(1) : '0.0'} out of 5
          </span>
        </div>
        <p className="text-xs text-gray-500 font-light">
          Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Toggle Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="inline-block px-8 py-3 text-xs text-white bg-black hover:bg-gray-800 transition-colors tracking-widest uppercase font-light"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={submitReview} className="mb-12 p-8 border border-gray-200 space-y-6 bg-gray-50">
            <h3 className="text-lg font-light text-gray-900 tracking-wide">Share Your Experience</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.reviewer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((s) => ({ ...s, reviewer: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none text-sm font-light transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  value={formData.reviewer_email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((s) => ({ ...s, reviewer_email: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none text-sm font-light transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">Rating *</label>
              <StarRating
                rating={formData.rating}
                onChange={(v: number) => setFormData((s) => ({ ...s, rating: v }))}
                interactive
              />
            </div>

            <div>
              <label className="block text-xs font-light text-gray-600 mb-2 uppercase tracking-widest">Your Review *</label>
              <textarea
                required
                value={formData.review}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData((s) => ({ ...s, review: e.target.value }))
                }
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none text-sm resize-none font-light transition-colors"
                placeholder="Tell us about your experience..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-8 py-3 text-xs text-white bg-black hover:bg-gray-800 transition-colors tracking-widest uppercase font-light ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}

        {/* Reviews */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-900 border-t-transparent mx-auto"></div>
            <p className="text-gray-600 text-sm mt-4 font-light">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center border border-gray-200 mb-12">
            <p className="text-gray-900 text-lg font-light mb-2">No Reviews Yet</p>
            <p className="text-gray-600 text-sm font-light">Be the first to review {productName}</p>
          </div>
        ) : (
          <div className="space-y-px border-t border-gray-200 mb-12">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="p-6 sm:p-8 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-light text-sm">
                      {(r.reviewer || 'A')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-light text-gray-900 text-sm">
                        {r.reviewer || 'Anonymous'}
                      </p>
                      <CheckBadgeIcon className="h-4 w-4 text-gray-600" title="Verified" />
                    </div>
                    <StarRating rating={r.rating || 0} />
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-light">
                  {stripHtml(r.review || '')}
                </p>

                {Array.isArray(r.images) && r.images.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {r.images.map((src, i) => (
                      <img
                        key={`${r.id}-${i}`}
                        src={src}
                        alt="Review"
                        className="w-full h-24 sm:h-28 object-cover border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
