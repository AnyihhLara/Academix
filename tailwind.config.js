const config = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

    plugins: [require('flowbite/plugin')],

    darkMode: 'class',

    theme: {
        screens: {
            'xs': '0px', //Mobile-S
            'sm': '321px', //Mobile-M 
            'md': '376px', ////Mobile-L 
            'lg': '426px', //Tablet 
            'xl': '769px', //Laptop/PC 
            '2xl': '1025px', //Laptop-L/PC-L 
            '3xl': '1441px', //4k
        },
        extend: {
            colors: {
                // flowbite-svelte
                primary: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    950: '#500724'
                },
                secondary: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    950: '#500724'
                }
            },
        }
    }
};

module.exports = config;

