import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    components,
    defaults: {
        global: {
            flat: true,
            ripple: false,
        },
        VBtnToggle: {
            color: 'primary',
        },
        VCheckbox: {
            color: 'primary',
        },
        VCombobox: {
            clearable: true,
            hideDetails: 'auto',
            variant: 'solo',
        },
        VDialog: {
            transition: "slide-y-reverse-transition",
        },
        VImg: {
            // transition: '',
        },
        VMenu: {
            scrollStrategy: 'none',
        },
        VSelect: {
            clearable: true,
            hideDetails: 'auto',
            variant: 'solo',
        },
        VSwitch: {
            color: 'primary',
            hideDetails: 'auto',
        },
        VTextField: {
            clearable: true,
            variant: 'solo',
        },
        VTooltip: {
            location: 'top',
        },
    },
    directives,
    theme: {
        defaultTheme: 'twitch-dashboard-dark',
        themes: {
            'twitch-dashboard-dark': {
                colors: {
                    background: '#000000',
                    primary: '#cdf620',
                },
                dark: true,
            },
        },
    },
});
