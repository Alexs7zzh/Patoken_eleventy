(() => {
  const headings = [...document.querySelectorAll('article div.info')]
  let current = null

  const callback = e => {
    e.forEach(i => {
      if (i.isIntersecting === true && i.boundingClientRect.top >= 10) {
        Array.from(document.querySelectorAll('.post-list a')).forEach(i => i.classList.remove('active'))
        current = document.querySelector(`.post-list a[href="#${i.target.parentElement.id}"]`)
        current.classList.add('active')
      } else if (i.boundingClientRect.top >= 10 && current && i.target.parentElement.id === current.getAttribute('href').replace(/^#/, '')) {
        current.classList.remove('active')
        const previous = current.parentElement.previousElementSibling && current.parentElement.previousElementSibling.querySelector('a')
        if (previous) {
          current = previous
          previous.classList.add('active')
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
})();