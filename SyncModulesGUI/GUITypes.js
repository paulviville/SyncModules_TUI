import CameraGUI from "./CameraGUI.js";
import GUICore from "./GUICore.js"
import PrimitiveGUI from "./PrimitiveGUI.js";
import ScalarGUI from "./ScalarGUI.js"
import TransformGUI from "./TransformGUI.js";
import Vector3GUI from "./Vector3GUI.js";

const GUITypes = {
	[ GUICore.type ]: GUICore,
	[ ScalarGUI.type ]: ScalarGUI,
	[ Vector3GUI.type ]: Vector3GUI,
	[ TransformGUI.type ]: TransformGUI,
	[ PrimitiveGUI.type ]: PrimitiveGUI,
	[ CameraGUI.type ]: CameraGUI,
};

Object.freeze( GUITypes );
export default GUITypes;


