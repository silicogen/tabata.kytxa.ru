import React from "react";
import { css } from "@styled-system/css";

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
