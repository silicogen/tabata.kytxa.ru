import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";


const _Wrksnps = () => {
    const [resp, setResp] = useState<any>();
    const theme = useTheme();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const effect = () => {
        axios.get(`${API_ROUTE}/posts`)
            .then(resp => {
                const response = resp.data.response;
                wrksnps.setItems(response)
                setResp(response);
            });
    }
    useEffect(effect, []);
    return <div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Наименование</th>
                    <th>Пользователь</th>
                    <th>Создан</th>
                    <th>Изменён</th>
                </tr>
            </thead>
            <tbody>
                {wrksnps.items.map((wrksnp, i) =>
                    <tr key={wrksnp.id}
                        onClick={() => wrksnps.toggleSelect(wrksnp)}
                        css={css(theme.tableRows.selected(() => wrksnps.isSelected(wrksnp)))}
                    >
                        <td>{wrksnp.id}</td>
                        <td>{wrksnp.title}</td>
                        <td>{resp?.[i].author.username}</td>
                        <td>{resp?.[i].created_at.substr(0, 19)}</td>
                        <td>{wrksnp.updated_at.substr(0, 19)}</td>
                    </tr>
                )}
            </tbody>
        </table>

    </div>
}
export const Wrksnps = observer(_Wrksnps);