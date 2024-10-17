import React from 'react'
import { callAll } from '../misc';
import { Switch } from './Switch';

type ToggleState = {on: boolean}

type ToggleAction = 
    {type: 'TOGGLE'} | 
    {type: 'RESET', initialState: ToggleState}

function toggleReducer(state: ToggleState, action: ToggleAction) {
    switch(action.type) {
        case 'TOGGLE': {
            return {...state, on: !state.on}
        } case 'RESET': {
            return action.initialState
        }
        default: {
            return state
        }
    }
}

function useToggle(
    {
        initialOn = false, 
        stateReducer = toggleReducer,
        on: controlledOn,
        onChange
    } : {
        on?: boolean,
        onChange?: (state: ToggleState, action: ToggleAction) => void
        initialOn?: boolean
	    stateReducer?: typeof toggleReducer
    }
    = {}) {
    const initialStateRef = React.useRef({on: initialOn});

    // check if the component is controlled
    // using != to count both null and undefined
    const onIsControlled = controlledOn != null;

    const [state, dispatch] = React.useReducer(stateReducer, initialStateRef.current);

    const on = onIsControlled ? controlledOn : state.on;

    function dispatchWithOnChange(action: ToggleAction) {
        if (!onIsControlled) {
            dispatch(action)
        }

        // here we need to return a predictable state, as if the component is uncontrolled
        const nextState = toggleReducer({...state, on}, action);

        if (onChange) {
            onChange(nextState, action)
        }
    }

    function toggle() {
        dispatchWithOnChange({type: 'TOGGLE'})
    }

    function reset() {
        dispatchWithOnChange({type: 'RESET', initialState: initialStateRef.current})
    }

    function getTogglerProps<Props>({onClick, ...props}: {
        onClick?: React.ComponentProps<'button'>['onClick']
    } & Props) {
        return {
            on,
            onClick: callAll(onClick, toggle),
            'aria-checked': on,
            ...props
        }
    }

    return {on, toggle, reset, getTogglerProps};
}

export function Toggle({on, onChange}: {on?: boolean, onChange?: (state: ToggleState, action: ToggleAction) => void}) {

    const { getTogglerProps} = useToggle({on, onChange});

    return  (<Switch {...getTogglerProps({})}/>)
}

export function ControlProps() {
    const [on, setOn] = React.useState(false)

    function handleOnChange(state: ToggleState, action: ToggleAction) {
        console.log('on change: ', state)
        if (action.type === 'TOGGLE') {
            setOn(state.on)
        }
    }

    return (
        <div>
            <div className='mb-3'>
                <h1 className='text-3xl mb-3'>Control Props</h1>
                <p>Parent totally controls the props of the component</p>
            </div>
            <div className='mb-10'>
                <p className='mb-3'>Controlled Toggle</p>
                <div className='flex gap-4'>
                    {/* Parent can control the children state */}
                    <Toggle on={on} onChange={handleOnChange}/>
                    <Toggle on={on} onChange={handleOnChange}/>
                </div>
            </div>
            <div>
                <p>Uncontrolled Toggle</p>
                 {/* The component can also have its own state */}
                <Toggle />
            </div>
        </div>
    )
}