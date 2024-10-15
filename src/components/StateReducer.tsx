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

function useToggle({initialOn = false, stateReducer = toggleReducer} = {}) {
    const initialStateRef = React.useRef({on: initialOn});

    const [{on}, dispatch] = React.useReducer(stateReducer, initialStateRef.current);

    function toggle() {
        dispatch({type: 'TOGGLE'})
    }

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

export function StateReducer() {
    const [clickCount, setClickCount] = React.useState(0)
    const clickTooMuch = clickCount > 3

    const {getTogglerProps} = useToggle({
        stateReducer: (state, action) => {

            const updatedState = toggleReducer(state, action)

            if (action.type === 'TOGGLE' && clickTooMuch) {
                return {...updatedState, on: true}
            }

            return updatedState
        }
    });

    return (
        <div>
            <div className='mb-3'>
                <h1 className='text-3xl mb-3'>State Reducer</h1>
                <p>Parent components wants to modify the state of the component</p>
            </div>
            <Switch 
                {...getTogglerProps({onClick: () => setClickCount(clickCount + 1)})}
            />
            {clickTooMuch ? <p>Too many clicks</p> : <p>Click count: {clickCount}</p>}
        </div>
    )
}