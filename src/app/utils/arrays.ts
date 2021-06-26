export default {
    difference<T>(arr1: T[], arr2: T[]): T[] {
        return arr1.filter(item => !arr2.includes(item));
    },

    flatten<T>(arr: T[][]): T[] {
        return [].concat.apply([], arr);
    },

    forEachBoth<T>(arr1: T[], arr2: T[], callback: (item1: T, item2: T, index: number) => void) {
        if (arr1 == undefined || arr1 == null)
            throw new Error("Cannot iterate through undefined value");

        if (arr1.length != arr2.length)
            throw new Error("Length of both arrays must be equal");

        if (arr1.length == 0 && arr2.length == 0)
            return;

        for (let index = 0; index < arr1.length; index++) {
            const item1 = arr1[index];
            const item2 = arr2[index];
            callback(item1, item2, index);
        }
    },

    mapBoth<T, U>(arr1: T[], arr2: T[], callback: (item1: T, item2: T, index: number) => U): U[] {
        if (arr1 == undefined || arr1 == null)
            throw new Error("Cannot iterate through undefined value");

        if (arr1.length != arr2.length)
            throw new Error("Length of both arrays must be equal");

        if (arr1.length == 0 && arr2.length == 0)
            return [];
        
        const mappedArray = [];

        for (let index = 0; index < arr1.length; index++) {
            const item1 = arr1[index];
            const item2 = arr2[index];
            const mappedItem = callback(item1, item2, index);
            mappedArray.push(mappedItem);
        }

        return mappedArray;
    },

    fromRange(start: number, end: number){
        return Array.from({length: end - start}, (_, index) => index + start);
    },

    toSet<T>(arr: T[]): Set<T> {
        return new Set(arr);
    },
}
