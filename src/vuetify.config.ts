import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    theme: {
        defaultTheme: 'twitchDashboardDark',
        themes: {
            twitchDashboardDark: {
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
        },
        VTextField: {
            variant: 'solo',
            clearable: true,
            hideDetails: 'auto',
        },
        VCombobox: {
            variant: 'solo',
            clearable: true,
            hideDetails: 'auto',
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
    },
    components,
    directives,
});
