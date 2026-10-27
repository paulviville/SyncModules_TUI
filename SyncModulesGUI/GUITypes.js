import CameraGUI from "./CameraGUI.js";
import GUICore from "./GUICore.js"
import Image360GUI from "./Image360GUI.js";
import ImageGUI from "./ImageGUI.js";
import PrimitiveGUI from "./PrimitiveGUI.js";
import ScalarGUI from "./ScalarGUI.js"
import SwitchGUI from "./SwitchGUI.js";
import TextGUI from "./TextGUI.js";
import TransformGUI from "./TransformGUI.js";
import TriggerGUI from "./TriggerGui.js";
import Vector3GUI from "./Vector3GUI.js";

const GUITypes = {
	[ GUICore.type ]: GUICore,
	[ ScalarGUI.type ]: ScalarGUI,
	[ Vector3GUI.type ]: Vector3GUI,
	[ TransformGUI.type ]: TransformGUI,
	[ PrimitiveGUI.type ]: PrimitiveGUI,
	[ CameraGUI.type ]: CameraGUI,
	[ TriggerGUI.type ]: TriggerGUI,
	[ SwitchGUI.type ]: SwitchGUI,
	[ TextGUI.type ]: TextGUI,
	[ ImageGUI.type ]: ImageGUI,
	[ Image360GUI.type ]: Image360GUI,
};

Object.freeze( GUITypes );
export default GUITypes;


