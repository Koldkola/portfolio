# Project Media Setup Guide

## How to Add Photos & Videos to Your Portfolio

Your portfolio now uses a centralized media configuration file, making it **super easy** to add, update, or swap out project photos and videos without touching the HTML.

---

## Quick Start

### 1. Prepare Your Files

Organize your project media in: `public/assets/projects/`

For each project, you'll need:
- **1 thumbnail image** (main card preview)
- **3+ screenshots** (project details gallery)
- **1 video file** (optional demo video)

**Example structure:**
```
public/assets/projects/
├── ai4all-thumb.jpg
├── ai4all-screenshot1.jpg
├── ai4all-screenshot2.jpg
├── ai4all-screenshot3.jpg
├── ai4all-demo.mp4
├── campdb-thumb.jpg
├── campdb-screenshot1.jpg
├── campdb-screenshot2.jpg
├── campdb-screenshot3.jpg
├── campdb-demo.mp4
└── ... (same for other projects)
```

### 2. Edit the Media Config

Open: `public/js/projects-data.js`

This file lists all your projects and their media files. Update the paths to match your filenames:

```javascript
const projectsMedia = {
  ai4all: {
    id: 'ai4all',
    thumbnail: '/assets/projects/ai4all-thumb.jpg',
    screenshots: [
      '/assets/projects/ai4all-screenshot1.jpg',
      '/assets/projects/ai4all-screenshot2.jpg',
      '/assets/projects/ai4all-screenshot3.jpg'
    ],
    video: '/assets/projects/ai4all-demo.mp4'
  },
  // ... more projects
};
```

**That's it!** The HTML will automatically load and display your media.

---

## File Naming Conventions

To keep things organized, follow this naming pattern:

```
{projectid}-thumb.jpg           → Main card thumbnail
{projectid}-screenshot1.jpg     → Gallery image 1
{projectid}-screenshot2.jpg     → Gallery image 2
{projectid}-screenshot3.jpg     → Gallery image 3 (add more if needed)
{projectid}-demo.mp4            → Demo video (optional)
```

---

## Image Recommendations

| File Type | Recommended Size | Format |
|-----------|-----------------|--------|
| Thumbnail | 300×200px | JPG or PNG |
| Screenshots | 600×400px or larger | JPG or PNG |
| Demo Videos | 16:9 aspect ratio | MP4 |

**Tips:**
- Use **JPG** for photos and captures (smaller file size)
- Use **PNG** for graphics/diagrams (lossless)
- Compress images before uploading to keep page load times fast
- For MP4 videos, aim for 5-30 seconds for best UX

---

## How It Works

1. The HTML galleries are now **empty templates** with `data-project` attributes
2. When the page loads, JavaScript reads `projects-data.js`
3. It automatically populates galleries with your images and videos
4. **No more HTML editing needed!** Just update the `projects-data.js` file

---

## Common Tasks

### Add a New Project
1. Add new project section to `projects.html`
2. Add entry to `projectsMedia` in `projects-data.js`:
   ```javascript
   mynewproject: {
     id: 'mynewproject',
     thumbnail: '/assets/projects/mynewproject-thumb.jpg',
     screenshots: ['/assets/projects/mynewproject-screenshot1.jpg', ...],
     video: '/assets/projects/mynewproject-demo.mp4'
   }
   ```
3. Upload images/videos to `public/assets/projects/`

### Update Project Media
Just change the file path in `projects-data.js` and upload the new file!

### Remove a Video
Set the `video` property to an empty string or remove it:
```javascript
video: ''  // or omit entirely
```

### Add More Screenshots
Add more items to the `screenshots` array:
```javascript
screenshots: [
  '/assets/projects/ai4all-screenshot1.jpg',
  '/assets/projects/ai4all-screenshot2.jpg',
  '/assets/projects/ai4all-screenshot3.jpg',
  '/assets/projects/ai4all-screenshot4.jpg'  // ← new one
]
```

---

## Troubleshooting

**Images not showing?**
- Check the file path matches exactly (case-sensitive on Linux/Mac)
- Ensure images are in `public/assets/projects/`
- Open browser DevTools (F12) → Console to see any errors

**Videos not playing?**
- Ensure video is MP4 format
- Check file path is correct
- Videos must be in `public/assets/projects/`

**Still having issues?**
- Make sure `projects-data.js` is loaded before `projects.js`
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
