<script setup lang="ts">
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';

const props = defineProps<{
    image: string;
    name: string;
    id: string;
}>();

const favouriteStore = useFavouriteStore();
</script>

<template>
    <div class="relative overflow-hidden bg-black">
        <img class="absolute inset-0 z-0 size-full object-cover opacity-30 blur-[50px]" :src="props.image" />

        <Container>
            <div class="relative flex items-end justify-between pt-20 pb-5 md:pt-40">
                <div class="flex items-end gap-5">
                    <img class="w-[50px] rounded md:w-[100px]" :src="props.image" alt="game image" />
                    <h1 class="m-0 p-0 text-[24px] font-bold md:text-4xl">{{ props.name }}</h1>
                </div>

                <div>
                    <v-icon
                        v-if="favouriteStore.categoryIds.includes(props.id)"
                        @click="favouriteStore.removeCategory(props.id)"
                        color="primary"
                    >
                        mdi-heart
                    </v-icon>
                    <v-icon v-else @click="favouriteStore.addCategory(props.id)" class="text-black-1200">
                        mdi-heart-outline
                    </v-icon>
                </div>
            </div>
        </Container>
    </div>
</template>
