import type {Metadata,Viewport} from "next";
import {Inter_Tight} from "next/font/google";
import "./globals.css";
import "./editorial.css";
import "./motion.css";
import "./home.css";
import "./brand.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteMotion from "@/components/SiteMotion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
const interTight=Inter_Tight({subsets:["latin"],variable:"--font-inter-tight",display:"swap"});
export const metadata:Metadata={
 title:{default:"Flurzi — Digital products for everyday life",template:"%s | Flurzi"},
 description:"Flurzi Mobile App Limited builds SponsorSafe HR, Flurzi Commit, FlurziCinema and EndNovel. Explore our products, company and upcoming projects.",
 metadataBase:new URL("https://www.flurzi.com"),
};
export const viewport:Viewport={themeColor:"#0b2254",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en-GB" className={interTight.variable}><body><SmoothScroll/><div className="studio-site"><a href="#main" className="editorial-skip">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><SiteMotion/></div></body></html>;
}
