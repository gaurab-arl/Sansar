import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* ============================================================
   SITE PLAN — local meter coordinates, origin = Kasthamandap
   +X = east, +Z = north.

   Source method: pixel-level analysis of two real map screenshots
   (a Google Maps satellite capture and an OSM-style street map),
   detecting marker positions and road curves directly rather than
   eyeballing them. Scale anchored to one measured real distance
   (Kasthamandap -> Kal Bhairav, ~159m). This fixes correct
   ADJACENCY and the real street network faithfully; exact meter
   spacing beyond that anchor is a reasoned best estimate, not a
   certified survey.
   ============================================================ */
const SITE = {
  kasthamandap:     { x: 0,    z: 0,   ry: 0.12 },
  ashokBinayak:     { x: 10,   z: 8,   ry: 0.4 },
  trailokyaMohan:   { x: 18,   z: 19,  ry: 0.05 },
  shivaTempleSmall: { x: 6,    z: 22,  ry: -0.2 },
  majuDega:         { x: 31,   z: 29,  ry: 0 },
  kumariGhar:       { x: 42,   z: -10, ry: 0.08 },
  bigBell:          { x: 55,   z: 55,  ry: 0 },
  jagannath:        { x: 68,   z: 73,  ry: 0.1 },
  kageshwor:        { x: 79,   z: 89,  ry: 0 },
  gorakhnath:       { x: 86,   z: 103, ry: 0 },
  kalBhairav:       { x: 91,   z: 96,  ry: -0.35 },
  taleju:           { x: 101,  z: 131, ry: 0 },
  degutale:         { x: 94,   z: 111, ry: 0 },
  taraniDevi:       { x: 136,  z: 141, ry: 0.3 },
  panchMuktiHanuman:{ x: 141,  z: 90,  ry: -0.3 },
  gaddiBaithak:     { x: 116,  z: 55,  ry: -0.1 },
  hanumanGate:      { x: 85,   z: 60,  ry: 0 },
  basantapurTower:  { x: 106,  z: 66,  ry: 0 },
  singhaSattal:     { x: -26,  z: 46,  ry: 0.1 }
};

/* Real streets, as polylines of {x,z}, matching the road network
   traced from the screenshots (Layaku Marg / Yogbir Singh Marg is
   one continuous spine that changes name partway; Yatkha Road,
   Ganga Path and Sukra Path bound the area). */
const ROADS = [
  { name: 'Layaku Marg / Yogbir Singh Marg', width: 7,
    pts: [[-6,-64],[-2,-30],[2,-4],[8,20],[24,42],[46,60],[66,80],[84,104],[97,123],[101,131],[110,136],[128,140]] },
  { name: 'Gyachemuga Galli', width: 5.5, pts: [[0,0],[-4,-30],[-6,-64]] },
  { name: 'Yatkha Road', width: 6, pts: [[-35,40],[-33,80],[-30,120],[-27,150]] },
  { name: 'Ganga Path', width: 8, pts: [[-22,-26],[20,-26],[70,-24],[120,-20],[158,-16]] },
  { name: 'Makhan Galli', width: 6, pts: [[128,140],[148,145],[168,142]] },
  { name: 'Sukra Path', width: 7, pts: [[156,-14],[156,60],[156,140]] }
];

const PRESETS = [
  { name: 'Aerial overview', pos: [30,150,240], look: [55,10,55] },
  { name: 'Kasthamandap', pos: [-6,10,28], look: [0,6,0] },
  { name: 'Trailokya Mohan & Maju Dega', pos: [14,9,58], look: [24,9,24] },
  { name: 'Kumari Ghar', pos: [42,9,22], look: [42,6,-8] },
  { name: 'Hanuman Dhoka Gate', pos: [85,7,90], look: [85,4,60] },
  { name: 'Gaddi Baithak', pos: [116,10,15], look: [116,5,50] },
  { name: 'Basantapur Tower', pos: [70,22,66], look: [106,20,66] },
  { name: 'Jagannath Temple', pos: [46,6,73], look: [68,6,73] },
  { name: 'Kal Bhairav', pos: [91,4,120], look: [91,3,96] },
  { name: 'Taleju Temple', pos: [101,28,178], look: [101,18,131] },
  { name: 'Big Bell', pos: [35,6,55], look: [55,4,55] },
  { name: 'Singha Sattal', pos: [-26,7,78], look: [-26,4,46] }
];

/* ------------------------------------------------------------ */
function rnd(a, b) { return a + Math.random() * (b - a); }
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function shadeHex(hex, amt) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
  return `rgb(${r},${g},${b})`;
}
function brickTexture(baseHex, mortarHex, bw, bh) {
  const c = mkCanvas(256, 256), ctx = c.getContext('2d');
  ctx.fillStyle = mortarHex; ctx.fillRect(0, 0, 256, 256);
  const rows = Math.round(256 / bh);
  for (let r = 0; r < rows; r++) {
    const y = r * bh, offset = (r % 2) * (bw / 2);
    for (let x = -bw; x < 256 + bw; x += bw) {
      ctx.fillStyle = shadeHex(baseHex, rnd(-14, 10));
      ctx.fillRect(x + offset + 1, y + 1, bw - 2, bh - 2);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function woodTexture(baseHex) {
  const c = mkCanvas(256, 256), ctx = c.getContext('2d');
  ctx.fillStyle = baseHex; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 70; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${rnd(0.03, 0.13)})`;
    ctx.lineWidth = rnd(0.5, 2.2);
    ctx.beginPath();
    const y = rnd(0, 256);
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(85, y + rnd(-8, 8), 170, y + rnd(-8, 8), 256, y + rnd(-6, 6));
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function tileRoofTexture() {
  const c = mkCanvas(128, 128), ctx = c.getContext('2d');
  ctx.fillStyle = '#2c1c14'; ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 8) {
    for (let x = 0; x < 128; x += 16) {
      const off = (Math.floor(y / 8) % 2) * 8;
      ctx.fillStyle = shadeHex('#3c2618', rnd(-8, 10));
      ctx.fillRect(x + off, y, 14, 7);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function plazaTexture() {
  const c = mkCanvas(512, 512), ctx = c.getContext('2d');
  ctx.fillStyle = '#8a7f6b'; ctx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 14) {
    for (let x = 0; x < 512; x += 20) {
      const off = (Math.floor(y / 14) % 2) * 10;
      ctx.fillStyle = shadeHex('#8a7f6b', rnd(-20, 16));
      ctx.beginPath();
      ctx.moveTo(x + off, y); ctx.lineTo(x + off + 17, y); ctx.lineTo(x + off + 14, y + 13); ctx.lineTo(x + off + 3, y + 13);
      ctx.closePath(); ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
function roadTexture() {
  const c = mkCanvas(256, 256), ctx = c.getContext('2d');
  ctx.fillStyle = '#9c9184'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(${60 + rnd(-10, 40)},${55 + rnd(-10, 40)},${48 + rnd(-10, 40)},0.5)`;
    const s = rnd(1.5, 4);
    ctx.fillRect(rnd(0, 256), rnd(0, 256), s, s);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function DurbarSquare3D() {
  const mountRef = useRef(null);
  const three = useRef({});
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [labelsOn, setLabelsOn] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const minimapRef = useRef(null);

  const flyTo = useCallback((preset, idx) => {
    const T = three.current;
    if (!T.camera || !T.controls) return;
    setActiveIdx(idx);
    const startPos = T.camera.position.clone();
    const startTarget = T.controls.target.clone();
    const endPos = new THREE.Vector3(...preset.pos);
    const endTarget = new THREE.Vector3(...preset.look);
    const t0 = performance.now(), dur = 1400;
    function anim(now) {
      const t = Math.min(1, (now - t0) / dur);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      T.camera.position.lerpVectors(startPos, endPos, e);
      T.controls.target.lerpVectors(startTarget, endTarget, e);
      T.controls.update();
      if (t < 1) requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const T = three.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // sky dome
    const skyGeo = new THREE.SphereGeometry(900, 32, 20);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        top: { value: new THREE.Color(0x2b4a72) },
        mid: { value: new THREE.Color(0xe7a765) },
        bottom: { value: new THREE.Color(0xf6d9a8) }
      },
      vertexShader: `varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vPos; uniform vec3 top; uniform vec3 mid; uniform vec3 bottom;
        void main(){ float h = normalize(vPos).y;
          vec3 c = h > 0.08 ? mix(mid, top, smoothstep(0.08,0.9,h)) : mix(bottom, mid, smoothstep(-0.15,0.08,h));
          gl_FragColor = vec4(c,1.0); }`
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));
    scene.fog = new THREE.FogExp2(0xdba86a, 0.0026);

    const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 1400);
    camera.position.set(30, 150, 240);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.minDistance = 6;
    controls.maxDistance = 460;
    controls.target.set(55, 10, 55);
    controls.update();

    const hemi = new THREE.HemisphereLight(0xffe6c2, 0x3a2a1c, 0.55);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffd9a0, 1.55);
    sun.position.set(-100, 170, 110);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -200; sun.shadow.camera.right = 200;
    sun.shadow.camera.top = 200; sun.shadow.camera.bottom = -200;
    sun.shadow.camera.near = 10; sun.shadow.camera.far = 450;
    sun.shadow.bias = -0.0015;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x88a4d8, 0.28);
    fill.position.set(90, 60, -60);
    scene.add(fill);

    const TEX = {
      brickRed: brickTexture('#8a4636', '#5c3a2c', 22, 10),
      brickDeep: brickTexture('#6f3527', '#4a2c20', 22, 10),
      woodDark: woodTexture('#4a2f1f'),
      woodMed: woodTexture('#6b4226'),
      roofTile: tileRoofTexture(),
      plaza: plazaTexture(),
      stone: brickTexture('#9b968a', '#6f6a5f', 34, 16),
      road: roadTexture()
    };
    TEX.plaza.repeat.set(40, 40);

    function mat(tex, opts = {}) {
      if (tex) tex.repeat.set(opts.ru || 3, opts.rv || 1.2);
      return new THREE.MeshStandardMaterial({
        map: tex || null, color: tex ? 0xffffff : (opts.color || 0xffffff),
        roughness: opts.roughness !== undefined ? opts.roughness : 0.85,
        metalness: opts.metalness !== undefined ? opts.metalness : 0.03
      });
    }
    const M = {
      brickWall: mat(TEX.brickRed, { ru: 2.4, rv: 1.1 }),
      brickDeep: mat(TEX.brickDeep, { ru: 2.4, rv: 1.1 }),
      woodDark: mat(TEX.woodDark, { ru: 1.5, rv: 1, roughness: 0.7 }),
      woodMed: mat(TEX.woodMed, { ru: 1.5, rv: 1, roughness: 0.7 }),
      roof: mat(TEX.roofTile, { ru: 4, rv: 4, roughness: 0.75 }),
      roofGilt: new THREE.MeshStandardMaterial({ color: 0xb8902f, metalness: 0.75, roughness: 0.3 }),
      stone: mat(TEX.stone, { ru: 2, rv: 1 }),
      road: mat(TEX.road, { ru: 6, rv: 1, roughness: 0.95 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xcf9f3f, metalness: 0.85, roughness: 0.28, emissive: 0x231704, emissiveIntensity: 0.4 }),
      white: new THREE.MeshStandardMaterial({ color: 0xe9e2cf, roughness: 0.55 }),
      darkWood: new THREE.MeshStandardMaterial({ color: 0x2b1c11, roughness: 0.8 }),
      idolRed: new THREE.MeshStandardMaterial({ color: 0xb5342a, roughness: 0.6 }),
      relief: new THREE.MeshStandardMaterial({ color: 0x18181a, roughness: 0.45, metalness: 0.2 })
    };

    const root = new THREE.Group();
    scene.add(root);

    function group(x, z, ry) {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.rotation.y = ry || 0;
      root.add(g);
      return g;
    }
    function steppedPlinth(g, steps, baseW, baseD, stepH) {
      let y = 0;
      for (let i = 0; i < steps; i++) {
        const w = baseW - i * (baseW / steps) * 0.55;
        const d = baseD - i * (baseD / steps) * 0.55;
        const meshP = new THREE.Mesh(new THREE.BoxGeometry(w, stepH, d), M.stone);
        meshP.position.y = y + stepH / 2;
        meshP.castShadow = true; meshP.receiveShadow = true;
        g.add(meshP);
        y += stepH;
      }
      return y;
    }
    function addStruts(g, y, halfW, halfD, count, len) {
      const positions = [];
      for (let i = 0; i < count; i++) positions.push(-halfW + (i + 0.5) * (2 * halfW / count));
      [-1, 1].forEach((side) => {
        positions.forEach((px) => {
          const s = new THREE.Mesh(new THREE.BoxGeometry(0.22, len, 0.28), M.woodDark);
          s.position.set(px, y - len * 0.42, side * (halfD + 0.05));
          s.rotation.x = side * -0.55;
          s.castShadow = true;
          g.add(s);
        });
      });
      [-1, 1].forEach((side) => {
        positions.forEach((px) => {
          const s = new THREE.Mesh(new THREE.BoxGeometry(0.28, len, 0.22), M.woodDark);
          s.position.set(side * (halfW + 0.05), y - len * 0.42, px);
          s.rotation.z = side * 0.55;
          s.castShadow = true;
          g.add(s);
        });
      });
    }
    function pyramidRoof(halfW, halfD, height, matx) {
      const geo = new THREE.ConeGeometry(Math.max(halfW, halfD) * 1.42, height, 4, 1);
      const m = new THREE.Mesh(geo, matx);
      m.rotation.y = Math.PI / 4;
      m.scale.x = halfW / (Math.max(halfW, halfD) * 1.0);
      m.scale.z = halfD / (Math.max(halfW, halfD) * 1.0);
      m.castShadow = true; m.receiveShadow = true;
      return m;
    }
    function finial(matGold, height) {
      const g = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.4, 8), matGold);
      base.position.y = 0.2;
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.28, height * 0.6, 8), matGold);
      stack.position.y = 0.4 + height * 0.3;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.14, height * 0.35, 8), matGold);
      tip.position.y = 0.4 + height * 0.6 + height * 0.175;
      g.add(base, stack, tip);
      g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
      return g;
    }
    function pagoda(opts) {
      const o = Object.assign({
        tiers: 3, baseW: 9, baseD: 9, shrink: 0.72, tierWallH: 1.6, tierRoofH: 2.0,
        plinthSteps: 3, plinthStepH: 0.55, wallMat: M.woodMed, roofMat: M.roof, struts: true, finialH: 2.2, giltTop: false
      }, opts);
      const g = new THREE.Group();
      let y = steppedPlinth(g, o.plinthSteps, o.baseW, o.baseD, o.plinthStepH);
      let w = o.baseW * 0.82, d = o.baseD * 0.82;
      for (let i = 0; i < o.tiers; i++) {
        const wallH = o.tierWallH * (1 - i * 0.06);
        const roofH = o.tierRoofH * (1 - i * 0.08);
        const wall = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, d), i === 0 ? M.brickWall : o.wallMat);
        wall.position.y = y + wallH / 2;
        wall.castShadow = true; wall.receiveShadow = true;
        g.add(wall);
        if (i === 0) {
          [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((dir) => {
            const win = new THREE.Mesh(new THREE.BoxGeometry(dir[0] ? 0.08 : w * 0.28, wallH * 0.5, dir[1] ? 0.08 : d * 0.28), M.darkWood);
            win.position.set(dir[0] * (w / 2 + 0.02), y + wallH * 0.55, dir[1] * (d / 2 + 0.02));
            g.add(win);
          });
        }
        y += wallH;
        const isTop = i === o.tiers - 1;
        const roof = pyramidRoof(w / 2 * 1.28, d / 2 * 1.28, roofH, (o.giltTop && isTop) ? M.roofGilt : o.roofMat);
        roof.position.y = y + roofH / 2 - 0.15;
        g.add(roof);
        if (o.struts) addStruts(g, y, w / 2, d / 2, Math.max(3, Math.round(w / 2)), 0.9);
        y += roofH * 0.55;
        w *= o.shrink; d *= o.shrink;
      }
      const fin = finial(M.gold, o.finialH);
      fin.position.y = y - 0.3;
      g.add(fin);
      return g;
    }
    function placePagoda(key, opts) {
      const s = SITE[key];
      const g = group(s.x, s.z, s.ry);
      g.add(pagoda(opts));
      return g;
    }

    /* ---- unique landmarks ---- */
    function buildKasthamandap() {
      const s = SITE.kasthamandap, g = group(s.x, s.z, s.ry);
      let y = steppedPlinth(g, 2, 19, 19, 0.5);
      const half = 8.2, n = 5;
      for (let side = 0; side < 4; side++) {
        for (let i = 0; i < n; i++) {
          const t = -half + (i / (n - 1)) * half * 2;
          const pos = side === 0 ? [t, -half] : side === 1 ? [t, half] : side === 2 ? [-half, t] : [half, t];
          const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 3.1, 10), M.darkWood);
          pillar.position.set(pos[0], y + 1.55, pos[1]);
          pillar.castShadow = true;
          g.add(pillar);
        }
      }
      const core = new THREE.Mesh(new THREE.BoxGeometry(6, 3.3, 6), M.brickDeep);
      core.position.y = y + 1.65; core.castShadow = true; core.receiveShadow = true;
      g.add(core);
      y += 3.15;
      const tierW = [18.6, 13.5, 8.6], tierH = [2.3, 2.0, 1.9];
      for (let i = 0; i < 3; i++) {
        const roof = pyramidRoof(tierW[i] / 2, tierW[i] / 2, tierH[i], M.roof);
        roof.position.y = y + tierH[i] / 2;
        g.add(roof);
        addStruts(g, y, tierW[i] / 2 * 0.85, tierW[i] / 2 * 0.85, 6, 0.85);
        y += tierH[i] * 0.62;
      }
      const fin = finial(M.gold, 2.6); fin.position.y = y; g.add(fin);
    }
    function buildAshokBinayak() {
      const s = SITE.ashokBinayak, g = group(s.x, s.z, s.ry);
      let y = steppedPlinth(g, 1, 3.4, 3.4, 0.4);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 2.6), M.brickWall);
      wall.position.y = y + 0.7; wall.castShadow = true; g.add(wall);
      y += 1.4;
      const roof = pyramidRoof(2.2, 2.2, 1.5, M.roof); roof.position.y = y + 0.7; g.add(roof);
      const fin = finial(M.gold, 1.1); fin.position.y = y + 1.4; g.add(fin);
    }
    function buildSmallShiva() {
      const s = SITE.shivaTempleSmall, g = group(s.x, s.z, s.ry);
      let y = steppedPlinth(g, 1, 4, 4, 0.4);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(3, 1.8, 3), M.brickWall);
      wall.position.y = y + 0.9; wall.castShadow = true; g.add(wall);
      y += 1.8;
      const roof = pyramidRoof(2.6, 2.6, 1.7, M.roof); roof.position.y = y + 0.85; g.add(roof);
      const fin = finial(M.gold, 1.3); fin.position.y = y + 1.6; g.add(fin);
    }
    function buildKumariGhar() {
      const s = SITE.kumariGhar, g = group(s.x, s.z, s.ry);
      const outer = 15, wallH = 8.4, thick = 1.4, y0 = 0.3;
      const base = new THREE.Mesh(new THREE.BoxGeometry(outer, 0.6, outer), M.stone);
      base.position.y = 0.3; base.receiveShadow = true; g.add(base);
      const sides = [
        { w: outer, d: thick, x: 0, z: -outer / 2 + thick / 2, gate: true },
        { w: outer, d: thick, x: 0, z: outer / 2 - thick / 2, gate: false },
        { w: thick, d: outer, x: -outer / 2 + thick / 2, z: 0, gate: false },
        { w: thick, d: outer, x: outer / 2 - thick / 2, z: 0, gate: false }
      ];
      sides.forEach((sd) => {
        if (sd.gate) {
          const seg = (sd.w - 3) / 2;
          [-1, 1].forEach((dir) => {
            const wall = new THREE.Mesh(new THREE.BoxGeometry(seg, wallH, sd.d), M.brickWall);
            wall.position.set(sd.x + dir * (seg / 2 + 1.5), y0 + wallH / 2, sd.z);
            wall.castShadow = true; wall.receiveShadow = true;
            g.add(wall);
          });
          const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.6, sd.d + 0.2), M.gold);
          lintel.position.set(sd.x, y0 + wallH - 0.6, sd.z); g.add(lintel);
        } else {
          const wall = new THREE.Mesh(new THREE.BoxGeometry(sd.w, wallH, sd.d), M.brickWall);
          wall.position.set(sd.x, y0 + wallH / 2, sd.z);
          wall.castShadow = true; wall.receiveShadow = true;
          g.add(wall);
        }
      });
      for (let story = 0; story < 3; story++) {
        const wy = y0 + 1.6 + story * 2.5;
        [[0, -outer / 2 - 0.05, 0], [0, outer / 2 + 0.05, 0], [-outer / 2 - 0.05, 0, Math.PI / 2], [outer / 2 + 0.05, 0, Math.PI / 2]].forEach((p) => {
          const band = new THREE.Mesh(new THREE.BoxGeometry(outer * 0.6, 1.1, 0.12), M.woodDark);
          band.position.set(p[0], wy, p[1]);
          band.rotation.y = p[2];
          g.add(band);
        });
      }
      [0, 1, 2, 3].forEach((i) => {
        const roof = new THREE.Mesh(new THREE.BoxGeometry(outer + 1.6, 0.25, 1.9), M.roof);
        const yA = y0 + wallH + 0.35;
        if (i === 0) roof.position.set(0, yA, -outer / 2);
        if (i === 1) roof.position.set(0, yA, outer / 2);
        if (i === 2) { roof.position.set(-outer / 2, yA, 0); roof.rotation.y = Math.PI / 2; }
        if (i === 3) { roof.position.set(outer / 2, yA, 0); roof.rotation.y = Math.PI / 2; }
        roof.rotation.z = i < 2 ? -0.28 : 0;
        roof.rotation.x = i >= 2 ? 0.28 * (i === 2 ? 1 : -1) : 0;
        roof.castShadow = true;
        g.add(roof);
      });
      const fin = finial(M.gold, 1.4); fin.position.y = y0 + wallH + 1.2; g.add(fin);
    }
    function buildGaddiBaithak() {
      const s = SITE.gaddiBaithak, g = group(s.x, s.z, s.ry);
      const base = new THREE.Mesh(new THREE.BoxGeometry(24, 0.8, 11), M.stone);
      base.position.y = 0.4; base.receiveShadow = true; g.add(base);
      const body = new THREE.Mesh(new THREE.BoxGeometry(22, 7.2, 9), M.white);
      body.position.y = 0.8 + 3.6; body.castShadow = true; body.receiveShadow = true; g.add(body);
      // central arched portico (bay of 3 tall arches)
      for (let i = -1; i <= 1; i++) {
        const arch = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.4, 16, 1, false, 0, Math.PI), M.white);
        arch.rotation.z = Math.PI / 2; arch.rotation.y = Math.PI / 2;
        arch.position.set(i * 3.4, 0.8 + 5.2, 4.9);
        g.add(arch);
        const jamb1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4.4, 0.4), M.white);
        jamb1.position.set(i * 3.4 - 1.5, 0.8 + 3.0, 4.9); g.add(jamb1);
      }
      for (let i = 0; i < 8; i++) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 6.8, 14), M.white);
        col.position.set(-9.8 + i * 2.8, 0.8 + 3.4, 5.3);
        col.castShadow = true;
        g.add(col);
      }
      const pediment = new THREE.Mesh(new THREE.BoxGeometry(23, 1, 9.4), M.white);
      pediment.position.y = 0.8 + 7.4; g.add(pediment);
      for (let i = 0; i < 20; i++) {
        const baluster = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 0.3), M.white);
        baluster.position.set(-10.6 + i * 1.12, 0.8 + 8.1, 4.9);
        g.add(baluster);
      }
    }
    function buildHanumanGate() {
      const s = SITE.hanumanGate, g = group(s.x, s.z, s.ry);
      const wallW = 16;
      [-1, 1].forEach((dir) => {
        const seg = new THREE.Mesh(new THREE.BoxGeometry(wallW / 2 - 1.6, 7, 1.2), M.brickDeep);
        seg.position.set(dir * (wallW / 4 + 0.8), 3.5, 0);
        seg.castShadow = true; seg.receiveShadow = true; g.add(seg);
      });
      const torana = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.3, 1.4), M.gold);
      torana.position.set(0, 4.6, 0); g.add(torana);
      const toranaArc = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.22, 8, 16, Math.PI), M.gold);
      toranaArc.position.set(0, 5.3, 0); g.add(toranaArc);
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.5, 1.5), M.woodDark);
      lintel.position.set(0, 3.2, 0); g.add(lintel);
      const idolBase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.4, 10), M.stone);
      idolBase.position.set(4.2, 0.2, 1.4); g.add(idolBase);
      const idol = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 1.1, 4, 8), M.idolRed);
      idol.position.set(4.2, 1.05, 1.4); idol.castShadow = true; g.add(idol);
      const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.6, 4), M.roof);
      canopy.rotation.y = Math.PI / 4; canopy.position.set(4.2, 1.95, 1.4); g.add(canopy);
      [-2.6, 2.6].forEach((dx) => {
        const lion = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 1.3), M.stone);
        lion.position.set(dx, 0.5, 1.6); lion.castShadow = true; g.add(lion);
      });
    }
    function buildBasantapurTower() {
      const s = SITE.basantapurTower, g = group(s.x, s.z, s.ry);
      let y = 0, w = 8.2;
      for (let i = 0; i < 6; i++) {
        const h = 3.0 - i * 0.18;
        const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), i % 2 === 0 ? M.brickWall : M.woodMed);
        wall.position.y = y + h / 2; wall.castShadow = true; wall.receiveShadow = true; g.add(wall);
        if (i > 0) {
          const ledge = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.18, w + 0.6), M.woodDark);
          ledge.position.y = y; g.add(ledge);
        }
        y += h; w *= 0.86;
      }
      const roof = pyramidRoof(w / 2 * 1.3, w / 2 * 1.3, 2.2, M.roofGilt);
      roof.position.y = y + 1.1; g.add(roof);
      addStruts(g, y, w / 2, w / 2, 3, 0.7);
      const fin = finial(M.gold, 2.0); fin.position.y = y + 2.1; g.add(fin);
    }
    function buildKalBhairav() {
      const s = SITE.kalBhairav, g = group(s.x, s.z, s.ry);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(6, 4.6, 0.6), M.stone);
      wall.position.y = 2.3; wall.receiveShadow = true; g.add(wall);
      const arch = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.5, 16, 1, false, 0, Math.PI), M.stone);
      arch.rotation.z = Math.PI / 2; arch.rotation.y = Math.PI / 2;
      arch.position.set(0, 4.6, 0); g.add(arch);
      const relief = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.6, 0.4), M.relief);
      relief.position.set(0, 2.2, 0.45); relief.castShadow = true; g.add(relief);
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.3, 1.7), M.brickDeep);
      canopy.position.set(0, 4.85, 0.7); g.add(canopy);
      [-1.2, 0, 1.2].forEach((dx) => {
        const dome = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 10), M.stone);
        dome.position.set(dx, 5.35, 0.7); g.add(dome);
      });
      [-1.4, 1.4].forEach((dx) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4.6, 8), M.woodDark);
        post.position.set(dx, 2.3, 1.3); g.add(post);
      });
    }
    function buildBell() {
      const s = SITE.bigBell, g = group(s.x, s.z, s.ry);
      [-1.1, 1.1].forEach((dx) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 3.2, 8), M.woodDark);
        post.position.set(dx, 1.6, 0); g.add(post);
      });
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.2, 0.2), M.woodDark);
      beam.position.y = 3.15; g.add(beam);
      const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 1.1, 16, 1, true), new THREE.MeshStandardMaterial({ color: 0x9a7a2e, metalness: 0.7, roughness: 0.35, side: THREE.DoubleSide }));
      bell.position.y = 2.2; bell.castShadow = true; g.add(bell);
      const roof = pyramidRoof(1.7, 1.7, 1.0, M.roof); roof.position.y = 3.75; g.add(roof);
    }
    function buildTaleju() {
      const s = SITE.taleju, g = group(s.x, s.z, s.ry);
      const wallH = 3.2, size = 30;
      [[0, -size / 2, size, 0.5], [0, size / 2, size, 0.5], [-size / 2, 0, 0.5, size], [size / 2, 0, 0.5, size]].forEach((w) => {
        const seg = new THREE.Mesh(new THREE.BoxGeometry(w[2], wallH, w[3]), M.brickDeep);
        seg.position.set(w[0], wallH / 2, w[1]); seg.receiveShadow = true; seg.castShadow = true; g.add(seg);
      });
      const temple = pagoda({ tiers: 3, baseW: 11, baseD: 11, tierWallH: 2.0, tierRoofH: 2.4, plinthSteps: 12, plinthStepH: 0.42, finialH: 3.2, giltTop: true });
      g.add(temple);
    }
    function buildSingle(key, height) {
      const s = SITE[key], g = group(s.x, s.z, s.ry);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(7, height, 6), M.woodMed);
      wall.position.y = height / 2; wall.castShadow = true; wall.receiveShadow = true; g.add(wall);
      const roof = pyramidRoof(4.6, 4.0, 1.8, M.roof); roof.position.y = height + 0.9; g.add(roof);
    }
    function buildSinghaSattal() {
      const s = SITE.singhaSattal, g = group(s.x, s.z, s.ry);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(13, 4.6, 7), M.woodMed);
      wall.position.y = 2.3; wall.castShadow = true; wall.receiveShadow = true; g.add(wall);
      const roof = pyramidRoof(7.5, 4.6, 2.0, M.roof); roof.position.y = 5.3; g.add(roof);
      addStruts(g, 4.6, 6.5, 3.5, 7, 0.8);
    }

    /* ---- roads: ribbon strips following real polylines ---- */
    function buildRoad(def) {
      const pts = def.pts.map((p) => new THREE.Vector3(p[0], 0, p[1]));
      const grp = new THREE.Group();
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const dx = b.x - a.x, dz = b.z - a.z;
        const len = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);
        const geo = new THREE.PlaneGeometry(len + 0.6, def.width);
        geo.rotateX(-Math.PI / 2);
        const seg = new THREE.Mesh(geo, M.road);
        seg.rotation.y = -angle;
        seg.position.set((a.x + b.x) / 2, 0.02, (a.z + b.z) / 2);
        seg.receiveShadow = true;
        grp.add(seg);
      }
      pts.forEach((p) => {
        const circ = new THREE.Mesh(new THREE.CircleGeometry(def.width / 2, 16), M.road);
        circ.rotation.x = -Math.PI / 2;
        circ.position.set(p.x, 0.021, p.z);
        circ.receiveShadow = true;
        grp.add(circ);
      });
      root.add(grp);
    }

    /* ---- shop-house rows along the streets, offset from road centerlines ---- */
    function shopRow(x0, z0, x1, z1, count, facing, offset) {
      const dx = (x1 - x0) / count, dz = (z1 - z0) / count;
      for (let i = 0; i < count; i++) {
        const x = x0 + dx * (i + 0.5), z = z0 + dz * (i + 0.5);
        const g = group(x, z, facing);
        g.position.x += Math.cos(facing) * offset * 0;
        const w = Math.max(4, Math.abs(dx || dz) * 0.82), depth = 4.2, h = rnd(4.6, 6.4);
        const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, depth), Math.random() > 0.5 ? M.brickWall : M.brickDeep);
        wall.position.y = h / 2; wall.castShadow = true; wall.receiveShadow = true; g.add(wall);
        const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.3, depth + 0.8), M.roof);
        roof.position.y = h + 0.15; roof.rotation.z = rnd(-0.05, 0.05); g.add(roof);
        const shop = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, 1.8, 0.15), M.darkWood);
        shop.position.set(0, 0.9, depth / 2 + 0.02); g.add(shop);
        for (let s = 1; s < Math.floor(h / 2.1); s++) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(w * 0.22, 1.0, 0.1), M.woodDark);
          win.position.set(rnd(-w * 0.25, w * 0.25), 1.8 + s * 2.1, depth / 2 + 0.02);
          g.add(win);
        }
      }
    }

    /* ---- people & prayer flags ---- */
    const peopleMats = [0x8a3b2e, 0x2e4a63, 0x5a5236, 0x704a86, 0x3c6b4f, 0xb08a3e].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }));
    function person(x, z) {
      const g = new THREE.Group();
      const m = peopleMats[Math.floor(Math.random() * peopleMats.length)];
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.75, 4, 8), m);
      body.position.y = 0.7; body.castShadow = true;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), new THREE.MeshStandardMaterial({ color: 0xd8a878, roughness: 0.9 }));
      head.position.y = 1.28; head.castShadow = true;
      g.add(body, head);
      g.position.set(x, 0, z);
      g.rotation.y = Math.random() * Math.PI * 2;
      root.add(g);
    }
    function scatterPeople(cx, cz, r, n) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, rr = Math.random() * r;
        person(cx + Math.cos(a) * rr, cz + Math.sin(a) * rr);
      }
    }
    function prayerFlags(x0, z0, x1, z1, y0, y1, sag) {
      const colors = [0x1a4fa0, 0xffffff, 0xc0392b, 0x1f8a3b, 0xe4b429];
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x0, y0, z0),
        new THREE.Vector3((x0 + x1) / 2, (y0 + y1) / 2 - sag, (z0 + z1) / 2),
        new THREE.Vector3(x1, y1, z1)
      ]);
      const pts = curve.getPoints(14);
      for (let i = 0; i < pts.length - 1; i++) {
        const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.32), new THREE.MeshStandardMaterial({ color: colors[i % colors.length], side: THREE.DoubleSide, roughness: 0.9 }));
        flag.position.copy(pts[i]);
        flag.rotation.y = Math.random() * 0.6;
        root.add(flag);
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      root.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x3a2c1c })));
    }

    /* ---- labels ---- */
    const labelsGroup = new THREE.Group();
    scene.add(labelsGroup);
    function makeTextSprite(text) {
      const c = mkCanvas(360, 72), ctx = c.getContext('2d');
      ctx.font = '600 34px Georgia, serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.95)'; ctx.shadowBlur = 8;
      ctx.fillStyle = '#f5e9cd';
      ctx.fillText(text, 180, 38);
      const tex = new THREE.CanvasTexture(c);
      const spm = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true });
      const sp = new THREE.Sprite(spm);
      sp.scale.set(9, 1.8, 1);
      return sp;
    }
    function buildLabels() {
      const items = [
        ['Kasthamandap', SITE.kasthamandap, 10],
        ['Trailokya Mohan', SITE.trailokyaMohan, 8],
        ['Maju Dega', SITE.majuDega, 10.5],
        ['Kumari Ghar', SITE.kumariGhar, 9.5],
        ['Hanuman Dhoka', SITE.hanumanGate, 8.5],
        ['Gaddi Baithak', SITE.gaddiBaithak, 9.5],
        ['Basantapur Tower', SITE.basantapurTower, 19],
        ['Jagannath Temple', SITE.jagannath, 7],
        ['Kageshwor Temple', SITE.kageshwor, 8],
        ['Kal Bhairav', SITE.kalBhairav, 6.6],
        ['Degutale Temple', SITE.degutale, 8.5],
        ['Taleju Temple', SITE.taleju, 16],
        ['Tarani Devi Temple', SITE.taraniDevi, 7],
        ['Panch Mukti Hanuman', SITE.panchMuktiHanuman, 7],
        ['Big Bell', SITE.bigBell, 4.6],
        ['Singha Sattal', SITE.singhaSattal, 6.4]
      ];
      items.forEach((it) => {
        const sp = makeTextSprite(it[0]);
        sp.position.set(it[1].x, it[2], it[1].z);
        labelsGroup.add(sp);
      });
    }

    /* ---- build sequence ---- */
    const steps = [
      () => {
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(460, 460), mat(TEX.plaza, { ru: 64, rv: 64, roughness: 0.95 }));
        ground.rotation.x = -Math.PI / 2;
        ground.position.set(50, 0, 50);
        ground.receiveShadow = true;
        root.add(ground);
      },
      () => ROADS.forEach(buildRoad),
      buildKasthamandap,
      buildAshokBinayak,
      buildSmallShiva,
      () => placePagoda('trailokyaMohan', { tiers: 3, baseW: 8, baseD: 8, tierWallH: 1.5, tierRoofH: 1.8, plinthSteps: 4, finialH: 2.0 }),
      () => placePagoda('majuDega', { tiers: 3, baseW: 9.5, baseD: 9.5, tierWallH: 1.7, tierRoofH: 2.0, plinthSteps: 9, plinthStepH: 0.42, finialH: 2.4 }),
      buildKumariGhar,
      buildGaddiBaithak,
      buildHanumanGate,
      buildBasantapurTower,
      () => placePagoda('jagannath', { tiers: 2, baseW: 8.5, baseD: 8.5, tierWallH: 1.7, tierRoofH: 1.9, plinthSteps: 3, finialH: 1.8 }),
      () => placePagoda('kageshwor', { tiers: 2, baseW: 6, baseD: 6, tierWallH: 1.4, tierRoofH: 1.6, plinthSteps: 2, finialH: 1.5 }),
      () => buildSingle('gorakhnath', 3.4),
      buildKalBhairav,
      () => placePagoda('degutale', { tiers: 3, baseW: 6.5, baseD: 6.5, tierWallH: 1.5, tierRoofH: 1.7, plinthSteps: 2, finialH: 2.0, wallMat: M.woodDark }),
      buildBell,
      buildTaleju,
      () => buildSingle('taraniDevi', 3.2),
      () => buildSingle('panchMuktiHanuman', 3.6),
      buildSinghaSattal,
      () => {
        shopRow(-14, -34, -6, -96, 6, 0, 0);
        shopRow(6, -34, 10, -96, 5, Math.PI, 0);
        shopRow(-70, 45, -34, 70, 6, Math.PI / 2, 0);
        shopRow(-70, 90, -34, 115, 6, -Math.PI / 2, 0);
        shopRow(150, 20, 150, 90, 6, -Math.PI / 2, 0);
      },
      () => {
        scatterPeople(0, 15, 12, 9);
        scatterPeople(25, 30, 14, 11);
        scatterPeople(60, 65, 12, 7);
        scatterPeople(68, 92, 10, 6);
        scatterPeople(42, -6, 9, 5);
        prayerFlags(-6, 10, 40, -8, 9, 12, 2.2);
        prayerFlags(20, 30, 70, 70, 10, 8, 3.0);
      },
      buildLabels
    ];

    T.scene = scene; T.camera = camera; T.renderer = renderer; T.controls = controls; T.labelsGroup = labelsGroup;

    let idx = 0;
    let cancelled = false;
    function runSteps() {
      if (cancelled) return;
      if (idx >= steps.length) { setLoaded(true); return; }
      try { steps[idx](); } catch (e) { console.error(e); }
      idx++;
      setProgress(Math.round((idx / steps.length) * 100));
      setTimeout(() => requestAnimationFrame(runSteps), 8);
    }
    runSteps();

    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      controls.update();
      drawMinimap();
      renderer.render(scene, camera);
    }
    function drawMinimap() {
      const canvas = minimapRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const scale = 0.72, offX = 90, offY = 150;
      ctx.fillStyle = '#1b140d';
      ctx.fillRect(0, 0, 200, 200);
      ctx.strokeStyle = 'rgba(201,160,74,0.28)';
      ROADS.forEach((r) => {
        ctx.beginPath();
        r.pts.forEach((p, i) => {
          const x = offX + p[0] * scale, y = offY - p[1] * scale;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });
      ctx.fillStyle = 'rgba(201,160,74,0.8)';
      Object.keys(SITE).forEach((k) => {
        const s = SITE[k];
        const x = offX + s.x * scale, y = offY - s.z * scale;
        ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#5ac8ff';
      const cx = offX + camera.position.x * scale, cy = offY - camera.position.z * scale;
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(90,200,255,0.5)'; ctx.lineWidth = 1;
      const tx = offX + controls.target.x * scale, ty = offY - controls.target.z * scale;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tx, ty); ctx.stroke();
    }
    animate();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
      controls.dispose();
      renderer.dispose();
      if (mount && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
    };
  }, []);

  useEffect(() => {
    if (three.current.labelsGroup) three.current.labelsGroup.visible = labelsOn;
  }, [labelsOn]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#0a0a0c', overflow: 'hidden', fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, background: '#0d0a08', color: '#f2e9d8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 600, fontSize: '1.4rem', margin: '0 0 0.6rem', color: '#c9a04a' }}>काठमाडौँ दरबार क्षेत्र</h1>
          <div style={{ color: '#d8cbb0', fontSize: '0.8rem' }}>Kathmandu Durbar Square — building the scene</div>
          <div style={{ width: 240, height: 3, background: '#3a2c1c', borderRadius: 2, overflow: 'hidden', marginTop: 14 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#c9a04a,#e9cd8a)', transition: 'width .2s ease' }} />
          </div>
          <p style={{ opacity: 0.55, fontSize: '0.75rem', marginTop: 10, letterSpacing: '0.5px' }}>placing buildings on the real street grid…</p>
        </div>
      )}

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 16, pointerEvents: 'none' }}>
        <div>
          <div style={{ background: 'rgba(24,17,10,0.82)', backdropFilter: 'blur(6px)', border: '1px solid rgba(201,160,74,.35)', borderRadius: 10, padding: '10px 16px', pointerEvents: 'auto', maxWidth: 360 }}>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#c9a04a', fontSize: '1.05rem', margin: '0 0 3px', letterSpacing: '.3px' }}>Kathmandu Durbar Square</h1>
            <p style={{ color: '#d8cbb0', fontSize: '.72rem', lineHeight: 1.4, margin: 0, opacity: .85 }}>
              React + Three.js reconstruction, laid out on the real street network (Layaku Marg / Yogbir Singh Marg, Ganga Path, Yatkha Road) from your map screenshots.
            </p>
          </div>
          <button
            onClick={() => setShowNote((v) => !v)}
            style={{ pointerEvents: 'auto', background: 'rgba(24,17,10,0.82)', border: '1px solid rgba(201,160,74,.35)', color: '#c9a04a', borderRadius: 10, padding: '8px 12px', fontSize: '.7rem', cursor: 'pointer', marginTop: 8, display: 'block' }}
          >
            ⓘ about the accuracy of this model
          </button>
          {showNote && (
            <div style={{ background: 'rgba(24,17,10,0.82)', border: '1px solid rgba(201,160,74,.35)', borderRadius: 10, padding: '10px 14px', color: '#d8cbb0', fontSize: '.7rem', lineHeight: 1.45, maxWidth: 360, marginTop: 8, pointerEvents: 'auto' }}>
              Positions were derived by pixel-analyzing your two map screenshots (marker colors, road curves) rather than by eye — this fixes the real street network and correct adjacency/clustering. The overall scale is anchored to one measured real distance (Kasthamandap → Kal Bhairav ≈ 159m). It is still a hand-built reconstruction, not a certified survey or LIDAR scan, so treat exact spacing beyond that anchor as a well-reasoned estimate rather than ground truth. Building forms follow published photos of each monument.
            </div>
          )}
        </div>

        <div style={{ pointerEvents: 'auto', background: 'rgba(24,17,10,0.82)', backdropFilter: 'blur(6px)', border: '1px solid rgba(201,160,74,.35)', borderRadius: 10, padding: 10, width: 224, maxHeight: '78vh', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '1.2px', color: '#c9a04a', margin: '2px 6px 8px', opacity: .9 }}>Fly to a monument</h2>
          {PRESETS.map((p, i) => (
            <div
              key={p.name}
              onClick={() => flyTo(p, i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 6px', borderRadius: 6,
                cursor: 'pointer', color: '#e8ddc4', fontSize: '.75rem',
                background: activeIdx === i ? 'rgba(201,160,74,0.28)' : 'transparent'
              }}
              onMouseEnter={(e) => { if (activeIdx !== i) e.currentTarget.style.background = 'rgba(201,160,74,0.16)'; }}
              onMouseLeave={(e) => { if (activeIdx !== i) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a04a', flex: 'none' }} />
              {p.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 10, background: 'rgba(24,17,10,0.82)', border: '1px solid rgba(201,160,74,.35)', borderRadius: 10, padding: 8 }}>
        <canvas ref={minimapRef} width={200} height={200} style={{ display: 'block', borderRadius: 6 }} />
        <div style={{ color: '#c9b78e', fontSize: '.62rem', textAlign: 'center', marginTop: 4, letterSpacing: '.4px' }}>plan view · roads &amp; buildings · blue = you</div>
      </div>

      <div
        onClick={() => setLabelsOn((v) => !v)}
        style={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(24,17,10,0.82)', border: '1px solid rgba(201,160,74,.35)', borderRadius: 20, padding: '8px 16px', color: '#c9a04a', fontSize: '.72rem', cursor: 'pointer', userSelect: 'none' }}
      >
        Toggle name labels
      </div>

      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10, background: 'rgba(24,17,10,0.82)', border: '1px solid rgba(201,160,74,.35)', borderRadius: 10, padding: '9px 13px', color: '#d8cbb0', fontSize: '.68rem', lineHeight: 1.5, maxWidth: 230 }}>
        <b style={{ color: '#c9a04a' }}>Drag</b> to orbit · <b style={{ color: '#c9a04a' }}>scroll</b> to zoom · <b style={{ color: '#c9a04a' }}>right-drag</b> to pan.<br />
        Click a monument on the right to fly there.
      </div>
    </div>
  );
}
