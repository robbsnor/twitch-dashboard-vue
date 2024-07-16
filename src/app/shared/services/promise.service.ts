export class PromiseService {
    /**
     * Pauses the execution for the specified number of milliseconds.
     * @param ms - The number of milliseconds to sleep.
     * @returns A promise that resolves after the specified number of milliseconds.
     */
    public static sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
