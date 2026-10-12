import type {Platform} from "@/lib/site-content";

/** Art-direct the supplied square artwork for phones; retain the desktop wordmark. */
export default function PlatformArtwork({platform, preview = false}: {platform: Platform; preview?: boolean}) {
  const art = platform.brandArtwork;
  const width = preview ? (art?.thumbnailWidth ?? (art ? 480 : 1440)) : (art?.width ?? 1440);
  const height = preview ? (art?.thumbnailHeight ?? (art ? 480 : 1040)) : (art?.height ?? 1040);
  return <picture className={"platform-artwork" + (art?.mobileArtwork ? " platform-artwork-mobile" : "")}>
    {art?.mobileArtwork && <source media="(max-width: 600px)" srcSet={art.mobileArtwork + "-640.webp 640w, " + art.mobileArtwork + "-1280.webp 1280w"} sizes="100vw" width={1280} height={1280}/>}
    <img src={preview ? (art?.thumbnail ?? platform.image) : platform.image} alt={platform.imageCaption} width={width} height={height} loading="lazy" decoding="async"/>
  </picture>;
}
