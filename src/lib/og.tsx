import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const PAPER = "#fafaf9";
const INK = "#0c0806";
const MUTED = "#5c534d";
const HAIRLINE = "rgba(12, 8, 6, 0.14)";

type FontWeight = 400 | 500 | 600;
type OgFont = { name: string; data: ArrayBuffer; weight: FontWeight; style: "normal" };

const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&family=Cormorant+Garamond:wght@600";

const logoSrc = readFile(join(process.cwd(), "public/logo-mark.png"), "base64").then(
  (data) => `data:image/png;base64,${data}`,
);

// Google serves TTF (which Satori needs) to clients without a browser user agent.
async function loadFonts(): Promise<OgFont[]> {
  try {
    const css = await fetch(FONT_CSS, { signal: AbortSignal.timeout(8000) }).then((res) => {
      if (!res.ok) throw new Error(`Font CSS ${res.status}`);
      return res.text();
    });
    const faces = [...css.matchAll(/font-family:\s*'([^']+)';[\s\S]*?font-weight:\s*(\d+);[\s\S]*?src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype|woff)'\)/g)];
    return await Promise.all(
      faces.map(async ([, name, weight, url]) => {
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(`Font ${res.status}`);
        return { name, data: await res.arrayBuffer(), weight: Number(weight) as FontWeight, style: "normal" as const };
      }),
    );
  } catch {
    return [];
  }
}

let fontsPromise: Promise<OgFont[]> | undefined;

export type OgImageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export async function renderOgImage({ eyebrow, title, subtitle }: OgImageProps) {
  fontsPromise ??= loadFonts();
  const [fonts, logo] = await Promise.all([fontsPromise, logoSrc]);
  if (fonts.length === 0) fontsPromise = undefined;

  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "64px 80px 56px",
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
          <img src={logo} width={55} height={45} alt="" />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "Cormorant Garamond",
              fontWeight: 600,
              fontSize: 40,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            ASAUV<span style={{ letterSpacing: "0.01em" }}>i</span>A
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 500,
              color: MUTED,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "block",
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
              lineClamp: 3,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "block",
              fontSize: subtitle.length > 72 ? 25 : 28,
              lineHeight: 1.35,
              color: MUTED,
              marginTop: 28,
              maxWidth: 1040,
              lineClamp: 2,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, background: HAIRLINE, marginBottom: 22 }} />
          <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 22, fontWeight: 500, color: MUTED }}>
            asauvia.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
