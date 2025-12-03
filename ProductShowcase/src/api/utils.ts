export const extractIdFromUrl = (url: string): number | null => {
    const parts = url.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    const number = Number(last);
    
    return Number.isNaN(number) ? null : number;
}