import type { MetadataRoute } from 'next';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `https://www.caishenunited.com/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `https://www.caishenunited.com/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/shipping`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/returns-and-refunds-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/product/advanced-prostate-care`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/product/weight-management-pro`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `https://www.caishenunited.com/product/advanced-liver-detox`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  return [...staticPages];
}
