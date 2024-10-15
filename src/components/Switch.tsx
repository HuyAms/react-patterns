import React from 'react'

export function Switch({on, onClick}: {on: boolean, onClick: React.ComponentProps<'button'>['onClick']}) {
    return  (
        <button
            role="switch"
            aria-checked={on}
            onClick={onClick}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            on ? 'bg-green-500' : 'bg-gray-200'
            }`}>
            <span className="sr-only">Toggle Button</span>
            <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                on ? 'translate-x-6' : 'translate-x-1'
            }`}
            />
        </button>
    )
}