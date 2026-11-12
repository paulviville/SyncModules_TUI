import * as THREE from './three/three.module.js';
import { OrbitControls } from './three/controls/OrbitControls.js';
import SceneController from "./SceneController.js";
import ClientManager from "./ClientManager.js";

import GUI from './three/libs/lil-gui.module.min.js';
import GUICore from './SyncModulesGUI/GUICore.js';
import GUIRegistry from './SyncModulesGUI/GUIRegistry.js';
import GUIController from './GUIController.js';
import ImageImportController from './SyncModulesViews/Controllers/ImageImportController.js';
import uuid from './uuid.js';

// const app = document.getElementById('app');
// const btnFs = document.getElementById('btn-fullscreen');

// function toggleSidebar() { app.classList.toggle('sidebar-hidden'); }   // canvas resizes via ResizeObserver
// const reqFs = app.requestFullscreen || app.webkitRequestFullscreen;
// const exitFs = document.exitFullscreen || document.webkitExitFullscreen;
// const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;



// function toggleFullscreen() {
//   if (document.fullscreenElement) document.exitFullscreen();
//   else document.documentElement.requestFullscreen().catch(err => console.warn(err));
// }
// document.getElementById('btn-sidebar').onclick = toggleSidebar;
// btnFs.onclick = toggleFullscreen;
// if (!document.documentElement.requestFullscreen) btnFs.style.display = 'none';   // e.g. iPhone Safari
// document.addEventListener('fullscreenchange', () => {
//   btnFs.textContent = document.fullscreenElement ? '✕' : '⛶';
// });

const app = document.getElementById('app');
const btnFs = document.getElementById('btn-fullscreen');
 
function toggleSidebar() { app.classList.toggle('sidebar-hidden'); }   // canvas resizes via ResizeObserver
const reqFs = app.requestFullscreen || app.webkitRequestFullscreen;           // iPadOS / older Safari
const exitFs = document.exitFullscreen || document.webkitExitFullscreen;
const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;
 
function syncFsButton() {
  btnFs.textContent = (fsElement() || app.classList.contains('pseudo-fs')) ? '✕' : '⛶';
  requestAnimationFrame(resize);
}
function toggleFullscreen() {
  if (!reqFs) {                                   // iPhone Safari: no Fullscreen API, use CSS fallback
    app.classList.toggle('pseudo-fs');
    syncFsButton();
  } else if (fsElement()) {
    exitFs.call(document);
  } else {
    Promise.resolve(reqFs.call(app)).catch(err => console.warn(err));
  }
}
document.getElementById('btn-sidebar').onclick = toggleSidebar;
btnFs.onclick = toggleFullscreen;
document.addEventListener('fullscreenchange', syncFsButton);
document.addEventListener('webkitfullscreenchange', syncFsButton);

const viewport = document.getElementById('viewport');
const sidebar = document.getElementById('sidebar');

// const sceneController = new SceneController( viewport );
// sceneController.startRender( )

const clientManager = new ClientManager( );


// --- Resize canvas to its container ---
function resize() {
  const { clientWidth: w, clientHeight: h } = viewport;
  clientManager.sceneController.renderer.setSize(w, h, false);
  clientManager.sceneController.camera.aspect = w / h;
  clientManager.sceneController.camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(viewport);
resize();

// --- lil-gui as a sidebar ---
// const params = {
//   color: '#4f9dff', wireframe: false, roughness: 0.35, metalness: 0.2,
//   scale: 1, rotationSpeed: 0.4, autoRotate: true,
//   background: '#141418', lightIntensity: 1.2, showGrid: true,
// };
// const gui = new GUI({ container: sidebar, autoPlace: false, title: 'Controls' });

// const m = gui.addFolder('Material');
// m.addColor(params, 'color').onChange(v => mesh.material.color.set(v));
// m.add(params, 'wireframe').onChange(v => mesh.material.wireframe = v);
// m.add(params, 'roughness', 0, 1).onChange(v => mesh.material.roughness = v);
// m.add(params, 'metalness', 0, 1).onChange(v => mesh.material.metalness = v);

// const o = gui.addFolder('Object');
// o.add(params, 'scale', 0.2, 2.5).onChange(v => mesh.scale.setScalar(v));
// o.add(params, 'autoRotate');
// o.add(params, 'rotationSpeed', 0, 3);

// const s = gui.addFolder('Scene');
// s.addColor(params, 'background').onChange(v => scene.background.set(v));
// s.add(params, 'lightIntensity', 0, 3).onChange(v => light.intensity = v);
// s.add(params, 'showGrid').onChange(v => grid.visible = v);


const guiController = new GUIController( );
guiController.modulesRegistry = clientManager.modulesRegistry;


//window.testImageModule = ( x = 0, y = 0, z = 0 ) => {
//	const imageModule = clientManager.addModule(
//		"ImageModule",
//		true,
//		true,
//		true,
//	);


//	const imageImportController = new ImageImportController( );
//	imageImportController.setModule( imageModule );
//	imageImportController.inputFile( );

//	imageModule.updateTransform( { translation: [ x, y, z] }, true );
//}

// clientManager.connect(`ws://127.0.0.1`, "3000");
// clientManager.connect(`ws://130.79.90.188`, "3000");

function runTestObjectModule ( ) {
  const registry = clientManager.modulesRegistry;
  const objectModule = registry.addModule( "ObjectModule", uuid( ), true );
  console.log( objectModule );

  const obj1 = registry.addModule( "ObjectModule", uuid( ), true );
  const dl0 = registry.addModule( "DirectionalLightModule", uuid( ), true );

  objectModule.addChildren( [ obj1.UUID ], true );
  console.log( objectModule.children );
  //objectModule.addChildren( [ pl0.UUID ], true );
  objectModule.addChildren( [ dl0.UUID ], true );
  //console.log(pl0.children)

  const p0 = registry.addModule( "OPrimitiveModule", uuid( ), true );
  const p1 = registry.addModule( "OPrimitiveModule", uuid( ), true );
  const p2 = registry.addModule( "OPrimitiveModule", uuid( ), true );
  const p3 = registry.addModule( "OPrimitiveModule", uuid( ), true );

  objectModule.addChildren( [ p0.UUID ], true );
  objectModule.addChildren( [ p1.UUID ], true );
  p1.addChildren( [ p2.UUID ], true );
  p1.addChildren( [ p3.UUID ], true );


  //objectModule.addChildren( [ objectModule.UUID ], true );
  //console.log( objectModule.children );
  //objectModule.addChildren( [ obj1.UUID ], true );
  //console.log( objectModule.children );
  //objectModule.addChildren( [ cam.UUID ], true );
  //console.log( objectModule.children );
  //objectModule.addChildren( [ obj2.UUID ], true );
  //console.log( objectModule.children );
  //obj2.addChildren( [ obj3.UUID, obj4.UUID ], true );
  //console.log( objectModule.children );
  //console.log( obj2.children );
  //obj2.removeChildren( [ obj4.UUID ], true );
  //obj1.addChildren( [ obj4.UUID ], true );

}

window.runTestObjectModule = runTestObjectModule;

guiController.setNetworkCallbacks(
	( url, port ) => {
		clientManager.connect( url, port );
	},
	( ) => {
		clientManager.disconnect( );
	}
)

// clientManager.connect( "wss://icos.univ-reims.fr", "443" );
window.addEventListener("beforeunload", (event) => { clientManager.beforeUnload( event ) } );
