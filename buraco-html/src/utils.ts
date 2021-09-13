export const isFaceDown = (source: string | number) => (typeof source === 'number' || source === 'deck');

export const forceRedraw = (element: HTMLElement) => {
    const original = element.style.visibility;
    element.style.visibility = 'hidden';

    // eslint-disable-next-line
    element.offsetHeight;

    element.style.visibility = original;
}
