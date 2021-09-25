(function() {
  const zoom = e => {
    let node = e.target
    while (node.tagName !== 'FIGURE') node = node.parentNode
    const clone = node.cloneNode(true)
    for (let source of clone.getElementsByTagName('source'))
      source.setAttribute('sizes', '(max-width: 648px) 100vw, 80vw')
    const imagebox = document.getElementById('imagebox')
    imagebox.appendChild(clone)
    imagebox.classList.add('show')
  }

  const images = document.getElementsByTagName('figure')
  for (const img of images)
    img.addEventListener('click', zoom)

  document.getElementById('imagebox').addEventListener('click', e => {
    let node = e.target
    while (node.id !== 'imagebox') node = node.parentNode
    node.classList.remove('show')
    node.innerHTML = ''
  })

})()