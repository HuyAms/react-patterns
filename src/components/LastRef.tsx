import React from 'react'

function debounce<Callback extends (...args: Array<unknown>) => void>(
	fn: Callback,
	delay: number,
) {
	let timer: ReturnType<typeof setTimeout> | null = null
	return (...args: Parameters<Callback>) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

function useDebounce(callback: () => void, delay: number) {
    const latestCallbackRef = React.useRef(callback)

    React.useEffect(() => {
        latestCallbackRef.current = callback
    })

    return React.useMemo(
        () => debounce(() => latestCallbackRef.current(), delay), 
        [delay] // no need to pass the callback here! Thanks to the Latest Ref pattern
    )
}


export function LastRef() {
    const [count, setCount] = React.useState(0)

    function handleButtonClick() {
        console.log("Submit!")
        setCount(count => count + 1)
    }

    // with the latest ref pattern, we don't need to wrap the handleButtonClick function within a useCallback. Super cool!
    const debounceHandleButtonClick = useDebounce(handleButtonClick, 1000)

    return (
        <div>
            <h1 className='text-3xl mb-3'>Latest Ref</h1>
            <p>This send button is debounced for 1 sec. Try to click it multiple times!</p>
            <p className='mb-10'>Form sent count: {count}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={debounceHandleButtonClick}>Submit form</button>
        </div>
    )
}