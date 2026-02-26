document.addEventListener('DOMContentLoaded', ()=>{
  function showDetail(id){
    document.querySelectorAll('.project-detail').forEach(el=>el.classList.remove('active'));
    const detail = document.getElementById(id);
    if(detail){
      detail.classList.add('active');
      document.getElementById('projects-grid')?.classList.add('hidden-grid');
      // scroll into view
      detail.scrollIntoView({behavior:'smooth'});
    }
  }

  function showAll(){
    document.querySelectorAll('.project-detail').forEach(el=>el.classList.remove('active'));
    document.getElementById('projects-grid')?.classList.remove('hidden-grid');
  }

  // Attach to links
  document.querySelectorAll('a[data-project-id]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('data-project-id');
      if(id) showDetail(id);
    });
  });

  document.querySelectorAll('.back-to-all').forEach(b=>b.addEventListener('click', (e)=>{e.preventDefault(); showAll();}));

  // =========================================
  // TAB SWITCHING FUNCTIONALITY
  // =========================================
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetContent = document.getElementById(`${targetTab}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // =========================================
  // CAROUSEL FUNCTIONALITY
  // =========================================
  
  function initCarousel(containerId, prevBtnId, nextBtnId) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 320; // Width of card + gap
    
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Update button visibility based on scroll position
    const updateButtonStates = () => {
      prevBtn.style.opacity = container.scrollLeft > 0 ? '1' : '0.5';
      prevBtn.style.pointerEvents = container.scrollLeft > 0 ? 'auto' : 'none';
      
      const hasMore = container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
      nextBtn.style.opacity = hasMore ? '1' : '0.5';
      nextBtn.style.pointerEvents = hasMore ? 'auto' : 'none';
    };
    
    container.addEventListener('scroll', updateButtonStates);
    window.addEventListener('resize', updateButtonStates);
    
    // Initial state
    updateButtonStates();
  }
  
  // Initialize both carousels
  initCarousel('projects-grid', 'prevBtn', 'nextBtn');
  initCarousel('class-projects-grid', 'classPrevBtn', 'classNextBtn');
});
