import Script from "next/script";

/**
 * Third-party marketing trackers, each gated behind an env var. IBTU has NO tracking IDs
 * yet, so nothing renders today — set the corresponding NEXT_PUBLIC_* var in Vercel and
 * the tag turns on with zero code changes. (Vercel Web Analytics + Speed Insights run
 * separately and need no ID — see app/layout.tsx.)
 *
 *   NEXT_PUBLIC_GA4_ID        e.g. G-XXXXXXXXXX   (Google Analytics 4)
 *   NEXT_PUBLIC_GTM_ID        e.g. GTM-XXXXXXX    (Google Tag Manager)
 *   NEXT_PUBLIC_META_PIXEL_ID e.g. 123456789012   (Meta / Facebook Pixel)
 */
export default function Trackers() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {gtm && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}

      {ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`}
          </Script>
        </>
      )}

      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
