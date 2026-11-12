import OPrimitiveModule from '../SyncModules/OPrimitiveModule.js';
import ObjectGUI from './ObjectGUI.js';

export default class OPrimitiveGUI extends ObjectGUI {
	static type = OPrimitiveModule.type;

	constructor ( module, parent ) {
		super( module, parent );

		const primitiveTypes = Object.keys( module.primitiveTypes );

		this.params.primitive = module.primitive;
		const color = module.color;
		this.params.color = color.slice( 0, 3 );
		this.params.alpha = color[ 3 ];

		const primitiveFolder = this.folder.addFolder( "Primitive" );
		const primitiveParam = primitiveFolder.add( this.params, "primitive", primitiveTypes ).listen( );
		const colorParam = primitiveFolder.addColor( this.params, "color" ).listen( );
		const alphaParam = primitiveFolder.add( this.params, "alpha", 0, 1, 0.01 ).listen( );

		colorParam.onChange( ( ) => { this.#controlColor( this.params.color, this.params.alpha ) } );
		alphaParam.onChange( ( ) => { this.#controlColor( this.params.color, this.params.alpha ) } );
		primitiveParam.onChange( ( ) => this.#controlPrimitive( this.params.primitive ) );
	}
	
	setCallbacks ( ) {
		super.setCallbacks( );

		this.module.setOnChange( this.module.commands.setPrimitive,
			( transform ) => this.#setPrimitive( transform ) 
		);

		this.module.setOnChange( this.module.commands.setColor,
			( color ) => this.#setColor( color ) 
		);
	}

	#setPrimitive ( primitive ) {
		this.params.primitive = primitive;
	}

	#setColor ( color ) {
		this.params.color.forEach( ( _, i ) => this.params.color[ i ] = color[ i ] || 0 * 255 );
		this.params.alpha = color[ 3 ];
	}

	#controlPrimitive ( primitive ) {
		this.module.setPrimitive( primitive, true );
	}

	#controlColor ( color, alpha ) {
		this.module.setColor( [ ...color, alpha ], true );
	}
}