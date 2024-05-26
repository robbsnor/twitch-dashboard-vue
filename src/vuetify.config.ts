import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    defaults: {
        global: {
            ripple: false,
        },
        VTextField: {
            variant: 'solo',
            clearable: true,
            hideDetails: true,
        },
        VCombobox: {
            variant: 'solo',
            clearable: true,
            hideDetails: true,
        },
        VSwitch: {
            hideDetails: true,
            color: 'primary',
        },
        VBtnToggle: {
            color: 'primary',
        }
    },
    components,
    directives,
});
