function checkHash() {
    if (document.location.hash !== '') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      document.querySelectorAll('.hidden').forEach(card=> card.classList.remove('hidden'));
      document.querySelectorAll('.close-tag').forEach(button=> button.remove())
      document.querySelectorAll('.tag-select .tag').forEach(tag=>{
        const element = document.createElement('a');
        element.href= '#';
        element.classList.add('close-tag')

        if(tag.textContent.toLowerCase() === hash) tag.appendChild(element)
      })

      document.querySelectorAll('.box').forEach(item => {
          const tags = Array.from(item.childNodes).map(tag => tag.innerText).filter(tag => tag).slice(1).map(tag=>tag.toLowerCase());
          if (!tags.find(tag => tag === hash)) {
            item.classList.add('hidden')
          }
      })
    } else {
      document.querySelectorAll('.hidden').forEach(card=> card.classList.remove('hidden'));
      document.querySelectorAll('.close-tag').forEach(button=> button.remove())
    }
  }
  checkHash();
  window.onhashchange = checkHash;

  function goHome(){
    window.location.hash = ''; 
  }