import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
// import * as ReactDOM from 'react-dom'

export interface IBasicMeterProps {
    count?: number,
    valueChanged?: (newValue: number) => void;
    _context?: ComponentFramework.Context<IInputs>
}

export interface IBasicMeterState extends React.ComponentState, IBasicMeterProps {
    currentCount: number
}

export class BasicMeter extends React.Component<IBasicMeterProps, IBasicMeterState>{

    constructor(props: IBasicMeterProps) {
        super(props);

        this.state = {
            currentCount: props.count || 0
        }

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick = (event: React.MouseEvent): void => {

        let target = event.target as HTMLDivElement;
        console.log(target.id);

        /* 
            fill all items less than or equal to current item
            empty all items greater than current item
        */
        let currentId: number = Number(target.id);
        let maxId: number = document.body.getElementsByClassName('child').length;
        for (let i = 1; i <= maxId; i++) {
            if (i <= currentId) {
                document.getElementById(i.toString())?.classList.remove('empty');
            } else {
                document.getElementById(i.toString())?.classList.add('empty');
            }
        }

        /* update the state to force a re-render
            and call notifyOutput() on PCF framework
        */
        this.setState((prevState: IBasicMeterState): IBasicMeterState => {
            prevState.currentCount = currentId;
            return prevState;
        }
        );
        if (this.props.valueChanged)
            this.props.valueChanged(currentId);
    }

    render() {

        // create a content array of JSX elements for the graphic DIV elements
        const content: JSX.Element[] = [];

        for (let i = 1; i < 11; i++) {
            content.push(<div onClick={this.handleClick} id={i.toString()}
                key={i} className={i <= this.state.currentCount ? 'child tooltip' : 'child tooltip empty'}>
                <span className="tooltiptext">{i}</span>
            </div>)
        }

        /* adding a container div in order to set the height
           which has room for the tooltip to display
        */
        return (
            <div className='setHeight'>
                <div className='parent'>
                    {content}
                </div>
            </div>
        )
    }
}