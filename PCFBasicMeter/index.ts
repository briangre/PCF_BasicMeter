import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { BasicMeter, IBasicMeterProps } from "./BasicMeter";
import React = require("react");
import ReactDOM = require("react-dom");

export class PCFBasicMeter implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context:ComponentFramework.Context<IInputs>;
	private _notifyOutput: () => void;
	private _container:HTMLElement;
	private props:IBasicMeterProps = {
		count: 0,
		valueChanged: this.valueChanged.bind(this),
		_context: this._context
	};

	constructor()
	{

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;
		this._context = context;
		this._notifyOutput= notifyOutputChanged;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		/* if you want to only update on certain properties, you 
		   can include an if on updateProperties.includes()
		*/

		// if(context.updatedProperties.includes("meterIndex")){
			this.props.count = context.parameters.meterIndex.raw || 0
		// }
		
		ReactDOM.render(
			React.createElement(BasicMeter, this.props),
			this._container
		)
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			meterIndex : this.props.count
		};
	}

	private valueChanged(newValue: number){

		if(this.props.count !== newValue ){
			this.props.count = newValue;
			this._notifyOutput();
		}
		
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container)
	}
}