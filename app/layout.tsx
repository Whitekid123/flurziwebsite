import type {Metadata,Viewport} from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./editorial.css";
import "./motion.css";
import "./home.css";
import "./brand.css";
import "./corporate.css";
import "./transformation.css";
import "./corporate-story.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteMotion from "@/components/SiteMotion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
const interTight=localFont({src:"../public/fonts/inter-tight-latin.woff2",weight:"100 900",style:"normal",variable:"--font-inter-tight",display:"swap",fallback:["Arial"]});
export const metadata:Metadata={
 title:{default:"Flurzi Limited — Technology for what comes next",template:"%s | Flurzi Limited"},
 description:"Flurzi Limited develops and manages digital platforms across workforce technology, commerce, financial commitments, entertainment and intelligent systems.",
 metadataBase:new URL("https://www.flurzi.com"),
};
export const viewport:Viewport={themeColor:"#0b2254",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en-GB" className={interTight.variable}><body><SmoothScroll/><div className="studio-site"><a href="#main" className="editorial-skip">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><SiteMotion/></div></body></html>;
}
