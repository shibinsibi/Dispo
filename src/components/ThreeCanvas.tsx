import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MaterialFinish } from '../types';

interface ThreeCanvasProps {
  modelType: 'cup' | 'container' | 'box' | 'foil' | 'glove';
  finish: MaterialFinish;
  wireframe?: boolean;
  autoRotate?: boolean;
  className?: string;
  cameraDistance?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  modelType,
  finish,
  wireframe = false,
  autoRotate = true,
  className = 'w-full h-full min-h-[340px]',
  cameraDistance = 4.2
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const reqIdRef = useRef<number | null>(null);
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 340;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, cameraDistance);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Studio 3-point lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5f3fc, 0.6); // Soft cool fill
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x34d399, 0.5); // Eco emerald rim
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // 5. Floor shadow plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. Model Group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // 7. Mouse/Touch Orbit interactions
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.009;
      groupRef.current.rotation.x += deltaY * 0.009;

      // Clamp vertical rotation
      groupRef.current.rotation.x = Math.max(-0.6, Math.min(0.8, groupRef.current.rotation.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !groupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;
      groupRef.current.rotation.x = Math.max(-0.6, Math.min(0.8, groupRef.current.rotation.x));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.003;
      cameraRef.current.position.z = Math.max(2.5, Math.min(7.0, cameraRef.current.position.z));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // 8. Animation loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (autoRotateRef.current && !isDraggingRef.current && groupRef.current) {
        groupRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      domElement.removeEventListener('wheel', onWheel);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [cameraDistance]);

  // Update 3D Geometry and Materials when modelType, finish, or wireframe change
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Clear previous model parts
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach(m => m.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
      group.remove(child);
    }

    // Material definitions based on finish
    let mainColor = 0xb45309; // Kraft default
    let roughness = 0.85;
    let metalness = 0.05;

    if (finish === 'kraft') {
      mainColor = 0xc27838;
      roughness = 0.88;
      metalness = 0.02;
    } else if (finish === 'white') {
      mainColor = 0xf8fafc;
      roughness = 0.45;
      metalness = 0.05;
    } else if (finish === 'aluminum') {
      mainColor = 0xd1d5db;
      roughness = 0.28;
      metalness = 0.88;
    } else if (finish === 'bagasse') {
      mainColor = 0xe2d4b7;
      roughness = 0.95;
      metalness = 0.01;
    }

    const primaryMaterial = new THREE.MeshStandardMaterial({
      color: mainColor,
      roughness: roughness,
      metalness: metalness,
      wireframe: wireframe,
      side: THREE.DoubleSide
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x059669, // Dispo Green accent
      roughness: 0.35,
      metalness: 0.1,
      wireframe: wireframe
    });

    const lidMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Matte slate lid
      roughness: 0.3,
      metalness: 0.1,
      wireframe: wireframe
    });

    const metallicSilverMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.22,
      metalness: 0.9,
      wireframe: wireframe
    });

    // Build specific 3D Model
    if (modelType === 'cup') {
      // 1. Tapered Cup Body
      const cupGeo = new THREE.CylinderGeometry(0.85, 0.62, 1.9, 36, 1, true);
      const cupMesh = new THREE.Mesh(cupGeo, primaryMaterial);
      cupMesh.castShadow = true;
      group.add(cupMesh);

      // 2. Cup Bottom
      const bottomGeo = new THREE.CircleGeometry(0.62, 36);
      const bottomMesh = new THREE.Mesh(bottomGeo, primaryMaterial);
      bottomMesh.rotation.x = Math.PI / 2;
      bottomMesh.position.y = -0.95;
      group.add(bottomMesh);

      // 3. Ripple sleeve rings
      for (let i = -0.4; i <= 0.4; i += 0.18) {
        const ringGeo = new THREE.TorusGeometry(0.76 - i * 0.06, 0.025, 12, 36);
        const ringMesh = new THREE.Mesh(ringGeo, primaryMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = i;
        group.add(ringMesh);
      }

      // 4. Rounded rim bead
      const rimGeo = new THREE.TorusGeometry(0.86, 0.035, 16, 36);
      const rimMesh = new THREE.Mesh(rimGeo, primaryMaterial);
      rimMesh.rotation.x = Math.PI / 2;
      rimMesh.position.y = 0.95;
      group.add(rimMesh);

      // 5. Drinking Lid
      const lidGeo = new THREE.CylinderGeometry(0.88, 0.88, 0.14, 36);
      const lidMesh = new THREE.Mesh(lidGeo, lidMaterial);
      lidMesh.position.y = 1.02;
      lidMesh.castShadow = true;
      group.add(lidMesh);

      // 6. Sipper hole indent
      const sipGeo = new THREE.BoxGeometry(0.24, 0.05, 0.12);
      const sipMesh = new THREE.Mesh(sipGeo, accentMaterial);
      sipMesh.position.set(0, 1.1, 0.6);
      group.add(sipMesh);

    } else if (modelType === 'container') {
      // Foil / Plastic Meal Container
      const isFoil = finish === 'aluminum';
      const containerMat = isFoil ? metallicSilverMat : primaryMaterial;

      // Base Tray
      const trayGeo = new THREE.BoxGeometry(2.0, 0.65, 1.5);
      const trayMesh = new THREE.Mesh(trayGeo, containerMat);
      trayMesh.position.y = -0.2;
      trayMesh.castShadow = true;
      group.add(trayMesh);

      // Crimped Edge Rim
      const rimGeo = new THREE.BoxGeometry(2.18, 0.08, 1.68);
      const rimMesh = new THREE.Mesh(rimGeo, isFoil ? metallicSilverMat : accentMaterial);
      rimMesh.position.y = 0.15;
      rimMesh.castShadow = true;
      group.add(rimMesh);

      // Inner Compartment Divider
      const divGeo = new THREE.BoxGeometry(0.08, 0.45, 1.4);
      const divMesh = new THREE.Mesh(divGeo, containerMat);
      divMesh.position.set(0.1, -0.05, 0);
      group.add(divMesh);

      // Snap Lid
      const lidGeo = new THREE.BoxGeometry(2.1, 0.05, 1.6);
      const lidTransMat = new THREE.MeshStandardMaterial({
        color: isFoil ? 0xd1d5db : 0xffffff,
        roughness: 0.2,
        metalness: isFoil ? 0.85 : 0.05,
        opacity: isFoil ? 1 : 0.75,
        transparent: !isFoil,
        wireframe: wireframe
      });
      const lidMesh = new THREE.Mesh(lidGeo, lidTransMat);
      lidMesh.position.y = 0.22;
      group.add(lidMesh);

      // Dispo brand badge on lid
      const badgeGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 24);
      const badgeMesh = new THREE.Mesh(badgeGeo, accentMaterial);
      badgeMesh.position.set(-0.4, 0.26, 0);
      group.add(badgeMesh);

    } else if (modelType === 'box') {
      // Folded Takeaway Meal Pail / Bagasse Box
      const boxGeo = new THREE.BoxGeometry(1.5, 1.4, 1.3);
      const boxMesh = new THREE.Mesh(boxGeo, primaryMaterial);
      boxMesh.position.y = 0;
      boxMesh.castShadow = true;
      group.add(boxMesh);

      // Top Flaps Angled
      const flapGeoL = new THREE.BoxGeometry(0.75, 0.04, 1.3);
      const flapMeshL = new THREE.Mesh(flapGeoL, primaryMaterial);
      flapMeshL.position.set(-0.35, 0.72, 0);
      flapMeshL.rotation.z = -0.15;
      group.add(flapMeshL);

      const flapGeoR = new THREE.BoxGeometry(0.75, 0.04, 1.3);
      const flapMeshR = new THREE.Mesh(flapGeoR, primaryMaterial);
      flapMeshR.position.set(0.35, 0.74, 0);
      flapMeshR.rotation.z = 0.15;
      group.add(flapMeshR);

      // Eco leaf emblem plate
      const sealGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 20);
      const sealMesh = new THREE.Mesh(sealGeo, accentMaterial);
      sealMesh.position.set(0, 0.78, 0);
      group.add(sealMesh);

      // Wooden fork resting against the box
      const forkHandleGeo = new THREE.BoxGeometry(0.08, 1.6, 0.03);
      const forkMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.9, wireframe });
      const forkMesh = new THREE.Mesh(forkHandleGeo, forkMat);
      forkMesh.position.set(0.9, -0.1, 0.4);
      forkMesh.rotation.z = -0.25;
      forkMesh.rotation.y = 0.2;
      group.add(forkMesh);

    } else if (modelType === 'foil') {
      // Commercial Aluminum Foil Roll
      const rollGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.4, 32);
      const rollMesh = new THREE.Mesh(rollGeo, metallicSilverMat);
      rollMesh.rotation.z = Math.PI / 2;
      rollMesh.castShadow = true;
      group.add(rollMesh);

      // Inner cardboard hollow core
      const coreGeo = new THREE.CylinderGeometry(0.22, 0.22, 2.42, 24);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.9, wireframe });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.rotation.z = Math.PI / 2;
      group.add(coreMesh);

      // Unrolled foil sheet curling down
      const sheetGeo = new THREE.PlaneGeometry(1.8, 0.9, 8, 8);
      const sheetMesh = new THREE.Mesh(sheetGeo, metallicSilverMat);
      sheetMesh.position.set(0, -0.5, 0.45);
      sheetMesh.rotation.x = Math.PI / 3;
      group.add(sheetMesh);

      // Cutter Box outline
      const boxGeo = new THREE.BoxGeometry(2.6, 0.9, 0.9);
      const cutterBoxMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.4,
        wireframe: wireframe
      });
      const boxMesh = new THREE.Mesh(boxGeo, cutterBoxMat);
      boxMesh.position.set(0, -0.4, -0.6);
      boxMesh.castShadow = true;
      group.add(boxMesh);

      // Cutter blade strip
      const bladeGeo = new THREE.BoxGeometry(2.4, 0.04, 0.04);
      const bladeMesh = new THREE.Mesh(bladeGeo, metallicSilverMat);
      bladeMesh.position.set(0, 0.08, -0.16);
      group.add(bladeMesh);

    } else {
      // Hygiene Dispenser Box & Glove Set
      const boxGeo = new THREE.BoxGeometry(1.8, 0.9, 1.1);
      const boxMesh = new THREE.Mesh(boxGeo, primaryMaterial);
      boxMesh.castShadow = true;
      group.add(boxMesh);

      // Oval pull-out opening
      const holeGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.02, 24);
      const holeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, wireframe });
      const holeMesh = new THREE.Mesh(holeGeo, holeMat);
      holeMesh.position.set(0, 0.46, 0);
      group.add(holeMesh);

      // Emerging glove cuff
      const gloveFoldGeo = new THREE.TorusGeometry(0.32, 0.08, 12, 24);
      const gloveMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.3,
        metalness: 0.1,
        wireframe
      });
      const gloveMesh = new THREE.Mesh(gloveFoldGeo, gloveMat);
      gloveMesh.rotation.x = Math.PI / 2;
      gloveMesh.position.set(0, 0.54, 0);
      group.add(gloveMesh);
    }

    // Default angle tilt for visual perspective
    group.rotation.set(0.2, -0.4, 0);

  }, [modelType, finish, wireframe]);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
      title="Click and drag to rotate in 3D"
    />
  );
};
