(() => {
  'use strict'

  const root = document.documentElement
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const SVG_NS = 'http://www.w3.org/2000/svg'

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
    if (!document.startViewTransition || reduceMotion.matches) {
      setTheme(next)
      return
    }
    // Shutter wipe: the new theme opens as a circle from the toggle
    const r = themeBtn.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const vt = document.startViewTransition(() => setTheme(next))
    vt.ready.then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    )
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
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')]
  const links = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]))
  const spy = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        links.forEach(a => a.removeAttribute('aria-current'))
        links.get(entry.target.id)?.setAttribute('aria-current', 'true')
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  // The hero and contact have no nav link; observing them clears the highlight
  document.querySelectorAll('main > section[id]').forEach(section => spy.observe(section))

  // Numbered exits: keys 1–6 jump to the matching nav section
  const certDialog = document.querySelector('.cert-dialog')
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || certDialog?.open) return
    if (e.target.closest('input, textarea, select, [contenteditable]')) return
    const link = navLinks[Number(e.key) - 1]
    if (!link || !/^[1-6]$/.test(e.key)) return
    const section = document.querySelector(link.getAttribute('href'))
    if (!section) return
    e.preventDefault()
    setNav(false)
    section.setAttribute('tabindex', '-1')
    section.focus({ preventScroll: true })
    section.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' })
    history.replaceState(null, '', link.getAttribute('href'))
  })

  // Station traces: a short tangled run that resolves into a straight line. Illustrative only.
  const rand = seed => () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const svgEl = (name, attrs) => {
    const el = document.createElementNS(SVG_NS, name)
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    return el
  }
  document.querySelectorAll('.station').forEach(station => {
    const svg = station.querySelector('.trace')
    const r = rand(Number(station.dataset.seed) || 1)
    const f1 = 4 + r() * 4
    const f2 = 1 + r() * 2
    const pts = []
    for (let i = 0; i <= 120; i++) {
      const t = i / 120
      const x = 4 + t * 120 + 9 * Math.sin(t * Math.PI * 2 * f1)
      const y = 30 + 12 * Math.sin(t * Math.PI * 2 * f2 + r() * 0.2) + 8 * Math.cos(t * Math.PI * 2 * f1)
      pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    const last = pts[pts.length - 1].split(' ')
    svg.append(
      svgEl('path', { class: 't-ghost', d: `M${pts.join('L')}` }),
      svgEl('path', { class: 't-line', d: `M${last[0]} ${last[1]} L214 ${last[1]}`, pathLength: 1 }),
      svgEl('circle', { class: 't-dot', cx: 214, cy: last[1], r: 3.5 })
    )
  })

  // Certificate lightbox. Without <dialog> support the thumbnail link opens the image in a new tab.
  if (certDialog && certDialog.showModal) {
    const full = document.createElement('img')
    full.alt = ''
    certDialog.append(full)
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

  // Copy email: a fallback for visitors without a mail client
  const copyBtn = document.querySelector('.copy-mail')
  if (copyBtn && navigator.clipboard) {
    const label = copyBtn.querySelector('.copy-label')
    const status = document.querySelector('.copy-status')
    let timer
    copyBtn.hidden = false
    copyBtn.addEventListener('click', async () => {
      clearTimeout(timer)
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy)
        copyBtn.classList.add('is-done')
        label.textContent = 'Copied'
        status.textContent = 'Email address copied to clipboard'
      } catch (e) {
        label.textContent = 'Copy failed, select the address'
        status.textContent = 'Copy failed. Select the address to copy it manually.'
      }
      timer = setTimeout(() => {
        copyBtn.classList.remove('is-done')
        label.textContent = 'Copy address'
        status.textContent = ''
      }, 2400)
    })
  }

  document.getElementById('year').textContent = new Date().getFullYear()

  /*------------------------------------------------------------
    Motion. Everything above works without it; markup already shows the finished state.
  ------------------------------------------------------------*/
  const { gsap, ScrollTrigger } = window
  if (!gsap || !ScrollTrigger || reduceMotion.matches) {
    root.classList.add('motion-ready')
    return
  }
  gsap.registerPlugin(ScrollTrigger)

  // Hero: the stopwatch runs while the manual path is traced, then that same path pulls taut.
  // If the 2.5s safety net already revealed the hero (slow CDN), leave it alone rather than replaying it.
  if (!root.classList.contains('motion-ready')) {
    const hand = document.querySelector('.w-hand')
    const live = document.querySelector('.study-taut')
    const tautD = live.getAttribute('d')
    const tangled = document
      .querySelector('.study-tangled')
      .getAttribute('d')
      .slice(1)
      .split('L')
      .map(p => p.split(' ').map(Number))
    // Sample the taut curve (M40 168 C 420 160, 980 128, 1400 78) at the same point count
    const bez = (t, a, b, c, d) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d
    const taut = tangled.map((_, i) => {
      const t = i / (tangled.length - 1)
      return [bez(t, 40, 420, 980, 1400), bez(t, 168, 160, 128, 78)]
    })
    const morph = { p: 0 }
    const drawMorph = () => {
      const p = morph.p
      live.setAttribute(
        'd',
        `M${tangled
          .map(([x, y], i) => `${(x + (taut[i][0] - x) * p).toFixed(1)} ${(y + (taut[i][1] - y) * p).toFixed(1)}`)
          .join('L')}`
      )
    }

    gsap.set('.hero-name .line > span', { yPercent: 110, opacity: 1 })
    gsap.set('.hero .reveal', { opacity: 0, y: 16 })
    gsap.set('.study-draw', { strokeDashoffset: 1 })
    gsap.set(hand, { svgOrigin: '200 240', rotation: 0 })
    live.removeAttribute('mask')
    drawMorph()
    gsap.set(live, { opacity: 0 })
    root.classList.add('motion-ready')

    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .to('.hero-name .line > span', { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.05)
      .to('.hero-id, .hero-thesis, .lead, .hero-ctas', { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.35)
      .to('.watch', { opacity: 1, y: 0, duration: 1 }, 0.25)
      .to(hand, { rotation: 720, duration: 1.9, ease: 'power2.inOut' }, 0.4)
      .to('.study-draw-tangled', { strokeDashoffset: 0, duration: 1.9, ease: 'power1.inOut' }, 0.4)
      // The traced manual path lights up, then pulls taut; the dotted ghost stays behind as the baseline
      .to(live, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 2.25)
      .to(morph, { p: 1, duration: 1.3, ease: 'expo.inOut', onUpdate: drawMorph, onComplete: () => live.setAttribute('d', tautD) }, 2.35)
      .from('.study-end', { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, 3.4)
      .from('.study-legend > *', { opacity: 0, y: 6, duration: 0.6, stagger: 0.12 }, 2.6)
  }

  // Header stopwatch: the hand sweeps once over the whole page
  const brandHand = document.querySelector('.bw-hand')
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: s => brandHand.style.setProperty('--sweep', `${(s.progress * 360).toFixed(1)}deg`)
  })

  // Observation rows: the split mark runs, then the figure rises out of its line
  gsap.utils.toArray('.obs-row').forEach(row => {
    gsap
      .timeline({ scrollTrigger: { trigger: row, start: 'top 85%', once: true }, defaults: { ease: 'expo.out' } })
      .fromTo(row, { '--split': 0 }, { '--split': 1, duration: 0.7 })
      .from(row.querySelector('.obs-fig > span'), { yPercent: 100, duration: 0.9 }, 0.1)
      .from(row.querySelectorAll('.obs-what, .obs-src'), { opacity: 0, y: 8, duration: 0.7, stagger: 0.06 }, 0.2)
  })

  // Station traces draw once as they enter
  gsap.utils.toArray('.station').forEach(station => {
    const ghost = station.querySelector('.t-ghost')
    const line = station.querySelector('.t-line')
    const dot = station.querySelector('.t-dot')
    gsap
      .timeline({ scrollTrigger: { trigger: station, start: 'top 80%', once: true } })
      .from(ghost, { opacity: 0, duration: 0.6, ease: 'power1.out' })
      .fromTo(line, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'expo.out' })
      .from(dot, { scale: 0, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, '-=0.25')
  })

  // DMAIC: the line runs through the stations in order
  const dmaic = document.querySelector('.dmaic')
  if (dmaic) {
    gsap
      .timeline({ scrollTrigger: { trigger: dmaic, start: 'top 80%', once: true } })
      .fromTo(dmaic, { '--dm': 0 }, { '--dm': 1, duration: 1.4, ease: 'power2.inOut' })
      .from(dmaic.children, { opacity: 0.25, duration: 0.4, stagger: 0.25, ease: 'power1.out' }, 0.1)
  }

  // Career: the rail fills with scroll and each role clicks a lap as it passes
  const laps = document.querySelector('.laps')
  if (laps) {
    const fill = document.createElement('span')
    fill.className = 'rail-fill'
    fill.setAttribute('aria-hidden', 'true')
    laps.prepend(fill)
    laps.classList.add('js-laps')
    ScrollTrigger.create({
      trigger: laps,
      start: 'top 60%',
      end: 'bottom 60%',
      onUpdate: s => fill.style.setProperty('--rail', s.progress.toFixed(3)),
      onLeaveBack: () => fill.style.setProperty('--rail', 0)
    })
    fill.style.setProperty('--rail', 0)
    gsap.utils.toArray('.lap').forEach(lap =>
      ScrollTrigger.create({
        trigger: lap,
        start: 'top 60%',
        onEnter: () => lap.classList.add('is-lapped'),
        onLeaveBack: () => lap.classList.remove('is-lapped')
      })
    )
  }

  // Page trail: one trace down the right margin that curls at each section, drawn with scroll
  const trail = document.querySelector('.page-trail')
  const wide = window.matchMedia('(min-width: 1400px)')
  let trailTrigger

  const buildTrail = () => {
    trailTrigger?.kill()
    trail.replaceChildren()
    if (!wide.matches) return
    const hero = document.querySelector('.hero')
    const start = hero.offsetTop + hero.offsetHeight
    const stops = [...document.querySelectorAll('main > section:not(.hero)')].map(s => s.offsetTop + 60)
    const end = document.querySelector('#contact').offsetTop
    const H = document.documentElement.scrollHeight
    const pts = []
    let y = start
    while (y < end) {
      const stop = stops.find(s => s >= y && s < y + 6)
      if (stop) {
        // A curl: one loop of manual motion where each section begins
        for (let i = 0; i <= 40; i++) {
          const a = (i / 40) * Math.PI * 2
          pts.push([30 + 14 * Math.sin(a), y + 28 * (i / 40) + 14 * (1 - Math.cos(a)) * 0.6])
        }
        y += 34
      } else {
        pts.push([30 + 5 * Math.sin(y / 140), y])
        y += 6
      }
    }
    trail.setAttribute('viewBox', `0 0 60 ${H}`)
    trail.style.height = `${H}px`
    const d = `M${pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L')}`
    const line = svgEl('path', { class: 'pt-line', d, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 })
    trail.append(svgEl('path', { class: 'pt-ghost', d }), line)
    trailTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: `${start - innerHeight * 0.6}px top`,
      end: `${end - innerHeight * 0.6}px top`,
      onUpdate: s => line.setAttribute('stroke-dashoffset', (1 - s.progress).toFixed(4))
    })
  }

  let resizeTimer
  const rebuild = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      buildTrail()
      ScrollTrigger.refresh()
    }, 200)
  }
  window.addEventListener('load', rebuild)
  window.addEventListener('resize', rebuild)
  document.querySelector('.cert-all')?.addEventListener('toggle', rebuild)
})()
