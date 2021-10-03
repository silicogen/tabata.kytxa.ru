import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useRemote } from "store/Remote";
import { applySnapshot, cast } from "mobx-state-tree";
import { Wrksnp } from "store/Remote/Wrksnp";
import { observer } from "mobx-react";

const Wrksnps0 = () => {
    const remote = useRemote();
    const [wrksnps, setPost] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_ROUTE}/posts`)
            .then((response) => {
                setPost(response.data.response);
                const content = (response as any).data.response;
                // const json = JSON.parse(content);
                // remote.wrksnps.items.replace(content);
                const ca = Array.from(content);
                // remote.wrksnps.items.replace(ca);
                const c: { id: any; title: any; content: any; }[] = [];
                ca.forEach(i => {
                    const w = {
                        id: (i as any).id.toString() as string,
                        title: (i as any).title as string,
                        content: (i as any).content as string,

                    }
                    c.push(w);
                    let j = 0;
                })
                remote.wrksnps.setAll(c as any);
                // applySnapshot(remote.wrksnps.items, content);
                let i = 0;
            });
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
                {wrksnps.map(wrksnp => (
                    <tr key={wrksnp.id}>
                        <td>{wrksnp.id}</td>
                        <td>{wrksnp.title}</td>
                        <td>{wrksnp.content}</td>
                    </tr>
                ))}
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
// const res  = await axios.get(`${API_ROUTE}/posts`)