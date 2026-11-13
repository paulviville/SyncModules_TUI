import MeshModule from '../SyncModules/MeshModule.js';
import ObjectGUI from './ObjectGUI.js';
import GLTFImportController from '../SyncModulesViews/Controllers/GLTFImportController.js';

export default class MeshGUI extends ObjectGUI {
	static type = MeshModule.type;

	constructor ( module, parent ) {
		super( module, parent );

		this.params.mesh = "";
		this.params.name = "";

		const meshFolder = this.folder.addFolder( "Mesh" );
		meshFolder.add( { import: ( ) => {
			this.#import( );
		} }, "import" );

		meshFolder.add( this.params, "name" ).listen( ).disable( );
	}
	
	setCallbacks ( ) {
		super.setCallbacks( );


		this.module.setOnChange( this.module.commands.setData,
			( data  ) => this.#updateName( data  ) 
		);
	}

	#import ( ) {
		const gltfImportController = new GLTFImportController( );
		gltfImportController.setModule( this.module );
		gltfImportController.inputFile( );
	}

	#updateName ( data ) {
		this.params.name = data.name ?? "unnamed";
	}
}