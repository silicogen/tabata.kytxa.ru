import { css } from "@styled-system/css";
import { Wrksnps } from "./Wrksnps";
import { InOut } from "./InOut";
import { RenameWrksnp } from "./RenameWrksnp";
import { CRUD } from "./CRUD";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const _Page: React.FC = () => {
    const theme = useTheme();
    const remote = useRemote();



    return <div css={css(theme.divs.commonPage)}>
        <InOut />
        {remote.inOut.isAuthenticated &&
            <section css={css(theme.sections.common)}>
                <h2>Экспорт-импорт на на удалённом сервере</h2>
                <CRUD />
                <RenameWrksnp />
                <Wrksnps />
            </section>}
    </div>
}

export const Page = observer(_Page);