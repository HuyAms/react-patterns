import React from 'react'
import { Switch } from './Switch';

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

function useToggle() {
    const [on, setOn] = React.useState(false);

    function toggle() {
        setOn(on => !on);
    }

    // Props collection pattern
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

    return {on, toggle, getTogglerProps};
}

export function PropsCollectionGetters() {

    const {getTogglerProps} = useToggle();

    return (
        <div>
            <h1 className='text-3xl mb-3'>Props Collection and Getters</h1>
            <Switch {...getTogglerProps({
                // We can still toggle the button while override the onClick here
                onClick: () => console.log('onButtonClick')
            })}/>
        </div>
    )
}