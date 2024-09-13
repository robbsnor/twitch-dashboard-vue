import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    theme: {
        defaultTheme: 'twitch-dashboard-dark',
        themes: {
            'twitch-dashboard-dark': {
                dark: true,
                colors: {
                    primary: '#cdf620',
                    background: '#000000',
                }
            }
        }
    },
    defaults: {
        global: {
            ripple: false,
            flat: true,
        },
        VTextField: {
            variant: 'solo',
            clearable: true,
        },
        VCombobox: {
            variant: 'solo',
            clearable: true,
            hideDetails: 'auto',
        },
        VDialog: {
            transition: "slide-y-reverse-transition",
        },
        VSelect: {
            variant: 'solo',
            clearable: true,
            hideDetails: 'auto',
        },
        VCheckbox: {
            color: 'primary',
        },
        VSwitch: {
            hideDetails: 'auto',
            color: 'primary',
        },
        VBtnToggle: {
            color: 'primary',
        },
        VTooltip: {
            location: 'top',
        },
        VImg: {
            // transition: '',
        }
    },
    components,
    directives,
});
