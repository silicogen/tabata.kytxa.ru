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
            .then(resp => {
                const response = resp.data.response;
                response.forEach((w: any) => w.username = w.author.username)
                wrksnps.setItems(response)
            });
    }
    useEffect(effect, []);
    return <table>
        <caption css={css({ captionSide: "top", fontSize: "1.5rem" ,pb:"0"})}>
            Хранилища
        </caption>
        <thead>
            <tr>
                {/* <th>id</th> */}
                <th>Наименование</th>
                {/* <th>Пользователь</th> */}
                <th>Создано</th>
                <th>Изменёно</th>
            </tr>
        </thead>
        <tbody>
            {wrksnps.items.map((wrksnp, i) =>
                <tr key={wrksnp.id}
                    onClick={() => wrksnps.toggleSelect(wrksnp)}
                    css={css(theme.tableRows.selected(() => wrksnps.isSelected(wrksnp)))}
                >
                    {/* <td>{wrksnp.id}</td> */}
                    <td>{wrksnp.title}</td>
                    {/* <td>{wrksnp.username}</td> */}
                    <td>{wrksnp.created_at.substr(0, 19)}</td>
                    <td>{wrksnp.updated_at.substr(0, 19)}</td>
                </tr>
            )}
        </tbody>
    </table>
}
export const Wrksnps = observer(_Wrksnps);