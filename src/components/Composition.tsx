import React from 'react'

function Content({main, sideBar}: {main: React.ReactNode, sideBar: React.ReactNode}) {
    // We have this content component to render layout only
    // hence, not need to care about other states: items, selectedItem
    return (
        <div className='flex gap-4'>
            <div>{sideBar}</div>
            <div>{main}</div>
        </div>
    )

}

function Header({username}: {username: React.ReactNode}) {
    return (
        <header className='mb-3'>
           Welcome {username}. Please select an item.
        </header>
    )
}

export function Composition() {
    // state in the parent component
    const [username] = React.useState('Huy Trinh');
    const [items] = React.useState(['Item 1', 'Item 2', 'Item 3']);
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    function renderSideBar() {
        return (
            <ul>
                {items.map(item => (<li key={item}><button onClick={() => setSelectedItem(item)}>{item}</button></li>))}
            </ul>
        )
    }

    function renderMain() {
        if(!selectedItem) {
            return <p>No item selected</p>
        }

        return (<p>Selected: {selectedItem}</p>)
    }

    return (
        <div>
            <h1 className='text-3xl mb-3'>Composition pattern</h1>
            <Header username={<span>{username}</span>}/>
            {/* Here we render components and pass components, not props - avoid prop drilling */}
            {/* We keep the state inside the parents, not passing down! */}
            <Content sideBar={renderSideBar()} main={renderMain()}/>
        </div>
    )
}