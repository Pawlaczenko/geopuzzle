export function addStrongTags(text: string): string {
    return text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
}