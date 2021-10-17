import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { SystemStyleObject } from "@styled-system/css";

const selectedRowitem = (isSelected: () => boolean) => ({
  bg: isSelected() ? "lightGray" : "iherit",
}) as SystemStyleObject;

const fontSizes = {
  input: "1.3rem",
  commonText: "1.3rem"
};

const colors = {
  forWorkout: "orange",
  black: '#000e1a',
  white: '#fff',
  blue: '#007ce0',
  navy: '#004175',
  primary: 'green',
  secondary: 'blue',
  disabled: "rgb(84,84,84)",
  main: 'rgba(228, 200, 154, 0.95)',
  list: 'rgba(228, 190, 130, 1)',
  gap: 'rgba(190, 129, 31, 0.95)',
  button: "orange",
};

const backgroundImages = {
  navAndHeader: 'linear-gradient(180deg, rgba(66, 70, 66, 0.95) 0%, rgba(190, 129, 31, 0.95) 100%)',
}

const theme = {
  breakpoints: ['40em', '52em', '64em', '80em'],
  colors,
  fontSizes,
  backgroundImages,
  layout: {
    gridContainer: {
      display: "grid",
      height: "100vh",
      gridTemplateAreas: [
        "'header' 'nav' 'main'",
        "'header header' 'nav main'",
        "'header header' 'nav main'",
        "'header header' 'nav main'",
      ],
      gridTemplateRows:
        [
          "auto auto 1fr",
          "auto 1fr",
          "auto 1fr",
          "auto 1fr",
        ],
      gridTemplateColumns:
        [
          "auto",
          "auto 1fr",
          "auto 1fr",
          "auto 1fr"
        ],

    } as SystemStyleObject,

    header: {
      gridArea: 'header',
      position: 'sticky',
      top: '0',
      gap: "1rem",

      height: '3em',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      padding: '0px 10px',
      borderRadius: '0  0 0 20px',
      fontSize: '1.1rem',
      backgroundImage: backgroundImages.navAndHeader,
    } as SystemStyleObject,
    nav: (navMenuIsCollapsed: boolean) => ({
      gridArea: 'nav',
      position: ["fixed", "initial"],
      top: '3.3rem',
      left: navMenuIsCollapsed ? "-170px" : "0px",
      width: ["auto"],
      bg: ['initial', colors.main],
      // p: ['0px', '4px'],
      display: 'flex',
      flexFlow: 'column',
      fontSize: '1em',
      transition: 'left 0.5s',
      zIndex: 1,
    }) as SystemStyleObject,
    main: {
      gridArea: 'main',
      bg: colors.main,
      // p: ["0.3rem", "0.4rem", "0.6rem", "0.9rem", "1.1rem",],
    } as SystemStyleObject,
    params: {
      label: { justifySelf: "end" },
      content: { justifySelf: "start" },
      errorMessage: { color: "red", gridColumn: "1/3" },
      successMessage: { color: "green", gridColumn: "1/3" },
      submitButton: {  gridColumn: "2" }
    }

  },
  navLinks: {
    menuNavLink: {
      backgroundImage: backgroundImages.navAndHeader,
      color: 'rgba(255, 255, 255, 1)',
      height: '3em',
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',

      textDecoration: 'none',
      padding: '0 10px',
      fontSize: '1.1rem',
      borderRadius: '0 20px',
      fill: "white",
      "&.active": {
        fontWeight: 'bolder',
        color: 'orange',
        fill: "orange"
      },
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    headNavLink: {
      display: "flex",
      alignItems: "center",
      color: 'rgba(255, 255, 255, 1)',
      fontSize: '1.1rem',
      textDecoration: 'none',
      "&.active": {
        fontWeight: 'bolder',
        color: 'orange',
      },
      '&:hover': {
        textDecoration: 'underline'
      }
    } as SystemStyleObject,
    pageNavLink: {
      fontSize: '1.3rem',
      "&.active": {
        fontWeight: 'bolder',
      },
      '&:hover': {
        textDecoration: 'underline'
      }
    } as SystemStyleObject,
  },
  divs: {
    listDetailsPage: {
      position: "relative",
      minHeight: "10rem",
      height: "100%",
      display: "grid",
      gap: ["0.3rem"],
      background: colors.gap,
      gridTemplateRows: ["auto 1fr", "auto 1fr", "auto 1fr", "1fr"],
      gridTemplateColumns: ["1fr", "1fr", "1fr", "1fr 1fr"],
      gridTemplateAreas: ["'details' 'list'", "'details' 'list'", "'details' 'list'", "'list details'"],
    } as SystemStyleObject,
    commonPage: {
      // display: "grid",
      display: "flex",
      gap: ["0.7rem"],
    } as SystemStyleObject,
    subPage: {
      display: "flex",
      flexFlow: "column",
    } as SystemStyleObject,
    buttonsPanel: {
      display: "flex",
      justifyContent: "space-around"
    } as SystemStyleObject,
    listName: {
      display: "flex",
      m: "1rem 0 0 0",
    } as SystemStyleObject,
    nameInput: {

      display: "flex",
      m: "1rem 0 0 0"
    } as SystemStyleObject,
    params: {
      display: "grid",
      gap: ["0.7rem 0.3rem", "1rem 2rem", "1rem 3rem"],
      gridTemplateColumns: ["auto 1fr", "auto 1fr"],
      alignItems: "center",
    } as SystemStyleObject
  },
  sections: {
    details: (fixHeight: boolean, hight?: string) => ({
      overflowY: "auto",
      gridArea: "details",
      p: "0 1rem 0.8rem 1rem",
      height: [
        fixHeight ? hight : "unset",
        fixHeight ? hight : "unset",
        fixHeight ? hight : "unset",
        `unset`
      ],
      bg: colors.main
    } as SystemStyleObject),

    list: {
      gridArea: "list",
      p: "0 1rem",
      bg: colors.main
    } as SystemStyleObject,
    common: {
      display: "flex",
      flexFlow: "column",
      gap: "1rem",
      p: "0 1rem",
      bg: colors.main
    } as SystemStyleObject,
  },
  fieldsets: {
    params: {
      borderRadius: "10px",
      padding: "0.5rem",
    } as SystemStyleObject
  },
  inputs: {
    button: {
      minWidth: "10rem",
      border: "none",
      borderBottom: "1px solid",
      fontSize: fontSizes.input,
      outline: "none",
      color: "red",
      bg: colors.button,
      borderRadius: "0.4rem",

    } as SystemStyleObject,
    name: {
      minWidth: "10rem",
      border: "none",
      borderBottom: "1px solid",
      bg: "inherit",
      fontSize: fontSizes.input,
      outline: "none"
    } as SystemStyleObject,
    int: {
      width: "2rem",
      border: "none",
      borderBottom: "1px solid",
      bg: "inherit",
      fontSize: fontSizes.input,
      outline: "none",
      margin: "0 0.5rem",
      textAlign: "center"
    } as SystemStyleObject
  },
  buttons: {
    primary: {
      bg: colors.button,
      borderRadius: "0.4rem",
      fontSize: fontSizes.input
    } as SystemStyleObject,
  },
  comments: {
    primary: {
      fontSize: fontSizes.input
    } as SystemStyleObject,
  },
  tableRows: {
    common: {
      height: "1.4em"
    } as SystemStyleObject,
    selected: selectedRowitem,
  },
  tableDatas: {
    selected: selectedRowitem,
  },

  svgs: {
    tableHeader: {
      height: "0.7rem",
      width: "0.7rem"
    },
    pin: (pinned: boolean) => ({
      display: ["initial", "initial", "initial", "none"],
      width: "1.5rem", height: "1.5rem",
      transform: pinned ? 'unset' : 'rotate(45deg)'
    }),
    inMenuNavLink: {
      width: "1.2rem",
      height: "1.2rem",
      mr: "0.7rem",
    } as SystemStyleObject,

    inOutHeadLink: {
      width: "2rem",
      height: "2rem",
      mr: "0.7rem",
    } as SystemStyleObject
  }
};



export const useTheme = () => useContext<typeof theme>(ThemeContext);

export default theme;