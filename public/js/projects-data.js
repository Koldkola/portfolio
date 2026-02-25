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
    screenshots: [
      '/assets/ai4all-Poster.jpg'
    ],
  },
  
  campdb: {
    id: 'campdb',
    
  },
  
  goodair: {
    id: 'goodair',
    video: '/assets/goodair-demo.mp4'
  },
  
  flowerml: {
    id: 'flowerml',
    
  }
  ,
  hci: {
    id: 'hci',
    screenshots: [
      'public/assets/HCI Project.pptx (1).pdf'
    ]
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
