import { css } from "@styled-system/css";
import { Wrksnps } from "./Wrksnps";
import { InOut } from "./InOut";
import { RenameWrksnp } from "./RenameWrksnp";
import { CRUD } from "./CRUD";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { getSavedCurrentUser } from "auth/index";

const _Page: React.FC = () => {
    const theme = useTheme();
    const remote = useRemote();

    const savedCurrentUser = getSavedCurrentUser();
    remote.inOut.setCurrentUser(savedCurrentUser);

    return <div css={css(theme.divs.commonPage)}>
        <InOut />
        {remote.inOut.isAuthenticated &&
            <section css={css(theme.sections.common)}>
                <h2>Экспорт-импорт на на удалённом сервере</h2>
                <RenameWrksnp />
                <CRUD />
                <Wrksnps />
            </section>}
    </div>
}

export const Page = observer(_Page);