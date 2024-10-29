/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/{js,php}/**/*.{html,js}"],
  theme: {
    fontSize: {
      h1: "clamp(2rem, 1.273rem + 3.636vw, 4rem)",
      h2: "clamp(1.5rem, 0.955rem + 2.727vw, 3rem)",
      h3: "clamp(1.25rem, 0.795rem + 2.273vw, 2.5rem)",
      p: "clamp(1rem, 0.636rem + 1.818vw, 2rem)", // а также для текста logo
      a: "clamp(1rem, 0.477rem + 1.364vw, 1.5rem)", // а также для текстов footer
      input: "clamp(0.75rem, 0.659rem + 0.455vw, 1rem)", // а также для значений таблицы
      btn: "clamp(0.875rem, 0.648rem + 1.136vw, 1.5rem)", // а также дяя заголовков таблицы
    },

    extend: {
      borderRadius: {
        5: "5px",
      },
      backgroundImage: {
        pattern: "url('../img/pattern.jpg')",
        checkbox: "url('../img/icon-radio-default.svg')",
        checkedbox: "url('../img/icon-radio-checked.svg')",
        "decorative-5": "url('../img/decorative-img-5.svg')",

      },
      
      spacing: {
        // значения для logo img
        60: "60px",
        50: "50px",
        42: "42px",
        36: "36px",
        25: "25px",
        18: "18px",

        // icons
        33: "33px",
        30: "30px",
        20: "20px",

        // Отступы между секциями и внутри элементов
        200: "200px",
        185: "185px",
        170: "170px",
        150: "150px",
        125: "125px",
        140: "140px",
        100: "100px",
        85: "85px",
        80: "80px",
        75: "75px",
        70: "70px",
        // "50": "50px",
        "40": "40px",
        "35": "35px",
        5: "5px",

        // Padding
        // "50": "50px",
        // "20": "20px",
        15: "15px",
        10: "10px",

        // container
        container: "max(15px, calc((100vw - 1170px)/2))",
      },
      colors: {
        main: "#F1F2F3", // белый
        accent: "#E371A9", // розовый
        bg: "#2D3A42", // синий
        inert: "#454648", // серый
      },
      fontFamily: {
        inter: "'Inter', serif",
      },
      boxShadow: {
        btnShadow: "0 5px 0 0 #B8B8B8",
      },
    },
    screens: {
      phone: "320px",
      tablet: "768px",
      desktop: "1200px",
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.h1"),
        },
        h2: {
          borderRadius: "9999px",
          backgroundColor: theme("colors.bg"),
          fontSize: theme("fontSize.h2"),
          paddingTop: '20px',
        },
        h3: {
          borderRadius: "9999px",
          backgroundColor: theme("colors.bg"),
          fontSize: theme("fontSize.h3"),
          paddingTop: '20px',
          paddingBottom: '20px',
          color: theme("colors.accent"),
          "@media (min-width: 768px)": {
            padding: '30px 0',
          },
          "@media (min-width: 1200px)": {
            padding: '50px 0',
          },
        },
        p: {
          borderRadius: "9999px",
          backgroundColor: theme("colors.bg"),
          fontSize: theme("fontSize.p"),
          padding: '20px 0',
          "@media (min-width: 768px)": {
            padding: '30px 0',
          },
          "@media (min-width: 1200px)": {
            padding: '50px 0',
          },
        },
        "input, label, legend, h4": {
          fontSize: theme("fontSize.input"),
        },

        body: {
          fontFamily: theme("fontFamily.inter"),
          backgroundImage: theme("backgroundImage.pattern"),
          backgroundSize: "cover",
          fontSize: theme("fontSize.p"),
          color: theme("colors.main"),
        },
        main: {
          padding: `0 ${theme("spacing.container")}`,
        },
        header: {
          padding: `0 ${theme("spacing.container")}`,
          backgroundColor: theme("colors.bg"),
        },
        footer: {
          padding: `0 ${theme("spacing.container")}`,
          backgroundColor: theme("colors.bg"),
        },
        svg: {
          fill: theme("colors.current"),
        },
      });
      addComponents({
        ".aboutItem": {
          gridColumn: '1 / -1',
          display: "grid",
          columnGap: "30px",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          "&:nth-child(even) > h3": {
            gridColumn: '-1 / -3',
            textAlign: 'end'
          },
          "&:nth-child(even) > svg": {
            gridColumn: '-1 / -2',
            marginLeft: 'auto',
            "@media (min-width: 768px)": {
              gridColumn: '1 / 2',
            }
          },
          "&:nth-child(even) > p": {
            gridColumn: '-1 / -4',
            textAlign: 'end',
            "@media (min-width: 768px)": {
              gridColumn: '2 / span 2',
            }
          },
        },
        ".link": {
          padding: `${theme("spacing.20")} 0`,
          display: "flex",
          gap: theme("spacing.5"),
          alignItems: "center",
          fontSize: theme("fontSize.a"),
          "& > a": {
            transition: theme("transitionDuration.300"),
          },

          "@media (min-width: 768px)": {
            padding: `${theme("spacing.30")} 0`,
          },

          "@media (min-width: 1200px)": {
            "& > a:hover": {
              color: theme("colors.accent"),
            },
            "& > a:active": {
              transition: theme("transitionDuration.300"),
              color: theme("colors.main"),
            },
          },
        },
        // ".castom": {
        //   "&:first-child:checked + &"
        // },
        ".btn": {
          fontSize: theme("fontSize.btn"),
          padding: `${theme("spacing.15")} ${theme("spacing.30")}`,
          border: theme("borderWidth.DEFAULT"),
          borderColor: theme("colors.main"),
          borderStyle: "solid",
          borderRadius: theme("borderRadius.5"),
          color: theme("colors.accent"),
          transition: theme("transitionDuration.300"),
          backgroundColor: theme("colors.bg"),
          "&:hover": {
            color: theme("colors.bg"),
            backgroundColor: theme("colors.main"),
            boxShadow: theme("boxShadow.btnShadow"),
          },
          "&:active": {
            transition: theme("transitionDuration.0"),
            color: theme("colors.accent"),
          },
          "@media (min-width: 768px)": {
            padding: `${theme("spacing.20")} ${theme("spacing.40")}`,
          },
          "@media (min-width: 1200px)": {
            padding: `${theme("spacing.25")} ${theme("spacing.50")}`,
          },
        },
      });
    }),
  ],
};

/*
container - 1170px gap - 30px

Fonts
font - Inter,
color - main,

logo - 32px bold, 
headerLink - 24px, 

h1 - fz 64px,
h2 - fz 48px, pt 50px,
h3 - fz 40px, tc accent, pt 50px,
p - fz 32px, py 50px,
span - tc accent,

h4 - fz 32px, tc accent, pt 30px,
its p - fz 28px, py 25px,

tableH - 24px
tableP - 16px

footerLink - 24px

Spacing
1170px
200px
150px
100px
50px
25px
20px
2px

*/
