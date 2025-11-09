import './styles/globals.css';
import ReactQueryProvider from '../../components/ReactQueryProvider';
import { CartProvider } from '../../lib/cart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Script from 'next/script';
import AnnouncementBar from '../../components/anouncement';
import Whatsapp from '../../components/Whatsapp';
import { ThemeProvider } from '../../components/ThemeProvider';

export const metadata = {
  title: 'Caishen United - Premium Phone Cases & Accessories | Military-Grade Protection',
  description: 'Discover Caishen United\'s collection of premium phone cases and accessories. Military-grade protection meets timeless design. Shop iPhone, Samsung, OnePlus cases and more with lifetime warranty.',
  keywords: 'premium phone cases, luxury phone covers, iPhone cases India, Samsung cases, military grade phone protection, designer phone cases, phone accessories, premium mobile covers, shock proof cases, wireless chargers, screen protectors, Caishen United',
  openGraph: {
    title: 'Caishen United - Premium Phone Cases & Accessories',
    description: 'Military-grade protection meets timeless design. Premium phone cases and accessories for iPhone, Samsung, OnePlus, and more.',
    url: 'https://caishenunited.com',
    siteName: 'Caishen United',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Caishen United - Premium Phone Protection',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caishen United - Premium Phone Cases & Accessories',
    description: 'Military-grade protection meets timeless design. Premium phone protection for discerning users.',
    images: ['/logo.png'],
    creator: '@caishenunited',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://caishenunited.com',
  },
  category: 'phone accessories',
  classification: 'Electronics & Mobile Accessories',
  authors: [{ name: 'Caishen United' }],
  creator: 'Caishen United',
  publisher: 'Caishen United',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fbPixelId = 'YOUR_FB_PIXEL_ID';
  const gtagId = 'AW-XXXXXXXXX';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preload Critical Assets */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preload" href="/logo-video.mp4" as="video" type="video/mp4" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        
        {/* Structured Data for Premium Phone Accessories Brand */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Caishen United",
              "description": "Premium phone cases and accessories brand offering military-grade protection with timeless design",
              "url": "https://caishenunited.com",
              "logo": "https://caishenunited.com/logo.png",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Caishen United Founder"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Your City",
                "addressRegion": "Your State",
                "postalCode": "XXXXXX",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "email": "support@caishenunited.com",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.facebook.com/caishenunited",
                "https://www.instagram.com/caishenunited",
                "https://www.youtube.com/@caishenunited"
              ],
              "brand": {
                "@type": "Brand",
                "name": "Caishen United",
                "logo": "https://caishenunited.com/logo.png",
                "slogan": "Premium Protection. Timeless Design."
              },
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": [
                  {
                    "@type": "Product",
                    "name": "Premium Phone Cases",
                    "category": "Mobile Phone Accessories",
                    "brand": "Caishen United"
                  },
                  {
                    "@type": "Product",
                    "name": "Phone Accessories",
                    "category": "Mobile Phone Accessories",
                    "brand": "Caishen United"
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Product Schema for Phone Cases */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Product",
                  "position": 1,
                  "name": "Premium iPhone Cases",
                  "description": "Military-grade protection for iPhone with sophisticated design",
                  "brand": {
                    "@type": "Brand",
                    "name": "Caishen United"
                  },
                  "category": "Phone Cases"
                },
                {
                  "@type": "Product",
                  "position": 2,
                  "name": "Premium Samsung Cases",
                  "description": "Luxury phone protection for Samsung devices",
                  "brand": {
                    "@type": "Brand",
                    "name": "Caishen United"
                  },
                  "category": "Phone Cases"
                },
                {
                  "@type": "Product",
                  "position": 3,
                  "name": "Phone Accessories",
                  "description": "Premium chargers, cables, and screen protectors",
                  "brand": {
                    "@type": "Brand",
                    "name": "Caishen United"
                  },
                  "category": "Mobile Accessories"
                }
              ]
            })
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://caishenunited.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Phone Covers",
                  "item": "https://caishenunited.com/shop/covers"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Accessories",
                  "item": "https://caishenunited.com/shop/accessories"
                }
              ]
            })
          }}
        />

        {/* Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
            
            // Track premium brand specific events
            fbq('trackCustom', 'ViewPremiumBrand', {
              brand: 'Caishen United',
              category: 'Premium Phone Accessories'
            });
          `}
        </Script>

        {/* Google Analytics */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}', {
              page_title: 'Caishen United',
              page_location: window.location.href,
              content_group1: 'Premium Phone Accessories',
              content_group2: 'Electronics & Mobile',
              custom_map: {
                'dimension1': 'premium_brand',
                'dimension2': 'phone_accessories'
              }
            });
            
            // Enhanced ecommerce tracking
            gtag('config', '${gtagId}', {
              'custom_map': {'custom_parameter': 'dimension1'},
              'enhanced_ecommerce': true
            });
            
            // Track product views
            gtag('event', 'view_item_list', {
              'items': [{
                'item_name': 'Premium Phone Cases',
                'item_category': 'Phone Accessories',
                'item_brand': 'Caishen United'
              }]
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>

        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
            alt="facebook pixel"
          />
        </noscript>
      </head>
      <body className="overflow-x-hidden overflow-y-scroll antialiased bg-white dark:bg-black transition-colors duration-300">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Wrap everything in ThemeProvider */}
        <ThemeProvider>
          <ReactQueryProvider>
            <CartProvider>
              <AnnouncementBar />
              <Header />
              <main role="main" className="min-h-screen">
                {children}
              </main>
              <Footer />
              <Whatsapp/>
            </CartProvider>
          </ReactQueryProvider>
        </ThemeProvider>

        {/* Customer Chat Plugin */}
        <Script id="facebook-chat" strategy="lazyOnload">
          {`
            var chatbox = document.getElementById('fb-customer-chat');
            if(chatbox) {
              chatbox.setAttribute("page_id", "YOUR_PAGE_ID");
              chatbox.setAttribute("attribution", "biz_inbox");
            }
            
            window.fbAsyncInit = function() {
              FB.init({
                xfbml: true,
                version: 'v18.0'
              });
            };
            
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
        
        {/* Facebook Customer Chat */}
        <div id="fb-customer-chat" className="fb-customerchat"></div>
      </body>
    </html>
  );
}
