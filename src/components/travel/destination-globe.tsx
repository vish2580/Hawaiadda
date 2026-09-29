import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { destinations } from "@/data/destinations";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query";

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function DestinationGlobe({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const [paused, setPaused] = useState(false);
  const renderRef = useRef<() => void>(() => {});
  const host = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeId);
  const reducedMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => { activeRef.current = activeId; renderRef.current(); }, [activeId]);

  useEffect(() => {
    const element = host.current;
    if (!element || !window.WebGLRenderingContext) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 7;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: "low-power" }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.15 : 1.65));
    element.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    group.rotation.y = -1.6;
    const radius = 2.25;
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(radius, mobile ? 32 : 56, mobile ? 22 : 40),
      new THREE.MeshBasicMaterial({ color: 0x0b1116, transparent: true, opacity: 0.88 }),
    );
    group.add(globe);
    const wireSource = new THREE.SphereGeometry(radius + 0.012, mobile ? 18 : 28, mobile ? 12 : 18);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireSource),
      new THREE.LineBasicMaterial({ color: 0x78dce8, transparent: true, opacity: 0.11 }),
    );
    wireSource.dispose();
    group.add(wire);

    const markers = destinations.map((destination) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xf0b35a }),
      );
      marker.position.copy(latLngToVector3(destination.coordinates[0], destination.coordinates[1], radius + 0.05));
      marker.userData.id = destination.id;
      group.add(marker);
      return marker;
    });

    const arcMaterial = new THREE.LineBasicMaterial({ color: 0xf0b35a, transparent: true, opacity: 0.42 });
    for (let index = 0; index < destinations.length - 1; index += 1) {
      const start = latLngToVector3(...destinations[index].coordinates, radius + 0.04);
      const end = latLngToVector3(...destinations[index + 1].coordinates, radius + 0.04);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius + 0.8);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), arcMaterial.clone()));
    }

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const click = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      if (moved > 5) return;
      const hit = raycaster.intersectObjects([globe, ...markers])[0];
      if (hit?.object.userData.id) onSelect(hit.object.userData.id as string);
    };
    renderer.domElement.addEventListener("pointerup", click);
    renderer.domElement.style.cursor = "grab";

    let moved = 0;
    let dragging = false;
    let lastX = 0;
    const down = (event: PointerEvent) => { dragging = true; moved = 0; lastX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => { if (dragging) { moved += Math.abs(event.clientX - lastX); group.rotation.y += (event.clientX - lastX) * 0.006; lastX = event.clientX; renderRef.current(); } };
    const up = () => { dragging = false; };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);

    const resize = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderRef.current();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();

    let visible = false;
    let frame = 0;
    const draw = () => {
      markers.forEach((marker) => {
        const selected = marker.userData.id === activeRef.current;
        marker.scale.setScalar(selected ? 1.8 : 1);
        (marker.material as THREE.MeshBasicMaterial).color.setHex(selected ? 0x78dce8 : 0xf0b35a);
      });
      renderer.render(scene, camera);
    };
    renderRef.current = draw;
    const animate = () => {
      if (!visible || document.hidden || reducedMotion || paused) return;
      if (!dragging) group.rotation.y += mobile ? 0.00065 : 0.0012;
      draw();
      frame = requestAnimationFrame(animate);
    };
    const restart = () => { cancelAnimationFrame(frame); draw(); animate(); };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    visibility.observe(element);
    document.addEventListener("visibilitychange", restart);
    renderer.domElement.addEventListener("pointercancel", up);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      renderRef.current = () => {};
      document.removeEventListener("visibilitychange", restart);
      renderer.domElement.removeEventListener("pointercancel", up);
      renderer.domElement.removeEventListener("pointerup", click);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      arcMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [mobile, onSelect, reducedMotion, paused]);

  return (
    <div className="relative aspect-square w-full max-w-[650px]" role="group" aria-label="Interactive globe showing featured destinations. Drag to rotate or select a destination marker.">
      <div ref={host} className="absolute inset-0" />
      <button type="button" className="absolute right-2 top-2 border border-white/20 px-3 py-2 text-xs" onClick={() => setPaused(!paused)}>{paused ? "Rotate globe" : "Pause globe"}</button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-smoke">Drag the globe to explore</p>
    </div>
  );
}
