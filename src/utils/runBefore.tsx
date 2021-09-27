import React from "react";
const runBeforeFC =
    <T extends {}>(WrappedComponent: React.ComponentType<T>, callback: () => void): React.FC<T> =>
        props => {
            callback();
            return <WrappedComponent {...props} />;
        }

export { runBeforeFC };