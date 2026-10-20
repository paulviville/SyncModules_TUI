import GUI from './three/libs/lil-gui.module.min.js';

import GUIRegistry from './SyncModulesGUI/GUIRegistry.js';
import ModuleTypes from './SyncModules/Core/ModuleTypes.js';

function uuid( ) {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}


const params = {
  color: '#4f9dff', wireframe: false, roughness: 0.35, metalness: 0.2,
  scale: 1, rotationSpeed: 0.4, autoRotate: true,
  background: '#141418', lightIntensity: 1.2, showGrid: true,
};
const sidebar = document.getElementById('sidebar');

export default class GUIController {
	#gui = new GUI( {
		container: sidebar,
		autoPlace: false,
	} );

	#moduleRegistry;
	#guiRegistry;
	#panels = {

	}

	constructor ( ) {
		console.log( `GUIController - constructor` );
		
		this.#addConnectionFolder( );

	}

	#addConnectionFolder ( ) {
		this.#panels.Connection = this.#gui.addFolder( "Connection Controls");
		this.#panels.Connection.close( );
	}
	
	#addModulesPanel ( ) {

	}

	#addModulesControlPanel ( ) {
		this.#panels.modulesControls = this.#gui.addFolder( "Modules Controls");
		
		const moduleTypesOptions = Object.keys( ModuleTypes );
		const selectedType = { type: moduleTypesOptions[ 0 ] }
		this.#panels.modulesControls.add( selectedType, "type", moduleTypesOptions );
		this.#panels.modulesControls.add( { addModule: ( ) => {
			console.log( selectedType )
			this.#moduleRegistry.addModule( selectedType.type, uuid( ), true );
		} }, "addModule" );
		
		// this.#panels.modulesControls.close( );
	}

	get gui ( ) {
		return this.#gui;
	}

	set modulesRegistry ( modulesRegistry ) {
		this.#moduleRegistry = modulesRegistry;

		this.#addModulesControlPanel( );

		this.#guiRegistry = new GUIRegistry( modulesRegistry, this.gui );
	}
}