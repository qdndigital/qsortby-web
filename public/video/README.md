# Intro video assets

Drop the files here and the home-page video section appears on the next build.
`src/components/IntroVideo.astro` checks for them at build time, so a missing
file costs the section rather than shipping a broken player.

| File | Required | Notes |
| --- | --- | --- |
| `qsortby-intro.mp4` | **yes** | H.264 / AAC. This file is the gate — no MP4, no section. |
| `qsortby-intro.webm` | no | VP9/AV1. Served first when present; smaller for most browsers. |
| `qsortby-intro.jpg` | no | Poster frame, 16:9 (1600×900). Without it the frame shows a plain gradient until play. |
| `qsortby-intro.vtt` | no | English captions. Add them — most autoplay-blocked, sound-off viewers read rather than listen. |

Keep the MP4 under ~15 MB. It is served straight from Netlify's CDN with no
transcoding, and `preload="none"` means nobody downloads it until they press
play — but a 100 MB file still punishes the people who do.

Renaming any of these breaks the match: the base name `qsortby-intro` is
hard-coded in the component.
