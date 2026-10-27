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
        // Sections without their own link name the link they belong to in data-nav
        const id = entry.target.dataset.nav || entry.target.id
        links.get(id)?.setAttribute('aria-current', 'true')
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  // The hero has no nav link; observing it clears the highlight at the top of the page
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))

  // Career line stations: always scroll to the role, even when its hash is already in the URL,
  // and mark the role you arrive at
  document.querySelectorAll('.strip a[href^="#"]').forEach(link =>
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      history.pushState(null, '', link.getAttribute('href'))
      target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' })
      document.querySelectorAll('.role.is-arrived').forEach(r => r.classList.remove('is-arrived'))
      target.classList.remove('is-arrived')
      void target.offsetWidth
      target.classList.add('is-arrived')
    })
  )

  // The route: the line behind the rider fills solid, stops it has passed light up
  const route = document.querySelector('.route')
  if (route) {
    const fill = route.querySelector('.route-fill')
    const stops = [...document.querySelectorAll('.line-wrap .stop, .terminus')]
    let ticking = false

    const update = () => {
      ticking = false
      const box = route.getBoundingClientRect()
      if (!box.height) return
      const mid = window.innerHeight / 2
      const p = Math.min(Math.max((mid - box.top) / box.height, 0), 1)
      fill.style.setProperty('--progress', p.toFixed(4))
      stops.forEach(stop => stop.classList.toggle('is-passed', stop.getBoundingClientRect().top < mid))
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
  }

  // Departure board: each digit rolls to its value in its own cell.
  // The markup already holds the final figures, so no-JS and reduced motion read them as-is.
  const flaps = document.querySelectorAll('.flap')
  if (flaps.length && !reduceMotion.matches && 'IntersectionObserver' in window) {
    const reel = '<span class="reel">' + [...'0123456789'].map(d => `<span>${d}</span>`).join('') + '</span>'
    flaps.forEach(el => {
      const value = el.textContent.trim()
      el.setAttribute('aria-label', value)
      el.innerHTML = [...value]
        .map(ch => (/\d/.test(ch) ? `<span class="cell" data-d="${ch}" aria-hidden="true">${reel}</span>` : `<span class="cell is-sym" aria-hidden="true">${ch}</span>`))
        .join('')
    })

    const board = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          board.unobserve(entry.target)
          entry.target.querySelectorAll('.cell[data-d]').forEach((cell, i) => {
            const r = cell.firstElementChild
            r.style.transitionDuration = `${900 + i * 160}ms`
            r.style.setProperty('--d', cell.dataset.d)
          })
        })
      },
      { threshold: 0.6 }
    )
    flaps.forEach(el => board.observe(el))
  }

  // Local time in Málaga, so a visitor knows when a reply is likely
  const clock = document.querySelector('.local-time')
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })
    const tick = () => (clock.textContent = `${fmt.format(new Date())} local time`)
    tick()
    clock.hidden = false
    setInterval(tick, 30000)
  }

  // Certificate lightbox. Without <dialog> support the thumbnail link opens the image in a new tab.
  const certDialog = document.querySelector('.cert-dialog')
  if (certDialog && certDialog.showModal) {
    const full = certDialog.appendChild(document.createElement('img'))
    document.querySelectorAll('.cert-thumb').forEach(link =>
      link.addEventListener('click', e => {
        e.preventDefault()
        full.src = link.href
        full.alt = link.getAttribute('aria-label').replace('View certificate: ', 'Certificate: ')
        certDialog.showModal()
      })
    )
    certDialog.querySelector('.cert-close').addEventListener('click', () => certDialog.close())
    // A click on the backdrop lands on the dialog element itself
    certDialog.addEventListener('click', e => {
      if (e.target === certDialog) certDialog.close()
    })
  }

  document.getElementById('year').textContent = new Date().getFullYear()
})()
