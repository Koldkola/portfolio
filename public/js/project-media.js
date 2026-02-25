let allGalleryImages = [];
let currentImageIndex = 0;

function loadProjectMedia() {
  document.querySelectorAll('.media-gallery[data-project]').forEach(gallery => {
    const projectId = gallery.dataset.project;
    const project = projectsMedia[projectId];
    const galleryHeading = gallery.previousElementSibling;

    if (project && Array.isArray(project.screenshots) && project.screenshots.length > 0) {
      gallery.innerHTML = project.screenshots
        .map(src => `<img src="${src}" alt="${projectId} screenshot" class="gallery-img" />`)
        .join('');

      if (galleryHeading && galleryHeading.tagName === 'H3') {
        galleryHeading.style.display = '';
      }
      gallery.style.display = '';

      gallery.querySelectorAll('.gallery-img').forEach((img) => {
        img.addEventListener('click', () => {
          currentImageIndex = allGalleryImages.indexOf(img.src);
          openImageModal(img.src);
        });
      });
    } else {
      if (galleryHeading && galleryHeading.tagName === 'H3') {
        galleryHeading.style.display = 'none';
      }
      gallery.style.display = 'none';
    }
  });

  allGalleryImages = Array.from(document.querySelectorAll('.gallery-img')).map(img => img.src);

  document.querySelectorAll('.video-container[data-project]').forEach(container => {
    const projectId = container.dataset.project;
    const project = projectsMedia[projectId];
    const videoHeading = container.previousElementSibling;

    if (project && project.video) {
      container.innerHTML = `<video width="100%" height="auto" controls style="border-radius: 8px;">
        <source src="${project.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>`;
      if (videoHeading && videoHeading.tagName === 'H3') {
        videoHeading.style.display = '';
      }
      container.style.display = '';
    } else {
      if (videoHeading && videoHeading.tagName === 'H3') {
        videoHeading.style.display = 'none';
      }
      container.style.display = 'none';
    }
  });
}

function openImageModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const counter = document.getElementById('modalCounter');
  if (!modal || !modalImage || !counter) return;

  modalImage.src = src;
  counter.textContent = `${currentImageIndex + 1} / ${allGalleryImages.length}`;
  modal.classList.add('active');
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) modal.classList.remove('active');
}

function nextImage() {
  if (!allGalleryImages.length) return;
  currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
  document.getElementById('modalImage').src = allGalleryImages[currentImageIndex];
  document.getElementById('modalCounter').textContent = `${currentImageIndex + 1} / ${allGalleryImages.length}`;
}

function prevImage() {
  if (!allGalleryImages.length) return;
  currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
  document.getElementById('modalImage').src = allGalleryImages[currentImageIndex];
  document.getElementById('modalCounter').textContent = `${currentImageIndex + 1} / ${allGalleryImages.length}`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadProjectMedia();

  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const modal = document.getElementById('imageModal');

  if (modalClose) modalClose.addEventListener('click', closeImageModal);
  if (modalPrev) modalPrev.addEventListener('click', prevImage);
  if (modalNext) modalNext.addEventListener('click', nextImage);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeImageModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    const active = modal && modal.classList.contains('active');
    if (!active) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeImageModal();
  });
});
