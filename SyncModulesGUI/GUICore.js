import GUI from '../three/libs/lil-gui.module.min.js';

import ModuleCore from '../SyncModules/Core/ModuleCore.js';

export default class GUICore {
	static type = ModuleCore.type;

	#module; 
	#folder; 

	constructor ( module, parent, onDelete ) {
		this.#module = module;
		this.#folder = parent.addFolder( `${ module.type } - ${ module.UUID }` );

		if ( onDelete ) {
			this.#folder.add( { delete: onDelete }, "delete" );
		}

		this.setCallbacks( );
		// this.#folder.close( );
	}

	get module ( ) {
		return this.#module;
	}

	get folder ( ) {
		return this.#folder;
	}

	/// overload in children
	#setModule ( module ) {
		this.#module = module;
		
		this.setCallbacks( );
	}

	/// overload in children
	setCallbacks ( ) {

		return;
	}

	delete ( ) {
		this.#folder.destroy( );
	}

	refresh ( ) {

	}
}