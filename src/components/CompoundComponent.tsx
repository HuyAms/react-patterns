import React from 'react'
import { Switch } from './Switch'

type ToggleContextType = {
    on: boolean,
    toggle: () => void
}

const ToggleContext = React.createContext<ToggleContextType| null>(null)

function useToggleContext() {
    const context = React.useContext(ToggleContext)
    
    if(!context) {
        throw new Error('useToggleContext must be used within a ToggleProvider')
    }

    return context
}


function Toggle({children}: {children: React.ReactNode}) {

    const [on, setOn] = React.useState(false)

    function toggle() {
        setOn(on => !on)
    }

    return (
        <ToggleContext.Provider value={{on, toggle}}>
            {children}
        </ToggleContext.Provider>
    )
}

function ToggleOn({children}: {children: React.ReactNode}) {
    
        const {on} = useToggleContext()
    
        return on ? <div>{children}</div> : null
}

function ToggleOff({children}: {children: React.ReactNode}) {
    const {on} = useToggleContext()
    
    return !on ? <div>{children}</div> : null
}

function ToggleButton() {

    const {on, toggle} = useToggleContext()

    return (<Switch on={on} onClick={toggle}/>)
}


export function CompoundComponent() {
    return (
        <div>
            <h1 className='text-3xl mb-3'>Compound Component</h1>
            <Toggle>
                {/* Benefit here is that we can freely switch around those components, making it flexible */}
                <ToggleOn>Button is on</ToggleOn>
                <ToggleOff>Button is off</ToggleOff>
                <ToggleButton/>
            </Toggle>
        </div>
    )
}