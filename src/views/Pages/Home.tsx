import { css } from "@styled-system/css";

const Home: React.FC = () => {
  return <div css={css({ margin: "20px" })} >
    <h2>Табата</h2>
    <p>
      Сайт находится в разработке. Реализована основная функциональность, но понятность интерфейса оставляет желать лучшего, поэтому пользоваться пока не рекомендую.
    </p>

    <p>
      О том что такое табата можно почитать здесь <a href="https://training365.ru/trenirovki-tabata/" target="blanck">табата</a>.
      Инструмент полезен тем, что позволяет формировать тренировки в соответствии с протоколом табата, запускать выполнение тренировок, и подстраиваться под ритм выполнения, задаваемый звуковыми сигналами.
    </p>

    <p>
      Для запуска выполнения тренировки нужно создать тренировку, прикрепить к ней упражнения и фазы, задать фазам продолжительность. После этого перейти по меню Выполнение и нажать на треугольник. Упражнения будут выполняться в заданной последовательности, проходя каждую фазу.
    </p>
    
    <p>
      Тренировки можно сохранять в файл локально или на сервере через соответствующие пункты меню.
    </p>

  </div >
}

export default Home;