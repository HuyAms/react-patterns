import React from 'react'

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

    return (
        <div className="flex items-center space-x-2">
        <button
          role="switch"
          aria-checked={on}
          onClick={toggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            on ? 'bg-green-500' : 'bg-gray-200'
          }`}
        >
          <span className="sr-only">Toggle Button</span>
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                on ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    )
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