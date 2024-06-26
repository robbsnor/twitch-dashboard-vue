<script setup lang="ts">
import { TitleService } from '../../shared/services/title.service';

TitleService.setTitle('Games');
</script>

<template>
    <div class="games">
        <Section>
            <ul>
                <li>
                    <RouterLink to="/games/23894">Call of Duty: Black Ops</RouterLink>
                </li>
            </ul>
        </Section>
    </div>
</template>

<style scoped lang="scss">
.games {

    // @include screen($desktop) {
    // }
}
</style>
