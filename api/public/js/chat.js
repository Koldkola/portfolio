(function(){
  const toggle = document.getElementById('chat-toggle');
  const widget = document.getElementById('chat-widget');
  const closeBtn = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const log = document.getElementById('chat-log');

  if(!toggle || !widget) return;

  toggle.addEventListener('click', ()=> widget.classList.toggle('hidden'));
  closeBtn?.addEventListener('click', ()=> widget.classList.add('hidden'));

  function appendMessage(text, cls){
    const div = document.createElement('div');
    div.className = 'msg ' + (cls||'');
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const value = input.value.trim();
    if(!value) return;
    appendMessage(value, 'user');
    input.value = '';
    appendMessage('… thinking', 'bot');

    try{
      const resp = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message:value})});
      const data = await resp.json();
      // remove the 'thinking' placeholder
      const placeholder = [...log.querySelectorAll('.msg.bot')].pop();
      if(placeholder) placeholder.remove();

      if(data?.reply) appendMessage(data.reply, 'bot');
      else appendMessage('Sorry, something went wrong.', 'bot');
    }catch(err){
      console.error(err);
      appendMessage('Network error — try again later.', 'bot');
    }
  });
})();
