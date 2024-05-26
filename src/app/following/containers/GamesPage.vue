<script setup lang="ts">
import { TitleService } from '../../shared/services/title.service';
import { useLiveStore } from '../stores/live.store';

TitleService.setTitle('Games');
const liveStore = useLiveStore();
</script>

<template>
    <div class="games">
        <Section hideHeader>
            <PageTabs :title="liveStore.pageTabs.title" :pages="liveStore.pageTabs.paths" />
        </Section>

        <Section>
            <ul>
                <li>
                    <a href="https://www.twitch.tv/directory/category/call-of-duty-black-ops" target="_blank">Call of Duty: Black Ops</a>
                </li>
            </ul>
        </Section>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.games {
    &__cards {
        display: grid;
        gap: rem(50px);
    }

    &__card {
        width: 100%;
    }

    @include screen(800px) {
        &__cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include screen(1200px) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
        }

        &__card {
            &:nth-child(3n - 1) {
                margin-top: rem(50px);
            }
        }
    }
}
</style>
