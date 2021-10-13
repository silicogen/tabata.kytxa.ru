import { css } from "@styled-system/css";
import { Wrksnps } from "./Wrksnps";
import { InOut } from "./InOut";
import { RenameWrksnp } from "./RenameWrksnp";
import { CRUD } from "./CRUD";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const _Page: React.FC = () => {
    const theme = useTheme();
    const remote = useRemote();
    return <div css={css(theme.divs.commonPage)}>
        <section css={css(theme.sections.common)}>
            <h2>Экспорт-импорт на на удалённом сервере</h2>
            {remote.inOut.isAuthenticated
                ? <>
                    <CRUD />
                    <RenameWrksnp />
                    <Wrksnps />
                </>
                : <NavLink to="/login" css={css(theme.navLinks.pageNavLink)}>Выполните вход на сервер</NavLink>
            }

        </section>
    </div>
}

export const Page = observer(_Page);