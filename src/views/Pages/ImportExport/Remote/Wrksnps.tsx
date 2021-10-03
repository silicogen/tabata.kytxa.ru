import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { useEffect } from "react";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";


const _Wrksnps = () => {
    const theme = useTheme();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const effect = () => {
        axios.get(`${API_ROUTE}/posts`)
            .then(resp => wrksnps.setItems(resp.data.response));
    }
    useEffect(effect, []);
    return <div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Наименование</th>
                    <th>Работа</th>
                </tr>
            </thead>
            <tbody>
                {wrksnps.items.map(wrksnp =>
                    <tr key={wrksnp.id}
                        onClick={() => wrksnps.toggleSelect(wrksnp)}
                        css={css(theme.tableRows.selected(() => wrksnps.isSelected(wrksnp)))}
                    >
                        <td>{wrksnp.id}</td>
                        <td>{wrksnp.title}</td>
                        <td>{wrksnp.content}</td>
                    </tr>
                )}
            </tbody>
        </table>

    </div>
}
export const Wrksnps = observer(_Wrksnps);