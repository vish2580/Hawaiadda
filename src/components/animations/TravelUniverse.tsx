import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query";
export default function TravelUniverse() {
  const host = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const element = host.current;
    if (!element || !window.WebGLRenderingContext) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050607, 0.034);
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 160);
    camera.position.set(0, 2.25, 8);
    camera.lookAt(0, 1.1, -18);
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: "low-power" }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.8));
    renderer.setSize(element.clientWidth, element.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const amber = new THREE.LineBasicMaterial({ color: 0x93dfd6, transparent: true, opacity: 0.85 });
    const dim = new THREE.LineBasicMaterial({ color: 0xf4f2ed, transparent: true, opacity: 0.05 });
    const laneCount = mobile ? 3 : 5;

    for (let index = 0; index < laneCount; index += 1) {
      const x = (index - (laneCount - 1) / 2) * 1.35;
      const points = [new THREE.Vector3(x * 1.4, 0, 5), new THREE.Vector3(x * 0.03, 0, -70)];
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), index === Math.floor(laneCount / 2) ? amber : dim));
    }
    for (let z = 4; z > -70; z -= 2.8) {
      const width = Math.max(0.15, (z + 72) * 0.09);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-width, 0, z), new THREE.Vector3(width, 0, z)]), dim));
    }

    const horizon = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-50, 0.03, -52), new THREE.Vector3(50, 0.03, -52)]),
      new THREE.LineBasicMaterial({ color: 0x93dfd6, transparent: true, opacity: 0.65 }),
    );
    group.add(horizon);

    const starCount = mobile ? 180 : 460;
    const stars = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      stars[index * 3] = (Math.random() - 0.5) * 90;
      stars[index * 3 + 1] = Math.random() * 30 + 1;
      stars[index * 3 + 2] = -Math.random() * 85;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xdde5e8, size: mobile ? 0.05 : 0.065, transparent: true, opacity: 0.6 })));

    const resize = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);

    let frame = 0;
    let visible = true;
    const clock = new THREE.Clock();
    const render = () => {
      if (!visible || document.hidden) return;
      const elapsed = clock.getElapsedTime();
      camera.position.z = 8 - Math.min(window.scrollY / Math.max(element.clientHeight, 1), 1) * 4;
      camera.position.y = 2.25 + Math.sin(elapsed * 0.22) * 0.06;
      if (horizon.material instanceof THREE.LineBasicMaterial) horizon.material.opacity = 0.52 + Math.sin(elapsed) * 0.12;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.cancelAnimationFrame(frame);
      if (visible && !reduceMotion) render();
    }, { rootMargin: "100px" });
    const onVisibility = () => { cancelAnimationFrame(frame); if (!reduceMotion) render(); };
    document.addEventListener("visibilitychange", onVisibility);
    visibilityObserver.observe(element);
    if (reduceMotion) renderer.render(scene, camera);
    else render();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        if (object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [mobile, reduceMotion]);

  return <div ref={host} className="absolute inset-0" aria-hidden="true" />;
}

