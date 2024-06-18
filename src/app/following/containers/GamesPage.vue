<script setup lang="ts">
import { TitleService } from '../../shared/services/title.service';

TitleService.setTitle('Games');
</script>

<template>
    <div class="games">
        <Section>
            <ul>
                <li>
                    <a href="https://www.twitch.tv/directory/category/call-of-duty-black-ops" target="_blank">Call of Duty: Black Ops</a>
                </li>
                <li>
                    <a href="https://www.twitch.tv/directory/category/valorant" target="_blank">VALORANT</a>
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
