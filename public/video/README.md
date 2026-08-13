# Intro video assets

Drop the files here and the home-page video section appears on the next build.
`src/components/IntroVideo.astro` checks for them at build time, so a missing
file costs the section rather than shipping a broken player.

| File | Required | Notes |
| --- | --- | --- |
| `qsortby-intro.mp4` | **yes** | H.264 / AAC. This file is the gate — no MP4, no section. |
| `qsortby-intro.webm` | no | VP9. Served first when present; roughly 30–40% smaller. |
| `qsortby-intro.jpg` | no | Poster frame, 1600×900. Without it the frame shows a plain gradient until play. |
| `qsortby-intro.vtt` | no | English captions. **Not needed for the current file** — its subtitles are burned into the picture, so they show for everyone (and can't be switched off or translated). Only add a VTT if the video is ever re-cut without them. |

## What's shipped right now

`qsortby-intro.mp4` — 1920×1080, H.264 High, AAC, **1:37**, 14 MB (≈1.1 Mbps),
faststart enabled. Subtitles burned in. `qsortby-intro.jpg` is a frame from
0:05 (the storefront grid) at 1600×900.

Two notes on this file, neither worth a re-encode on its own:

- **40 fps.** Harmless but non-standard; 30 would have been slightly smaller.
- **Colour is signalled as full-range with a `bt470bg` matrix** (`color_range=pc`,
  `color_space=bt470bg`) rather than the usual limited-range `bt709`. Browsers
  guess when primaries/transfer are absent, so colours can land slightly
  differently across Chrome and Safari. Fixing it properly means re-encoding,
  which would cost quality at this bitrate — worth doing only on the next re-cut,
  by adding `-color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709`
  to the encode below.

Renaming any of these breaks the match: the base name `qsortby-intro` is
hard-coded in the component.

---

## Size and format

| | Target | Why |
| --- | --- | --- |
| Aspect ratio | **16:9, exactly** | The frame is `aspect-ratio: 16/9` with `object-fit: cover`, so anything else gets **cropped**, not letterboxed. A 4:5 or 1:1 master loses its top and bottom. |
| Resolution | **1920×1080** | The player is `max-width: 900px`. 1080p is already ~2× that, so it's crisp on a retina display. **4K is pure waste** — four times the bytes for pixels the frame can never show. |
| Frame rate | **30 fps** | Screen recordings gain nothing from 60 and it roughly doubles the bitrate. Keep 60 only if there's real motion footage. |
| MP4 size | **20–30 MB for ~2 min** | ≈1.5–2 Mbps. UI recordings are mostly static frames, so they compress well — but push much below this and on-screen text smears whenever the view scrolls. |
| Poster | 1600×900 JPEG, ~150–250 KB | Shown before play; it's the only thing most visitors ever load from this folder. |

`preload="none"` means nobody downloads the video until they press play, so the
file size is paid by interested visitors only. It is still served straight from
Netlify's CDN with no transcoding, so a 100 MB file punishes exactly the people
who were most interested.

## Encoding

From whatever master you have (`master.mov` below). The scale/pad is a no-op when
the source is already 16:9 1080p, and a safety net when it isn't:

```bash
# MP4 — the required file. faststart lets playback begin before the full
# download, which matters for a self-hosted file with no streaming server.
ffmpeg -i master.mov \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 22 -preset slow \
  -c:a aac -b:a 128k -ac 2 -movflags +faststart \
  qsortby-intro.mp4

# WebM — optional, served first when present.
ffmpeg -i master.mov \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,fps=30" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -pix_fmt yuv420p \
  -c:a libopus -b:a 96k \
  qsortby-intro.webm

# Poster — grab a frame that shows the product, not a title card or a fade.
ffmpeg -ss 3 -i master.mov -frames:v 1 -vf "scale=1600:900" -q:v 3 \
  qsortby-intro.jpg
```

Check the result with `ls -lh`. Over budget → raise `-crf` (22 → 24); text
looking soft on scroll → lower it (22 → 20). Every step of 2 is roughly a 25%
change in size.

## If the master isn't 16:9

Don't pad it into a 16:9 box here — that bakes black bars into the file and they
show up in the poster too. Say so instead and the frame can be switched to
`object-fit: contain` with a matching background, or given the master's own
aspect ratio.
