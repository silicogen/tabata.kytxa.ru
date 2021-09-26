import React from "react";
import { css } from "utils";
import 'styled-components/macro';

const Home: React.FC = () => {
  return <div css={css({ margin: "20px" })} >
    <h2>Что такое табата, и чем полезен данный инструменет</h2>
    <ul>
      <li>О том что такое табата можно почитать здесь: <a href="https://training365.ru/trenirovki-tabata/" target="blanck">табата</a>.</li>
      <li>Инструмент полезен тем, что позволяет формировать тренировки в соответствии с протоколом табата и подстраиваться под заданный ритм во воремя их выполнения.</li>
    </ul>

  </div >
}
export default Home;