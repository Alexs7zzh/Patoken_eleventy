(() => {
  const setLS = (k, v) => {
    try {
      localStorage.setItem(k, v)
    } catch (e) {}
  }

  const removeLS = k => {
    try {
      localStorage.removeItem(k)
    } catch (e) {}
  }

  const getLS = k => {
    try {
      return localStorage.getItem(k)
    } catch (e) {
      return null
    }
  }

  const rootElement = document.documentElement
  const mediaQueryMode = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const darkModeAttributeName = 'data-user-color-scheme'
  const darkModeStorageKey = 'user-color-scheme'

  const resetRootDarkModeAttributeAndLS = () => {
    rootElement.removeAttribute(darkModeAttributeName)
    removeLS(darkModeStorageKey)
  }

  const applyCustomDarkModeSettings = mode => {
    const currentSetting = mode || getLS(darkModeStorageKey)

    if (currentSetting) {
      if (currentSetting === mediaQueryMode)
        resetRootDarkModeAttributeAndLS()
      else
        rootElement.setAttribute(darkModeAttributeName, currentSetting)
    } else resetRootDarkModeAttributeAndLS()
  }

  const toggleCustomDarkMode = () => {
    const invertMode = mode => mode === 'dark' ? 'light' : 'dark'

    let currentSetting = getLS(darkModeStorageKey)

    if (currentSetting === null)
      currentSetting = invertMode(mediaQueryMode)
    else
      currentSetting = invertMode(currentSetting)
    
    setLS(darkModeStorageKey, currentSetting)

    return currentSetting
  }

  applyCustomDarkModeSettings()

  document.getElementById('toggle').addEventListener('click', () => {
    applyCustomDarkModeSettings(toggleCustomDarkMode())
  })

})();