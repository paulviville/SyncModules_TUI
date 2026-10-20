import TransformGUI from "./TransformGUI.js";
import CameraModule from "../SyncModules/CameraModule.js";

export default class CameraGUI extends TransformGUI {
	static type = "CameraModule";
	
	constructor ( module, parent, onDelete ) {
		super( module, parent, onDelete );

	}

	setCallbacks ( ) {
		super.setCallbacks( );
	}
}