import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { useEffect } from "react";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";

const Wrksnps0 = () => {
    const remote = useRemote();
    useEffect(() => {
        axios
            .get(`${API_ROUTE}/posts`)
            .then(response => remote.wrksnps.setItems(response.data.response));
    }, []);

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
                {remote.wrksnps.items.map(wrksnp => (
                    <tr key={wrksnp.id}>
                        <td>{wrksnp.id}</td>
                        <td>{wrksnp.title}</td>
                        <td>{wrksnp.content}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}
export const Wrksnps = observer(Wrksnps0);