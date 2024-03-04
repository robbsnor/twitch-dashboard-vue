import { ref } from 'vue';

export const useFetch = async (url: string) => {
    const data = ref();
    const error = ref();

    fetch(url)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err));

    return { data, error };
};
