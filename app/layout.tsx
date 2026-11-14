import type {Metadata,Viewport} from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./hq-tokens.css";
import "./editorial.css";
import "./motion.css";
import "./home.css";
import "./brand.css";
import "./corporate.css";
import "./transformation.css";
import "./corporate-story.css";
import "./hq-home.css";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import SmoothScroll from "@/components/SmoothScroll";
import SiteMotion from "@/components/SiteMotion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
const interTight=localFont({src:"../public/fonts/inter-tight-latin.woff2",weight:"100 900",style:"normal",variable:"--font-inter-tight",display:"swap",fallback:["Arial"]});
export const metadata:Metadata={
 title:{default:"FLURZIHQ — One company. Seven platforms.",template:"%s | FLURZIHQ"},
 description:"FLURZIHQ is the Flurzi headquarters — the parent company developing and managing digital platforms across workforce technology, commerce, financial commitments, entertainment and intelligent systems.",
 metadataBase:new URL("https://www.flurzi.com"),
 openGraph:{type:"website",siteName:"FLURZIHQ",locale:"en_GB",images:[{url:"/media/flurzi-icon.png",alt:"FLURZIHQ"}]},
 twitter:{card:"summary",images:["/media/flurzi-icon.png"]},
 robots:process.env.VERCEL_ENV==="preview"?{index:false,follow:false}:{index:true,follow:true},
};
export const viewport:Viewport={themeColor:"#0e141a",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en-GB" className={interTight.variable}><body><SmoothScroll/><div className="studio-site"><a href="#main" className="editorial-skip">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><AnalyticsConsent/><SiteMotion/></div></body></html>;
}
