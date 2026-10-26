(() => {
  'use strict'

  const root = document.documentElement
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  // Theme toggle: explicit choice is stored, otherwise follow the OS setting
  const themeBtn = document.querySelector('.theme-toggle')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const currentTheme = () => root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light')

  const syncThemeLabel = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    themeBtn.setAttribute('aria-label', `Switch to ${next} theme`)
  }

  const setTheme = theme => {
    root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
    syncThemeLabel()
  }

  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    // Crossfade between themes where the View Transitions API exists
    if (document.startViewTransition && !reduceMotion.matches) {
      document.startViewTransition(() => setTheme(next))
    } else {
      setTheme(next)
    }
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

  // Hero pipeline: stages run one after another while the total counts up.
  // Static markup already shows the finished state, so no-JS and reduced motion lose nothing.
  const pipeline = document.querySelector('.pipeline')
  if (pipeline && !reduceMotion.matches) {
    const rows = [...pipeline.querySelectorAll('.pipeline-list li')]
    const total = pipeline.querySelector('.pipeline-foot strong')
    const rerun = pipeline.querySelector('.pipeline-rerun')
    const STEP = 650
    const TOTAL = 3500
    let timers = []
    let frame

    const setRow = (row, state, label) => {
      row.dataset.state = state
      row.querySelector('.status').textContent = label
    }

    const countUp = duration => {
      const start = performance.now()
      const tick = now => {
        const t = Math.min((now - start) / duration, 1)
        // Linear on purpose: the count should track how many stages have finished
        total.textContent = Math.round(TOTAL * t).toLocaleString('en-US')
        if (t < 1) frame = requestAnimationFrame(tick)
        else total.textContent = '3,500+'
      }
      frame = requestAnimationFrame(tick)
    }

    const run = () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(frame)
      timers = []
      rerun.disabled = true
      rows.forEach(row => setRow(row, 'queued', 'queued'))
      rows.forEach((row, i) => {
        timers.push(setTimeout(() => setRow(row, 'running', 'running'), i * STEP))
        timers.push(setTimeout(() => setRow(row, 'done', 'on'), (i + 1) * STEP - 120))
      })
      timers.push(setTimeout(() => (rerun.disabled = false), rows.length * STEP))
      countUp(rows.length * STEP)
    }

    rerun.hidden = false
    rerun.addEventListener('click', run)
    run()
  }

  document.getElementById('year').textContent = new Date().getFullYear()
})()
