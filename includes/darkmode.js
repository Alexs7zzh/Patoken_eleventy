(function() {
  const setLS = (k, v) => {
    try {
      localStorage.setItem(k, v)
    } catch (e) {
      // empty
    }
  }

  const removeLS = k => {
    try {
      localStorage.removeItem(k)
    } catch (e) {
      // empty
    }
  }

  const getLS = k => {
    try {
      return localStorage.getItem(k)
    } catch (e) {
      return null
    }
  }

  const rootElement = document.documentElement
  const darkModeAttributeName = 'data-user-color-scheme'
  const darkModeStorageKey = 'user-color-scheme'
  const colorSchemeMetaElement = document.getElementById('color-scheme')

  const getMediaQueryMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const resetRootDarkModeAttributeAndLS = () => {
    rootElement.removeAttribute(darkModeAttributeName)
    removeLS(darkModeStorageKey)
    colorSchemeMetaElement.setAttribute('content', 'dark light')
  }

  const applyCustomDarkModeSettings = mode => {
    let currentSetting = mode || getLS(darkModeStorageKey)
    const mediaQueryMode = getMediaQueryMode()

    if (currentSetting && currentSetting !== mediaQueryMode) {
      rootElement.setAttribute(darkModeAttributeName, currentSetting)
      colorSchemeMetaElement.setAttribute('content', currentSetting)
    } else {
      resetRootDarkModeAttributeAndLS()
      currentSetting = mediaQueryMode
    }
    document.getElementById('theme-color').setAttribute('content', currentSetting === 'dark' ? '#212020' : '#fafafa')
  }

  const toggleCustomDarkMode = () => {
    const invertMode = mode => mode === 'dark' ? 'light' : 'dark'

    let currentSetting = getLS(darkModeStorageKey)

    if (currentSetting === null)
      currentSetting = invertMode(getMediaQueryMode())
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

})()