import type {Platform} from "@/lib/site-content";
import EndNovelVisual from "./visuals/EndNovelVisual";
import Flurzi360Visual from "./visuals/Flurzi360Visual";
import CommitVisual from "./visuals/CommitVisual";
import FlurziXVisual from "./visuals/FlurziXVisual";
import FlurziRushVisual from "./visuals/FlurziRushVisual";
import CortexVisual from "./visuals/CortexVisual";
import CinemaVisual from "./visuals/CinemaVisual";
import StageCard from "./visuals/StageCard";

/** One believable fragment per platform — real HTML/CSS/SVG shells,
    no fake metrics. Server component; the fragment is the hero visual. */
export default function HqProductVisual({platform}:{platform:Platform}){
 switch(platform.slug){
  case "endnovel":return <EndNovelVisual/>;
  case "flurzi360":return <Flurzi360Visual/>;
  case "commit":return <CommitVisual/>;
  case "flurzix":return <FlurziXVisual/>;
  case "flurzirush":return <FlurziRushVisual/>;
  case "cortex":return <CortexVisual/>;
  case "cinema":return <CinemaVisual/>;
  default:return <StageCard category={platform.category} name={platform.name} status={platform.status}/>;
 }
}
