export const setCookie = (
    name: string,
    value: string,
    days: number,
    path: string = "/"
): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieValue =
        encodeURIComponent(value) +
        (days ? `; expires=${expires.toUTCString()}` : "") +
        `; path=${path}`;
    document.cookie = `${name}=${cookieValue}`;
};

export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};

export const convertDateString = (isoString: string): string => {
    const tanggal = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    return tanggal.toLocaleDateString("id-ID", options);
};
