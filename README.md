# Museum Portfolio

An immersive digital museum portfolio built with Next.js (Next.js), shadcn/ui, and React Three Fiber.

Features
- Narrative navigation with mini-map and arrow keys
- Accessibility-first: skip link, ARIA roles, ESC closes modals, respects prefers-reduced-motion
- Personalization: Day/Night/Neon themes, ambient audio toggle, Cinematic/Minimal motion (persisted)
- Achievements system with badges (localStorage)
- Hidden developer console (Ctrl+Alt+D): help, credits, theme, fun
- Rooms:
  1. Welcome Atrium (spotlight hero, ambient hum)
  2. Story Hall (timeline + interactive globe)
  3. Project Gallery (tilt frames, spotlight, modal with draggable demo)
  4. Skills Arcade (carousel grid, micro-interactions)
  5. Mini Games Arcade (Pixel Runner, Logic Puzzle, Memory Match)
  6. The Lab (live particle sandbox, OSS links)
  7. Contact Conservatory (glass form, swinging socials, sticky notes)
  8. Digital CV Room (inline panel, PDF, career map)

Content
- All content is editable via JSON in /data:
  - timeline.json, projects.json, skills.json, experiments.json, socials.json, cv.json
- Replace public/cv/resume.pdf with your real resume.

Get Started
1. In v0, click Deploy to Vercel or Download Code to install locally.
2. Local install:
   - pnpm i
   - pnpm dev
3. Edit /data/*.json to personalize content.
4. Update your name/tagline in components/sections/welcome-atrium.tsx.
5. Replace the PDF and adjust socials, projects, and skills.

Performance
- Heavy sections lazy-loaded with next/dynamic.
- Images use lightweight placeholders.
- 3D and games render only when their tab/section is visible.

Accessibility
- Keyboard navigation (arrow keys)
- Skip to content
- Modals close on ESC
- Motion reduced via prefers-reduced-motion and the Minimal setting

Shortcuts
- Ctrl/Cmd + M: Toggle mini-map panel (navigation bar is always visible; shortcut focuses it)
- Ctrl+Alt+D: Hidden console
- Ctrl+Alt+B: Achievements panel

License
- MIT (replace as desired)

Deploy
- Deploy directly from v0 with the Deploy button (recommended).
- Or push to GitHub from v0 and connect the repo to Vercel.
