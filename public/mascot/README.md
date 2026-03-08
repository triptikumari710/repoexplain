# Mascot Videos

This folder contains the animated mascot videos for RepoExplain.

## Required Videos

Place the following video files in this directory:

1. **idle.mp4** - Mascot floating and waiting (loops continuously)
2. **scanning.mp4** - Mascot scanning a GitHub repository (loops during analysis)
3. **celebrating.mp4** - Mascot celebrating after analysis (plays once)

## Video Specifications

For optimal performance, ensure your videos meet these specifications:

- **Format:** MP4 (H.264 codec)
- **Resolution:** 512x512px or 1024x1024px (square aspect ratio)
- **Duration:** 
  - idle.mp4: 2-4 seconds
  - scanning.mp4: 2-3 seconds
  - celebrating.mp4: 2-3 seconds
- **File Size:** Keep under 2MB per video for fast loading
- **Frame Rate:** 30fps
- **Background:** Transparent (if possible) or solid color

## Video Optimization Tips

To optimize your videos for web:

```bash
# Using FFmpeg to compress and optimize
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -strict -2 -crf 28 -preset slow output.mp4

# To reduce file size further
ffmpeg -i input.mp4 -vf scale=512:512 -c:v libx264 -crf 28 -preset slow output.mp4
```

## Creating Placeholder Videos

If you don't have videos yet, you can create simple placeholder animations using:
- **Lottie animations** converted to video
- **Rive animations** exported as video
- **After Effects** or **Blender** for custom animations
- **AI video generators** like Runway ML or Pika Labs

## Current Status

⚠️ **Videos not yet added** - The component will show a fallback if videos are missing.

Once you add the videos, the mascot will automatically display them based on the application state.
