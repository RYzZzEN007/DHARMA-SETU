import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrayerWheel = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    // Dynamically import Three.js
    let scriptElement: HTMLScriptElement | null = null;
    
    const loadThreeJS = async () => {
      // Create script element for Three.js
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      scriptElement.onload = () => {
        initPrayerWheel();
      };
      document.head.appendChild(scriptElement);
    };

    const initPrayerWheel = () => {
      if (!mountRef.current || !(window as any).THREE) return;

      const THREE = (window as any).THREE;
      const container = mountRef.current;

      // Clear any existing content
      container.innerHTML = '';

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a1a2e);

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 8);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // Lighting setup
      const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      // Create prayer wheel group
      const prayerWheelGroup = new THREE.Group();

      // Drum (cylindrical part)
      const drumGeometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
      const drumMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B4513,
        shininess: 30 
      });
      const drum = new THREE.Mesh(drumGeometry, drumMaterial);
      drum.castShadow = true;
      drum.receiveShadow = true;
      prayerWheelGroup.add(drum);

      // Top cap
      const topCapGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32);
      const capMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFD700,
        shininess: 100 
      });
      const topCap = new THREE.Mesh(topCapGeometry, capMaterial);
      topCap.position.y = 1.35;
      topCap.castShadow = true;
      prayerWheelGroup.add(topCap);

      // Bottom cap
      const bottomCap = new THREE.Mesh(topCapGeometry, capMaterial);
      bottomCap.position.y = -1.35;
      bottomCap.castShadow = true;
      prayerWheelGroup.add(bottomCap);

      // Decorative golden rims
      const rimGeometry = new THREE.TorusGeometry(1.25, 0.05, 8, 32);
      const rimMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFD700,
        shininess: 100 
      });
      
      const topRim1 = new THREE.Mesh(rimGeometry, rimMaterial);
      topRim1.position.y = 0.8;
      topRim1.rotation.x = Math.PI / 2;
      prayerWheelGroup.add(topRim1);

      const topRim2 = new THREE.Mesh(rimGeometry, rimMaterial);
      topRim2.position.y = 0.4;
      topRim2.rotation.x = Math.PI / 2;
      prayerWheelGroup.add(topRim2);

      const bottomRim1 = new THREE.Mesh(rimGeometry, rimMaterial);
      bottomRim1.position.y = -0.8;
      bottomRim1.rotation.x = Math.PI / 2;
      prayerWheelGroup.add(bottomRim1);

      const bottomRim2 = new THREE.Mesh(rimGeometry, rimMaterial);
      bottomRim2.position.y = -0.4;
      bottomRim2.rotation.x = Math.PI / 2;
      prayerWheelGroup.add(bottomRim2);

      // Wooden handle
      const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8);
      const handleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x654321,
        shininess: 10 
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.set(1.5, 0, 0);
      handle.rotation.z = Math.PI / 2;
      handle.castShadow = true;
      prayerWheelGroup.add(handle);

      // Handle grip
      const gripGeometry = new THREE.SphereGeometry(0.15, 8, 8);
      const grip = new THREE.Mesh(gripGeometry, handleMaterial);
      grip.position.set(2.2, 0, 0);
      grip.castShadow = true;
      prayerWheelGroup.add(grip);

      scene.add(prayerWheelGroup);

      // Animation variables
      let angularVelocity = 0;
      const damping = 0.95;
      const sensitivity = 0.01;

      // Mouse/touch interaction
      let isDragging = false;
      let previousX = 0;

      const handleStart = (clientX: number) => {
        isDragging = true;
        previousX = clientX;
      };

      const handleMove = (clientX: number) => {
        if (!isDragging) return;
        
        const deltaX = clientX - previousX;
        angularVelocity += deltaX * sensitivity;
        previousX = clientX;
      };

      const handleEnd = () => {
        isDragging = false;
      };

      // Mouse events
      const onMouseDown = (event: MouseEvent) => {
        handleStart(event.clientX);
      };

      const onMouseMove = (event: MouseEvent) => {
        handleMove(event.clientX);
      };

      const onMouseUp = () => {
        handleEnd();
      };

      // Touch events
      const onTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        handleStart(event.touches[0].clientX);
      };

      const onTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        handleMove(event.touches[0].clientX);
      };

      const onTouchEnd = (event: TouchEvent) => {
        event.preventDefault();
        handleEnd();
      };

      // Add event listeners
      renderer.domElement.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      renderer.domElement.addEventListener('touchstart', onTouchStart);
      renderer.domElement.addEventListener('touchmove', onTouchMove);
      renderer.domElement.addEventListener('touchend', onTouchEnd);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Apply rotation with damping
        prayerWheelGroup.rotation.y += angularVelocity;
        angularVelocity *= damping;

        // Render
        renderer.render(scene, camera);
      };

      // Handle window resize
      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      };

      window.addEventListener('resize', handleResize);

      // Start animation
      animate();

      // Cleanup function
      return () => {
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        renderer.domElement.removeEventListener('touchstart', onTouchStart);
        renderer.domElement.removeEventListener('touchmove', onTouchMove);
        renderer.domElement.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('resize', handleResize);
        container.innerHTML = '';
        if (scriptElement && document.head.contains(scriptElement)) {
          document.head.removeChild(scriptElement);
        }
      };
    };

    loadThreeJS();
  }, []);

  const downloadStandaloneFile = () => {
    const standaloneHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tibetan Prayer Wheel - 3D Interactive</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            overflow: hidden;
        }

        #container {
            width: 100vw;
            height: 100vh;
            position: relative;
        }

        #info {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 100;
            background: rgba(0, 0, 0, 0.7);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            max-width: 300px;
        }

        #info h1 {
            color: #FFD700;
            margin-bottom: 10px;
            font-size: 1.2em;
        }

        #info p {
            margin-bottom: 8px;
            line-height: 1.4;
            font-size: 0.9em;
        }

        #instructions {
            position: absolute;
            bottom: 20px;
            right: 20px;
            z-index: 100;
            background: rgba(0, 0, 0, 0.7);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            text-align: center;
        }

        .highlight {
            color: #FFD700;
            font-weight: bold;
        }

        canvas {
            display: block;
            cursor: grab;
        }

        canvas:active {
            cursor: grabbing;
        }

        @media (max-width: 768px) {
            #info, #instructions {
                font-size: 0.8em;
                padding: 10px;
                max-width: 200px;
            }
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="info">
            <h1>🙏 Tibetan Prayer Wheel</h1>
            <p>This sacred prayer wheel responds to your touch, spinning with natural inertia just like a real one.</p>
            <p><span class="highlight">Desktop:</span> Click and drag left/right</p>
            <p><span class="highlight">Mobile:</span> Touch and drag</p>
        </div>
        
        <div id="instructions">
            <p><span class="highlight">Spin the wheel</span> to activate blessings</p>
            <p>Watch it slowly come to rest with realistic physics</p>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Scene setup
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x1a1a2e);

            // Camera setup
            const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.set(0, 0, 8);

            // Renderer setup
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.setClearColor(0x1a1a2e, 1);
            
            const container = document.getElementById('container');
            container.appendChild(renderer.domElement);

            // Enhanced lighting setup
            const ambientLight = new THREE.HemisphereLight(0x404040, 0x2a2a3e, 0.4);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
            directionalLight.position.set(5, 10, 5);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 50;
            scene.add(directionalLight);

            // Additional accent light
            const accentLight = new THREE.DirectionalLight(0xFFD700, 0.3);
            accentLight.position.set(-3, 5, -3);
            scene.add(accentLight);

            // Create prayer wheel group
            const prayerWheelGroup = new THREE.Group();

            // Main drum (cylindrical part) with enhanced materials
            const drumGeometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
            const drumMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x8B4513,
                shininess: 30,
                specular: 0x444444
            });
            const drum = new THREE.Mesh(drumGeometry, drumMaterial);
            drum.castShadow = true;
            drum.receiveShadow = true;
            prayerWheelGroup.add(drum);

            // Top cap with golden material
            const topCapGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32);
            const capMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xFFD700,
                shininess: 100,
                specular: 0xFFFFFF
            });
            const topCap = new THREE.Mesh(topCapGeometry, capMaterial);
            topCap.position.y = 1.35;
            topCap.castShadow = true;
            prayerWheelGroup.add(topCap);

            // Bottom cap
            const bottomCap = new THREE.Mesh(topCapGeometry, capMaterial);
            bottomCap.position.y = -1.35;
            bottomCap.castShadow = true;
            prayerWheelGroup.add(bottomCap);

            // Decorative golden rims with enhanced detail
            const rimGeometry = new THREE.TorusGeometry(1.25, 0.05, 8, 32);
            const rimMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xFFD700,
                shininess: 100,
                specular: 0xFFFFFF
            });
            
            // Multiple decorative rims
            const rimPositions = [0.8, 0.4, -0.4, -0.8];
            rimPositions.forEach(y => {
                const rim = new THREE.Mesh(rimGeometry, rimMaterial);
                rim.position.y = y;
                rim.rotation.x = Math.PI / 2;
                rim.castShadow = true;
                prayerWheelGroup.add(rim);
            });

            // Wooden handle with realistic texture
            const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8);
            const handleMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x654321,
                shininess: 10,
                specular: 0x222222
            });
            const handle = new THREE.Mesh(handleGeometry, handleMaterial);
            handle.position.set(1.5, 0, 0);
            handle.rotation.z = Math.PI / 2;
            handle.castShadow = true;
            prayerWheelGroup.add(handle);

            // Handle grip
            const gripGeometry = new THREE.SphereGeometry(0.15, 8, 8);
            const grip = new THREE.Mesh(gripGeometry, handleMaterial);
            grip.position.set(2.2, 0, 0);
            grip.castShadow = true;
            prayerWheelGroup.add(grip);

            // Central axle
            const axleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 3, 8);
            const axleMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x333333,
                shininess: 50
            });
            const axle = new THREE.Mesh(axleGeometry, axleMaterial);
            axle.castShadow = true;
            prayerWheelGroup.add(axle);

            // Add some decorative elements (simplified mantras representation)
            const decorGeometry = new THREE.RingGeometry(0.8, 1.1, 8);
            const decorMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x444444,
                transparent: true,
                opacity: 0.3
            });
            
            for (let i = 0; i < 3; i++) {
                const decor = new THREE.Mesh(decorGeometry, decorMaterial);
                decor.position.y = -0.5 + i * 0.5;
                decor.rotation.x = Math.PI / 2;
                prayerWheelGroup.add(decor);
            }

            scene.add(prayerWheelGroup);

            // Enhanced physics simulation
            let angularVelocity = 0;
            const damping = 0.95;          // Natural friction
            const sensitivity = 0.01;      // Mouse sensitivity
            const minVelocity = 0.001;     // Stop threshold

            // Interaction variables
            let isDragging = false;
            let previousX = 0;
            let lastInteractionTime = 0;

            // Unified input handling
            const handleStart = (clientX) => {
                isDragging = true;
                previousX = clientX;
                lastInteractionTime = Date.now();
            };

            const handleMove = (clientX) => {
                if (!isDragging) return;
                
                const currentTime = Date.now();
                const deltaTime = currentTime - lastInteractionTime;
                const deltaX = clientX - previousX;
                
                // Add velocity based on movement speed
                if (deltaTime > 0) {
                    const speed = deltaX / deltaTime;
                    angularVelocity += speed * sensitivity * 100;
                }
                
                previousX = clientX;
                lastInteractionTime = currentTime;
            };

            const handleEnd = () => {
                isDragging = false;
            };

            // Mouse event handlers
            const onMouseDown = (event) => {
                event.preventDefault();
                handleStart(event.clientX);
            };

            const onMouseMove = (event) => {
                if (isDragging) {
                    event.preventDefault();
                    handleMove(event.clientX);
                }
            };

            const onMouseUp = (event) => {
                event.preventDefault();
                handleEnd();
            };

            // Touch event handlers
            const onTouchStart = (event) => {
                event.preventDefault();
                if (event.touches.length === 1) {
                    handleStart(event.touches[0].clientX);
                }
            };

            const onTouchMove = (event) => {
                event.preventDefault();
                if (event.touches.length === 1 && isDragging) {
                    handleMove(event.touches[0].clientX);
                }
            };

            const onTouchEnd = (event) => {
                event.preventDefault();
                handleEnd();
            };

            // Add event listeners
            renderer.domElement.addEventListener('mousedown', onMouseDown, { passive: false });
            document.addEventListener('mousemove', onMouseMove, { passive: false });
            document.addEventListener('mouseup', onMouseUp, { passive: false });
            
            renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
            renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
            renderer.domElement.addEventListener('touchend', onTouchEnd, { passive: false });

            // Prevent context menu on right click
            renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

            // Animation loop with enhanced physics
            const animate = () => {
                requestAnimationFrame(animate);

                // Apply rotation with realistic physics
                if (Math.abs(angularVelocity) > minVelocity) {
                    prayerWheelGroup.rotation.y += angularVelocity;
                    angularVelocity *= damping;
                } else if (!isDragging) {
                    angularVelocity = 0; // Full stop when very slow
                }

                // Subtle camera movement for dynamic feel
                const time = Date.now() * 0.0005;
                camera.position.x = Math.sin(time) * 0.2;
                camera.position.y = Math.cos(time * 0.7) * 0.1;
                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            };

            // Responsive design
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            // Start the animation
            animate();

            // Optional: Add a gentle initial spin
            setTimeout(() => {
                angularVelocity = 0.02;
            }, 1000);
        });
    </script>
</body>
</html>`;

    const blob = new Blob([standaloneHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tibetan-prayer-wheel.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Heritage
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={downloadStandaloneFile}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Download HTML
        </Button>
      </div>

      {/* Title */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
          Sacred Prayer Wheel
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Drag left or right to spin • Experience the sacred rotation
        </p>
      </div>

      {/* Three.js Container */}
      <div 
        ref={mountRef} 
        className="w-full h-screen"
        style={{ cursor: 'grab' }}
      />

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white/90">
          <p className="text-sm">
            🙏 <span className="font-semibold">Desktop:</span> Click and drag • 
            <span className="font-semibold ml-2">Mobile:</span> Touch and drag
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerWheel;