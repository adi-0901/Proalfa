import React, { useEffect, useRef } from "react"
import { Banner, BannerTitle, Headline } from "../../styles/homeStyles"

// ── Pre-computed logo particle positions from logo-mark.png (alpha-sampled) ──
// Two chevron bands forming the Proalfa Dynamic icon mark
const LOGO_PTS = [[-22,106],[-8.2,106],[5.5,106],[19.3,106],[33,106],[46.8,106],[60.5,106],[74.3,106],[88,106],[101.8,106],[-19.3,103.3],[-5.5,103.3],[8.2,103.3],[22,103.3],[35.7,103.3],[49.5,103.3],[63.2,103.3],[77,103.3],[90.8,103.3],[104.5,103.3],[-19.3,100.5],[-5.5,100.5],[8.2,100.5],[22,100.5],[35.7,100.5],[49.5,100.5],[63.2,100.5],[77,100.5],[90.8,100.5],[104.5,100.5],[-22,97.8],[-8.2,97.8],[5.5,97.8],[19.3,97.8],[33,97.8],[46.8,97.8],[60.5,97.8],[74.3,97.8],[88,97.8],[101.8,97.8],[-27.5,95],[-13.7,95],[0,95],[13.8,95],[27.5,95],[41.3,95],[55,95],[68.8,95],[82.5,95],[96.3,95],[-35.7,92.3],[-22,92.3],[-8.2,92.3],[5.5,92.3],[19.3,92.3],[33,92.3],[46.8,92.3],[60.5,92.3],[74.3,92.3],[88,92.3],[101.8,92.3],[-33,89.5],[-19.3,89.5],[-5.5,89.5],[8.2,89.5],[22,89.5],[35.7,89.5],[49.5,89.5],[63.2,89.5],[77,89.5],[90.8,89.5],[104.5,89.5],[-33,86.8],[-19.3,86.8],[-5.5,86.8],[8.2,86.8],[22,86.8],[35.7,86.8],[49.5,86.8],[63.2,86.8],[77,86.8],[90.8,86.8],[104.5,86.8],[-35.7,84],[-22,84],[-8.2,84],[5.5,84],[19.3,84],[33,84],[46.8,84],[60.5,84],[74.3,84],[88,84],[101.8,84],[-41.2,81.3],[-27.5,81.3],[-13.7,81.3],[0,81.3],[13.8,81.3],[27.5,81.3],[41.3,81.3],[55,81.3],[68.8,81.3],[82.5,81.3],[96.3,81.3],[-49.5,78.5],[-35.7,78.5],[-22,78.5],[-8.2,78.5],[5.5,78.5],[19.3,78.5],[33,78.5],[46.8,78.5],[60.5,78.5],[74.3,78.5],[88,78.5],[101.8,78.5],[-46.8,75.8],[-33,75.8],[-19.3,75.8],[-5.5,75.8],[8.2,75.8],[22,75.8],[35.7,75.8],[49.5,75.8],[63.2,75.8],[77,75.8],[90.8,75.8],[104.5,75.8],[-46.8,73],[-33,73],[-19.3,73],[-5.5,73],[8.2,73],[22,73],[35.7,73],[49,73],[63.2,73],[77,73],[90.8,73],[104.5,73],[-49.5,70.3],[-35.7,70.3],[-22,70.3],[-8.2,70.3],[5.5,70.3],[19.3,70.3],[33,70.3],[46.8,70.3],[60.5,70.3],[74.3,70.3],[88,70.3],[101.8,70.3],[-55,67.5],[-41.2,67.5],[-27.5,67.5],[-13.7,67.5],[0,67.5],[13.8,67.5],[27.5,67.5],[41.3,67.5],[55,67.5],[68.8,67.5],[82.5,67.5],[96.3,67.5],[-63.2,64.8],[-49.5,64.8],[-35.7,64.8],[-22,64.8],[-8.2,64.8],[5.5,64.8],[19.3,64.8],[33,64.8],[46.8,64.8],[60.5,64.8],[74.3,64.8],[88,64.8],[101.8,64.8],[-60.5,62],[-46.8,62],[-33,62],[-19.3,62],[-5.5,62],[8.2,62],[22,62],[35.7,62],[49.5,62],[63.2,62],[77,62],[90.8,62],[104.5,62],[74.3,59.3],[88,59.3],[101.8,59.3],[74.3,56.5],[88,56.5],[101.8,56.5],[77,53.8],[90.8,53.8],[68.8,51],[82.5,51],[96.3,51],[77,48.3],[90.8,48.3],[74.3,45.5],[88,45.5],[74.3,42.8],[88,42.8],[77,40],[68.8,37.3],[82.5,37.3],[77,34.5],[74.3,31.8],[74.3,29],[68.8,23.5],[-60.5,15.3],[-46.8,15.3],[-33,15.3],[-19.3,15.3],[-5.5,15.3],[8.2,15.3],[22,15.3],[35.7,15.3],[49.5,15.3],[63.2,15.3],[-60.5,12.5],[-46.8,12.5],[-33,12.5],[-19.3,12.5],[-5.5,12.5],[8.2,12.5],[22,12.5],[35.7,12.5],[49.5,12.5],[63.2,12.5],[-63.2,9.8],[-49.5,9.8],[-35.7,9.8],[-22,9.8],[-8.2,9.8],[5.5,9.8],[19.3,9.8],[33,9.8],[46.8,9.8],[60.5,9.8],[-68.7,7],[-55,7],[-41.2,7],[-27.5,7],[-13.7,7],[0,7],[13.8,7],[27.5,7],[41.3,7],[55,7],[-77,4.3],[-63.2,4.3],[-49.5,4.3],[-35.7,4.3],[-22,4.3],[-8.2,4.3],[5.5,4.3],[19.3,4.3],[33,4.3],[46.8,4.3],[60.5,4.3],[-74.2,1.5],[-60.5,1.5],[-46.8,1.5],[-33,1.5],[-19.3,1.5],[-5.5,1.5],[8.2,1.5],[22,1.5],[35.7,1.5],[49.5,1.5],[63.2,1.5],[-74.2,-1.2],[-60.5,-1.2],[-46.8,-1.2],[-33,-1.2],[-19.3,-1.2],[-5.5,-1.2],[8.2,-1.2],[22,-1.2],[35.7,-1.2],[49.5,-1.2],[63.2,-1.2],[-77,-4],[-63.2,-4],[-49.5,-4],[-35.7,-4],[-22,-4],[-8.2,-4],[5.5,-4],[19.3,-4],[33,-4],[46.8,-4],[60.5,-4],[-82.5,-6.7],[-68.7,-6.7],[-55,-6.7],[-41.2,-6.7],[-27.5,-6.7],[-13.7,-6.7],[0,-6.7],[13.8,-6.7],[27.5,-6.7],[41.3,-6.7],[55,-6.7],[-90.7,-9.5],[-77,-9.5],[-63.2,-9.5],[-49.5,-9.5],[-35.7,-9.5],[-22,-9.5],[-8.2,-9.5],[5.5,-9.5],[19.3,-9.5],[33,-9.5],[46.8,-9.5],[60.5,-9.5],[-88,-12.2],[-74.2,-12.2],[-60.5,-12.2],[-46.8,-12.2],[-33,-12.2],[-19.3,-12.2],[-5.5,-12.2],[8.2,-12.2],[22,-12.2],[35.7,-12.2],[49.5,-12.2],[63.2,-12.2],[-88,-15],[-74.2,-15],[-60.5,-15],[-46.8,-15],[-33,-15],[-19.3,-15],[-5.5,-15],[8.2,-15],[22,-15],[35.7,-15],[49.5,-15],[63.2,-15],[-90.7,-17.7],[-77,-17.7],[-63.2,-17.7],[-49.5,-17.7],[-35.7,-17.7],[-22,-17.7],[-8.2,-17.7],[5.5,-17.7],[19.3,-17.7],[33,-17.7],[46.8,-17.7],[60.5,-17.7],[-96.2,-20.5],[-82.5,-20.5],[-68.7,-20.5],[-55,-20.5],[-41.2,-20.5],[-27.5,-20.5],[-13.7,-20.5],[0,-20.5],[13.8,-20.5],[27.5,-20.5],[41.3,-20.5],[55,-20.5],[-104.5,-23.2],[-90.7,-23.2],[-77,-23.2],[-63.2,-23.2],[-49.5,-23.2],[-35.7,-23.2],[-22,-23.2],[-8.2,-23.2],[5.5,-23.2],[19.3,-23.2],[33,-23.2],[46.8,-23.2],[60.5,-23.2],[-101.7,-26],[-88,-26],[-74.2,-26],[-60.5,-26],[-46.8,-26],[-33,-26],[-19.3,-26],[-5.5,-26],[8.2,-26],[22,-26],[35.7,-26],[49.5,-26],[63.2,-26],[33,-28.7],[46.8,-28.7],[60.5,-28.7],[33,-31.5],[46.8,-31.5],[22,-34.2],[35.7,-34.2],[49.5,-34.2],[27.5,-37],[41.3,-37],[22,-39.7],[35.7,-39.7],[49.5,-39.7],[33,-42.5],[46.8,-42.5],[33,-45.2],[22,-48],[35.7,-48],[27.5,-50.7],[22,-53.5],[35.7,-53.5],[33,-56.2],[22,-61.7],[22,-67.2]]

const LOGO_SCALE  = 0.82   // ← smaller: was 1.55
const LOGO_Z      = 8
const STREAM_N    = 22000  // particle stream count (all GPU-driven)
const DURATION    = 20.0   // seconds per full stream cycle

// Glitter: cubic brightness curve — dim most of the time, bright sharp flares
function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v }

// ── Vertex shader: cubic bezier stream + interactions ─────────────────────────
const VERT = /* glsl */`
  precision highp float;

  attribute float aOffset;
  attribute vec3 aStart;
  attribute vec3 aCP1;
  attribute vec3 aCP2;
  attribute vec3 aEnd;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uDuration;

  // Mouse repulsion
  uniform vec2  uMouse;        // smoothed world-space XY of cursor
  uniform float uMouseRadius;  // world units radius of influence
  uniform float uMouseStrength;// repulsion power (scales with speed)

  // Click shockwave
  uniform vec2  uClickPos;     // world XY of last click
  uniform float uClickAge;     // seconds since last click (−1 = inactive)

  varying vec3  vColor;
  varying float vProgress;

  vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t) {
    float tn = 1.0 - t;
    return tn*tn*tn*p0
         + 3.0*tn*tn*t*c0
         + 3.0*tn*t*t*c1
         + t*t*t*p1;
  }

  void main() {
    vColor = aColor;
    float tProgress = mod(uTime + aOffset, uDuration) / uDuration;
    vProgress = tProgress;

    vec3 pos = cubicBezier(aStart, aCP1, aCP2, aEnd, tProgress);

    // ── Mouse repulsion ──────────────────────────────────────────────────
    vec2  mDiff   = pos.xy - uMouse;
    float mDist   = length(mDiff);
    if (mDist < uMouseRadius && mDist > 0.001) {
      float t2      = 1.0 - mDist / uMouseRadius;
      float force   = t2 * t2 * uMouseStrength;   // quadratic falloff
      pos.xy       += normalize(mDiff) * force;
      pos.z        += force * 0.18;               // subtle depth push
    }

    // ── Click shockwave (expanding ring) ─────────────────────────────────
    if (uClickAge >= 0.0 && uClickAge < 1.8) {
      float ringRadius  = uClickAge * 420.0;         // ring expands outward
      float ringDecay   = 1.0 - uClickAge / 1.8;    // fades over lifetime
      vec2  cDiff       = pos.xy - uClickPos;
      float cDist       = length(cDiff);
      float shellWidth  = 90.0;
      float distToRing  = abs(cDist - ringRadius);
      if (distToRing < shellWidth) {
        float push = (1.0 - distToRing / shellWidth) * ringDecay * 180.0;
        pos.xy    += normalize(cDiff + vec2(0.001)) * push;
        pos.z     += push * 0.12;
      }
    }

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = clamp(6.5 * (550.0 / max(-mvPos.z, 1.0)), 1.0, 18.0);
    gl_Position  = projectionMatrix * mvPos;
  }
`

// ── Fragment shader: soft circular dot with path fade ─────────────────────────
const FRAG = /* glsl */`
  precision highp float;
  varying vec3  vColor;
  varying float vProgress;

  void main() {
    vec2  c    = gl_PointCoord - vec2(0.5);
    float r    = length(c);
    if (r > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.20, 0.50, r);
    // Fade in at start, fade out at end of bezier path
    float fade  = smoothstep(0.0, 0.07, vProgress)
                * smoothstep(1.0, 0.93, vProgress);

    gl_FragColor = vec4(vColor, alpha * fade * 0.88);
  }
`

// ── Component ─────────────────────────────────────────────────────────────────
const HomeCanvas = () => {
  const mountRef = useRef(null)

  const headlineParent = {
    initial: { y: 800 },
    animate: { y: 0, transition: { staggerChildren: 0.2 } },
  }
  const headlineAnimate = {
    initial: { y: 800 },
    animate: {
      y: 0,
      x: 20,
      transition: { duration: 1, ease: [0.6, 0.05, -0.01, 0.9] },
    },
  }

  useEffect(() => {
    let animFrameId
    let cancelled  = false
    let renderer   = null
    const mountEl  = mountRef.current
    let _onMove    = null
    let _onResize  = null
    let _onClick   = null
    let _onWheel   = null

    ;(async () => {
      const THREE = await import("three")
      if (cancelled || !mountEl) return

      const W = mountEl.clientWidth  || window.innerWidth
      const H = mountEl.clientHeight || window.innerHeight

      // ── Scene / camera / renderer ────────────────────────────────────────
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x07070b)

      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 5000)
      camera.position.set(0, 220, 780)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      mountEl.appendChild(renderer.domElement)

      // ── Particle stream (all animation in GPU vertex shader) ─────────────
      const aOffset = new Float32Array(STREAM_N)
      const aStart  = new Float32Array(STREAM_N * 3)
      const aCP1    = new Float32Array(STREAM_N * 3)
      const aCP2    = new Float32Array(STREAM_N * 3)
      const aEnd    = new Float32Array(STREAM_N * 3)
      const aColor  = new Float32Array(STREAM_N * 3)

      const R = THREE.MathUtils
      const col = new THREE.Color()

      for (let i = 0; i < STREAM_N; i++) {
        // Stagger start times across full duration
        aOffset[i] = (i / STREAM_N) * DURATION

        // All particles travel left → right at y≈0
        aStart[i*3]   = -900; aStart[i*3+1] = R.randFloat(-30,30); aStart[i*3+2] = 0
        aEnd[i*3]     =  900; aEnd[i*3+1]   = R.randFloat(-30,30); aEnd[i*3+2]   = 0

        // Control point 1: above and slightly behind camera
        aCP1[i*3]   = R.randFloat(-380, 380)
        aCP1[i*3+1] = R.randFloat( 300,  520)
        aCP1[i*3+2] = R.randFloat(-520, -280)

        // Control point 2: below and in front of camera
        aCP2[i*3]   = R.randFloat(-380, 380)
        aCP2[i*3+1] = R.randFloat(-520, -300)
        aCP2[i*3+2] = R.randFloat( 280,  520)

        // Full-spectrum rainbow — same approach as the CodePen original
        const h = i / STREAM_N
        col.setHSL(h, R.randFloat(0.45, 0.65), R.randFloat(0.45, 0.65))
        aColor[i*3] = col.r; aColor[i*3+1] = col.g; aColor[i*3+2] = col.b
      }

      const streamGeo = new THREE.BufferGeometry()
      // Dummy position attribute (actual pos computed in vertex shader)
      streamGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(STREAM_N * 3), 3))
      streamGeo.setAttribute("aOffset",  new THREE.BufferAttribute(aOffset, 1))
      streamGeo.setAttribute("aStart",   new THREE.BufferAttribute(aStart,  3))
      streamGeo.setAttribute("aCP1",     new THREE.BufferAttribute(aCP1,    3))
      streamGeo.setAttribute("aCP2",     new THREE.BufferAttribute(aCP2,    3))
      streamGeo.setAttribute("aEnd",     new THREE.BufferAttribute(aEnd,    3))
      streamGeo.setAttribute("aColor",   new THREE.BufferAttribute(aColor,  3))

      const streamMat = new THREE.ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent:    true,
        depthWrite:     false,
        uniforms: {
          uTime:          { value: 0 },
          uDuration:      { value: DURATION },
          uMouse:         { value: new THREE.Vector2(9999, 9999) },
          uMouseRadius:   { value: 210 },
          uMouseStrength: { value: 0 },
          uClickPos:      { value: new THREE.Vector2(0, 0) },
          uClickAge:      { value: -1 },
        },
      })

      const streamPoints = new THREE.Points(streamGeo, streamMat)
      streamPoints.frustumCulled = false  // bezier paths exceed bounding box
      scene.add(streamPoints)

      // ── Logo particles (spring to home, glitter shimmer) ─────────────────
      const LOGO_N     = LOGO_PTS.length
      const logoPosArr = new Float32Array(LOGO_N * 3)
      const logoColArr = new Float32Array(LOGO_N * 3)
      const logoVel    = []

      for (let i = 0; i < LOGO_N; i++) {
        const hx = LOGO_PTS[i][0] * LOGO_SCALE
        const hy = LOGO_PTS[i][1] * LOGO_SCALE - 18
        logoPosArr[i*3]     = hx + R.randFloat(-120, 120)
        logoPosArr[i*3+1]   = hy + R.randFloat(-120, 120)
        logoPosArr[i*3+2]   = R.randFloat(-60, 60)
        logoColArr[i*3]     = 0.4
        logoColArr[i*3+1]   = 0.42
        logoColArr[i*3+2]   = 0.46
        logoVel.push({
          vx: 0, vy: 0, vz: 0,
          hx, hy, hz: LOGO_Z,
          phase: Math.random() * Math.PI * 2,
          speed: 1.3 + Math.random() * 2.9,
        })
      }

      const logoGeo     = new THREE.BufferGeometry()
      const logoPosAttr = new THREE.BufferAttribute(logoPosArr, 3)
      const logoColAttr = new THREE.BufferAttribute(logoColArr, 3)
      logoPosAttr.setUsage(THREE.DynamicDrawUsage)
      logoColAttr.setUsage(THREE.DynamicDrawUsage)
      logoGeo.setAttribute("position", logoPosAttr)
      logoGeo.setAttribute("color",    logoColAttr)

      scene.add(new THREE.Points(logoGeo, new THREE.PointsMaterial({
        vertexColors:    true,
        size:            4.8,
        sizeAttenuation: true,
        transparent:     true,
        opacity:         0.96,
        depthWrite:      false,
      })))

      // ── Mouse / resize / click / scroll ──────────────────────────────────
      let rawX = 0, rawY = 0, smoothX = 0, smoothY = 0
      let mouseVelX = 0, mouseVelY = 0  // for scaling repulsion with speed
      let prevMX = 0, prevMY = 0
      let scrollVel = 0                 // extra time speed from scrolling
      let clickTime = -1                // timestamp of last click
      let mouseActive = false           // stays false until first real mousemove

      const raycaster  = new THREE.Raycaster()
      const ndcMouse   = new THREE.Vector2()
      const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      // Start far off-scene so repulsion never fires before user moves cursor
      const mouseWorld = new THREE.Vector3(9999, 9999, 0)
      let smMouseX = 9999, smMouseY = 9999

      _onMove = e => {
        mouseActive = true
        rawX =  (e.clientX / window.innerWidth  - 0.5) * 2
        rawY = -(e.clientY / window.innerHeight - 0.5) * 2
        mouseVelX = e.clientX - prevMX
        mouseVelY = e.clientY - prevMY
        prevMX = e.clientX; prevMY = e.clientY
      }
      _onResize = () => {
        const w = mountEl.clientWidth, h = mountEl.clientHeight
        renderer.setSize(w, h); camera.aspect = w / h
        camera.updateProjectionMatrix()
      }

      _onClick = e => {
        // Project click to world z=0 plane
        const nx = (e.clientX / window.innerWidth  - 0.5) * 2
        const ny = -(e.clientY / window.innerHeight - 0.5) * 2
        ndcMouse.set(nx, ny)
        raycaster.setFromCamera(ndcMouse, camera)
        const hit = new THREE.Vector3()
        raycaster.ray.intersectPlane(mousePlane, hit)
        streamMat.uniforms.uClickPos.value.set(hit.x, hit.y)
        clickTime = performance.now()
      }

      _onWheel = e => {
        // Scroll = temporarily boost stream speed
        scrollVel += Math.sign(e.deltaY) * 0.35
        scrollVel  = Math.max(-2.5, Math.min(2.5, scrollVel))
      }

      window.addEventListener("mousemove", _onMove)
      window.addEventListener("resize",    _onResize)
      window.addEventListener("click",     _onClick)
      window.addEventListener("wheel",     _onWheel, { passive: true })

      const REPEL_SQ = 160 * 160

      // ── Render loop ───────────────────────────────────────────────────────
      let t = 0

      const animate = () => {
        if (cancelled) return
        animFrameId = requestAnimationFrame(animate)

        // Scroll velocity decays back to 0
        scrollVel *= 0.90
        // Time advances faster/slower based on scroll (1× base + scroll boost)
        t += (1 / 60) * (1 + scrollVel * 0.5)

        // Camera parallax
        smoothX += (rawX - smoothX) * 0.032
        smoothY += (rawY - smoothY) * 0.032
        camera.position.x = smoothX * 60
        camera.position.y = 220 + smoothY * 30
        camera.lookAt(0, 0, 0)

        // Project mouse to world — only after the user has moved the cursor
        if (mouseActive) {
          ndcMouse.set(rawX, rawY)
          raycaster.setFromCamera(ndcMouse, camera)
          raycaster.ray.intersectPlane(mousePlane, mouseWorld)
          // Smooth the world mouse so repulsion field has a nice lag
          smMouseX += (mouseWorld.x - smMouseX) * 0.12
          smMouseY += (mouseWorld.y - smMouseY) * 0.12
          streamMat.uniforms.uMouse.value.set(smMouseX, smMouseY)
          // Scale repulsion strength with cursor speed (fast = wider parting)
          const speed  = Math.sqrt(mouseVelX*mouseVelX + mouseVelY*mouseVelY)
          const target = Math.min(speed * 0.9, 130)
          const cur    = streamMat.uniforms.uMouseStrength.value
          streamMat.uniforms.uMouseStrength.value = cur + (target - cur) * 0.10
          mouseVelX *= 0.8; mouseVelY *= 0.8
        }

        // Click shockwave age
        if (clickTime >= 0) {
          const age = (performance.now() - clickTime) / 1000
          streamMat.uniforms.uClickAge.value = age < 1.8 ? age : -1
          if (age >= 1.8) clickTime = -1
        }

        // Drive the stream
        streamMat.uniforms.uTime.value = t

        // Mouse world position already updated above (reuse mouseWorld)

        // Update logo particles
        const lp = logoGeo.attributes.position
        const lc = logoGeo.attributes.color

        for (let i = 0; i < LOGO_N; i++) {
          const d  = logoVel[i]
          let px   = lp.getX(i), py = lp.getY(i), pz = lp.getZ(i)

          // Spring toward home
          d.vx += (d.hx - px) * 0.024
          d.vy += (d.hy - py) * 0.024
          d.vz += (d.hz - pz) * 0.024
          d.vx *= 0.84; d.vy *= 0.84; d.vz *= 0.84

          // Mouse repulsion
          const dx = px - mouseWorld.x, dy = py - mouseWorld.y
          const dSq = dx*dx + dy*dy
          if (dSq < REPEL_SQ && dSq > 0.1) {
            const dist = Math.sqrt(dSq)
            const f = (1 - dist / 160) * 5.5
            d.vx += (dx / dist) * f * 0.5
            d.vy += (dy / dist) * f * 0.5
          }

          px += d.vx; py += d.vy
          pz = d.hz + Math.sin(t * 0.65 + i * 0.09) * 2.8
          lp.setXYZ(i, px, py, pz)

          // Glitter: cubic power curve for sharp bright peaks
          const raw   = (Math.sin(t * d.speed + d.phase) + 1) * 0.5
          const g     = raw * raw * raw
          const flash = g > 0.80 ? (g - 0.80) * 5.0 : 0.0

          lc.setXYZ(i,
            clamp(0.22 + g * 0.68 + flash * 0.10, 0, 1),
            clamp(0.24 + g * 0.66 + flash * 0.08, 0, 1),
            clamp(0.28 + g * 0.68 + flash * 0.04, 0, 1),
          )
        }
        lp.needsUpdate = true
        lc.needsUpdate = true

        renderer.render(scene, camera)
      }

      animate()
    })()

    return () => {
      cancelled = true
      cancelAnimationFrame(animFrameId)
      if (_onMove)   window.removeEventListener("mousemove", _onMove)
      if (_onResize) window.removeEventListener("resize",    _onResize)
      if (_onClick)  window.removeEventListener("click",  _onClick)
      if (_onWheel)  window.removeEventListener("wheel",  _onWheel)
      if (renderer) {
        renderer.dispose()
        if (mountEl && mountEl.contains(renderer.domElement))
          mountEl.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="w-screen overflow-hidden">
      <Banner exit={{ opacity: 0, transition: { duration: 0.2 } }}>
        <div
          ref={mountRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <BannerTitle
          variants={headlineParent}
          initial="initial"
          animate="animate"
        >
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen break-w lg:text-[5rem] text-[3rem] lg:leading-[0.76] leading-[0.85] lg:ml-20"
          >
            BUILT STRONG
          </Headline>
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen break-w lg:text-[5rem] text-[3rem] lg:leading-[0.76] leading-[0.85] lg:ml-20"
          >
            TO BUILD STRONGEST
          </Headline>
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen lg:text-[1.15rem] text-[0.95rem] font-normal normal-case lg:ml-20 mt-2 lg:mt-4 max-w-xl text-white/90"
          >
            End-to-end turnkey industrial infrastructure developer
          </Headline>
        </BannerTitle>
      </Banner>
    </div>
  )
}

export default HomeCanvas
