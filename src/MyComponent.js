import React from 'react'

export const MyComponent = () => {
    const time = new Date().toTimeString();
    return <>
        <h1>{`MyComponent      ${time}`}</h1>
    </>
}