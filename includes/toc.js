(function() {
  const headings = [...document.querySelectorAll('article div.info')]
  const anchors = [...document.querySelectorAll('.post-list a')]
  let current = document.querySelector('.post-list a')
  current.classList.add('active')
  
  const callback = e => {
    e.forEach(i => {
      if (i.isIntersecting === true && i.boundingClientRect.top >= 10) {
        if (current) current.classList.remove('active')
        current = anchors.filter(a => a.getAttribute('href') === `#${i.target.parentElement.id}`)[0]
        current.classList.add('active')
      } else if (i.boundingClientRect.top >= 10 && current && i.target.parentElement.id === current.getAttribute('href').replace(/^#/, '')) {
        current.classList.remove('active')
        let previous = anchors.indexOf(current) - 1
        if (previous >= 0) {
          current = anchors[previous]
          current.classList.add('active')
        }
      }
    })
  }

  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  })

  headings.forEach(i => observer.observe(i))
})()