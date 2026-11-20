import type {Metadata} from "next";
import FlagshipHome from "@/components/FlagshipHome";
import "./flagship-home.css";
export const metadata:Metadata={alternates:{canonical:"/"},title:"FLURZIHQ — Independent ideas. Shared ambition."};
export default function Home(){return <FlagshipHome/>}
