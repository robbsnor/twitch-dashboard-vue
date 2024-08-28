<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

export interface TabOption {
	value: string;
	text: string;
	preIcon?: string;
	postIcon?: string;
}

const props = defineProps<{
	value: string;
	options: TabOption[];
}>();

const emit = defineEmits<{
	(e: "update:value", value: string): void;
}>();

const selectIndicator = ref<HTMLDivElement | null>(null);
const optionRefs = ref(new Map<string, HTMLDivElement | null>());

const selectedItem = computed(() => {
	return (
		props.options.find((option) => option.value === props.value) ??
		props.options[0]
	);
});

const setValue = (option: TabOption) => {
	const el = optionRefs.value.get(option.value);

	if (el && selectIndicator.value) {
		const elHeight = el.offsetHeight;
		const elWidth = el.offsetWidth;
		const elTop = el.offsetTop;
		const elLeft = el.offsetLeft;

		selectIndicator.value.style.height = `${elHeight}px`;
		selectIndicator.value.style.width = `${elWidth}px`;
		selectIndicator.value.style.top = `${elTop}px`;
		selectIndicator.value.style.left = `${elLeft}px`;

		emit("update:value", option.value);
	}
};

const itemClass = (option: TabOption) => {
	return {
		item: true,
		"item--selected": option.value === props.value,
	};
};

onMounted(() => {
	setValue(selectedItem.value);
});
</script>

<template>
<div class="radio-text-group">
	<div
		v-for="option in options"
		:ref="(el) => optionRefs.set(option.value, el)"
		:key="option.value"
		@click="setValue(option)"
		:class="itemClass(option)"
	>
		<v-icon v-if="option.preIcon" size="18" class="item__pre-icon">
            {{			option.preIcon		}}
        </v-icon>
		<div class="item__text">{{ option.text }}</div>
		<v-icon v-if="option.postIcon" size="18" class="item__post-icon">{{
			option.postIcon
		}}</v-icon>
	</div>

	<div
		class="radio-text-group__selectect-indicator"
		ref="selectIndicator"
	></div>
</div>
</template>

<style scoped lang="scss">
.radio-text-group {
	position: relative;
	display: inline-flex;
	padding: 2px;
	border-radius: 12px;
	border: 1px solid $c-black-6;
	background: $c-black-4;
	margin-bottom: 20px;

	&__selectect-indicator {
		background-color: $c-black-1;
		border-radius: 10px;
		position: absolute;
		transition: 0.1s;
	}
}

.item {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 12px 20px;
	text-align: center;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
	z-index: 1;

	cursor: pointer;
	transition: 0.2s;

	&__pre-icon,
	&__post-icon {
		color: inherit;
	}

	&--selected {
		color: var(--v-primary-base);
		color: red;
	}
}
</style>
