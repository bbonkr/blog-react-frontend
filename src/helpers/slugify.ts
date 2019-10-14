/**
 * 슬러그로 사용할 수 있는 문자열로 변환합니다.
 * slug: strings into URL-friendly
 * @param text
 */
export const slugify = (text: string): string => {
    const slug: string = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    return slug;
};
