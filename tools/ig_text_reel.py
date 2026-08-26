#!/usr/bin/env python3
"""Burn scrolling-up text onto a vertical IG reel.
Usage: ig_text_reel.py <in.mp4> <out.mp4> <hook> [body lines separated by |]
Text goes into temp files; font/textfile paths must be single-quoted for ffmpeg.
"""
import os, subprocess, sys, tempfile

def q(p: str) -> str:
    return p.replace("\\", "/").replace(":", "\\:")

FONT = "'" + q(r"C:/Windows/Fonts/impact.ttf") + "'"

def main():
    inp, out, hook = sys.argv[1], sys.argv[2], sys.argv[3]
    body = sys.argv[4] if len(sys.argv) > 4 else ""
    tmp = tempfile.mkdtemp()
    n = [0]

    def tf(text: str) -> str:
        n[0] += 1
        p = os.path.join(tmp, f"t{n[0]}.txt")
        with open(p, "w", encoding="utf-8") as fh:
            fh.write(text)
        return "'" + q(p) + "'"

    f = []
    f.append(f"drawtext=fontfile={FONT}:textfile={tf(hook)}:fontsize=110:fontcolor=white:borderw=6:bordercolor=black:x=(w-text_w)/2:y=h-60-t*90:enable='lte(t\\,4.8)'")
    f.append("drawbox=x=0:y=0:w=iw:h=ih:color=black@0.15:t=fill")
    for i, line in enumerate(filter(None, body.split("|"))):
        y = 700 + i * 130
        f.append(f"drawtext=fontfile={FONT}:textfile={tf(line)}:fontsize=62:fontcolor=white:borderw=5:bordercolor=black:x=(w-text_w)/2:y={y}+40-t*90:enable='gte(t\\,0.3)'")
    vf = ",".join(f)
    subprocess.run(["ffmpeg", "-y", "-i", inp, "-vf", vf,
                    "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                    "-c:a", "copy", "-movflags", "+faststart", out], check=True)
    print(f"WROTE {out}")

if __name__ == "__main__":
    main()
