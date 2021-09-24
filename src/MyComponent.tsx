import React from 'react'

export const MyComponent: React.FC = () => {
    const time = new Date().toTimeString();
    return <>
        <h1>{`MyComponent     at ${time}`}</h1>
    </>
}