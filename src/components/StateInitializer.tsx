import React from 'react'
import { Switch } from './Switch';
import { callAll } from '../misc';

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

function useToggle({initialOn = false}: {initialOn?: boolean} = {}) {

    // Initial is always initial, it will not change
    // State initializer pattern here
    const initialStateRef = React.useRef({on: initialOn});

    const [{on}, dispatch] = React.useReducer(toggleReducer, initialStateRef.current);

    function toggle() {
        dispatch({type: 'TOGGLE'})
    }

    // Allows to reset to default state
    function reset() {
        dispatch({type: 'RESET', initialState: initialStateRef.current})
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

export function StateInitializer() {

    const [initialOn, setInitialOn] = React.useState(true)

    const {reset, getTogglerProps} = useToggle({initialOn});

    return (
        <div>
            <div className='mb-3'>
                <h1 className='text-3xl mb-3'>State Initializer</h1>
                <p>Now we support state reset</p>
                <p>Even we change the initialOn, it will be always reset to the initial state which is ON</p>
            </div>
            <div><button className="text-blue-600" onClick={() => setInitialOn(on => !on)}>Initial On: {initialOn.toString()}</button></div>
            <Switch {...getTogglerProps({})}/>
            <div className='mt-5'>
                {/* Even we change the initialOn, the reset button always works the same way (predictable) */}
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}