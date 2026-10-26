(() => {
  'use strict'

  const root = document.documentElement

  // Theme toggle: explicit choice is stored, otherwise follow the OS setting
  const themeBtn = document.querySelector('.theme-toggle')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const currentTheme = () => root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light')

  const syncThemeLabel = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    themeBtn.setAttribute('aria-label', `Switch to ${next} theme`)
  }

  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch (e) {}
    syncThemeLabel()
  })
  prefersDark.addEventListener('change', syncThemeLabel)
  syncThemeLabel()

  // Mobile navigation
  const nav = document.getElementById('site-nav')
  const navBtn = document.querySelector('.nav-toggle')

  const setNav = open => {
    nav.classList.toggle('is-open', open)
    navBtn.setAttribute('aria-expanded', String(open))
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  }

  navBtn.addEventListener('click', () => setNav(!nav.classList.contains('is-open')))
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) setNav(false)
  })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setNav(false)
      navBtn.focus()
    }
  })

  // Highlight the nav link of the section in view
  const links = new Map(
    [...nav.querySelectorAll('a[href^="#"]')].map(a => [a.getAttribute('href').slice(1), a])
  )
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        links.forEach(a => a.removeAttribute('aria-current'))
        links.get(entry.target.id)?.setAttribute('aria-current', 'true')
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  links.forEach((_, id) => {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  })

  document.getElementById('year').textContent = new Date().getFullYear()
})()
