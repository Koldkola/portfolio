/**
 * Project Media Configuration
 * 
 * Simple format to manage all project photos and videos.
 * Update the paths below to add your project media files.
 * 
 * For each project, provide:
 * - id: matches the project section ID
 * - thumbnail: main card image
 * - screenshots: array of 3+ project screenshots/photos
 * - video: demo video file (optional)
 */

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
  
  campdb: {
    id: 'campdb',
    thumbnail: '/assets/projects/campdb-thumb.jpg',
    screenshots: [
      '/assets/projects/campdb-screenshot1.jpg',
      '/assets/projects/campdb-screenshot2.jpg',
      '/assets/projects/campdb-screenshot3.jpg'
    ],
    video: '/assets/projects/campdb-demo.mp4'
  },
  
  goodair: {
    id: 'goodair',
    thumbnail: '/assets/projects/goodair-thumb.jpg',
    screenshots: [
      '/assets/projects/goodair-screenshot1.jpg',
      '/assets/projects/goodair-screenshot2.jpg',
      '/assets/projects/goodair-screenshot3.jpg'
    ],
    video: '/assets/projects/goodair-demo.mp4'
  },
  
  flowerml: {
    id: 'flowerml',
    thumbnail: '/assets/projects/flowerml-thumb.jpg',
    screenshots: [
      '/assets/projects/flowerml-screenshot1.jpg',
      '/assets/projects/flowerml-screenshot2.jpg',
      '/assets/projects/flowerml-screenshot3.jpg'
    ],
    video: '/assets/projects/flowerml-demo.mp4'
  }
};

/**
 * INSTRUCTIONS FOR ADDING MEDIA:
 * 
 * 1. Copy your project files to: public/assets/projects/
 * 
 * 2. For each project, provide:
 *    - One thumbnail image (e.g., ai4all-thumb.jpg) - displayed on the card
 *    - 3+ screenshots (e.g., ai4all-screenshot1.jpg, ai4all-screenshot2.jpg, etc.)
 *    - One demo video, optional (e.g., ai4all-demo.mp4)
 * 
 * 3. Update the paths above to match your filenames
 * 
 * 4. File format recommendations:
 *    - Images: JPG or PNG (JPG recommended for photos, PNG for graphics)
 *    - Videos: MP4 (best browser compatibility)
 *    - Thumbnail size: ~300x200px
 *    - Screenshot size: ~600x400px or larger
 * 
 * EXAMPLE:
 * If you have files like: my-project-thumb.jpg, my-project-screenshot1.jpg, etc.
 * Update the config to:
 * 
 * myproject: {
 *   id: 'myproject',
 *   thumbnail: '/assets/projects/my-project-thumb.jpg',
 *   screenshots: [
 *     '/assets/projects/my-project-screenshot1.jpg',
 *     '/assets/projects/my-project-screenshot2.jpg'
 *   ],
 *   video: '/assets/projects/my-project-demo.mp4'
 * }
 */
