import React from "react";
import { css } from "utils";
// import 'styled-components/macro';
import { LocalImportExport } from './Local';
import { RemoteImportExport } from './Remote';
import { useTheme } from "css/theme";

const Page: React.FC = () => {
    return <div >
        <LocalImportExport />
        <RemoteImportExport />
    </div>;
}

export { Page };
