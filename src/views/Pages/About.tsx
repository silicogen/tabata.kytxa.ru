import { css } from "@styled-system/css";

const _About: React.FC = () => {
  const tabata = <a href="https://training365.ru/trenirovki-tabata/" target="blanck">табата</a>;
  const pwa = <a href="https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B5%D1%81%D1%81%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B2%D0%B5%D0%B1-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5" target="blanck">PWA</a>;
  return <div css={css({ margin: "20px" })} >
    <h2>Табата</h2>
    <p>
      Сайт находится в разработке. Реализована основная функциональность.
    </p>

    <p>
      О том что такое табата можно почитать здесь {tabata}.
      Сайт полезен тем, что позволяет формировать тренировки в соответствии с протоколом табата, запускать выполнение тренировок, и подстраиваться под ритм выполнения, задаваемый звуковыми сигналами.
    </p>

    <p>
      Для запуска выполнения тренировки нужно создать тренировку, прикрепить к ней упражнения и фазы, задать фазам продолжительность. После этого перейти по меню Выполнение и нажать на треугольник. Упражнения будут выполняться, и пищать проходя каждую фазу.
    </p>

    <p>
      Тренировки можно сохранять в файл локально или на сервере через соответствующие пункты меню.
    </p>

    <p>
      Сайт использует технологию {pwa}:
      <ul>
        <li>может работать автономно, при отсутствии доступа в интернет</li>
        <li>устанавливается на мобильные устройства и работает как приложение</li>
      </ul>
    </p>

    <p>
      Успехов на тренировках!
    </p>
  </div >
}

export const About = _About;