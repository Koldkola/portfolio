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
});
