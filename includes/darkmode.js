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
    let currentSetting = mode || getLS(darkModeStorageKey)

    if (currentSetting && currentSetting !== mediaQueryMode)
      rootElement.setAttribute(darkModeAttributeName, currentSetting)
    else {
      resetRootDarkModeAttributeAndLS()
      currentSetting = mediaQueryMode
    }
    document.getElementById('theme-color').setAttribute('content', currentSetting === 'dark' ? '#212020' : '#fafafa')
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

  window.onload = () => {
    document.getElementById('toggle').addEventListener('click', () => {
      applyCustomDarkModeSettings(toggleCustomDarkMode())
    })
  }

})();