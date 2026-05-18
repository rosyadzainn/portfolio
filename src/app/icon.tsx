import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: "#fff",
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          RZ
        </span>
      </div>
    ),
    { ...size }
  );
}
