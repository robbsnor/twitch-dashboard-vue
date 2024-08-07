<script setup lang="ts">
import { TitleService } from "../../shared/services/title.service";

TitleService.setTitle("Games");
</script>

<template>
    <Section>
        <ul>
            <li>
                <RouterLink to="/games/call of duty: black ops"
                    >Call of Duty: Black Ops
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/games/valorant">VALORANT</RouterLink>
            </li>
        </ul>
    </Section>
</template>

<style scoped lang="scss"></style>
