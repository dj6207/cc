export const formatDate = (date:Date):string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`;
}

export const randomHexColors = (amount:number):string[] => {
    return Array.from({length: amount}, () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`);
}

export const truncateString = (string: string | undefined, length: number = 10): string => {
    if (string) {
        return string.length > length ? `${string.slice(0, length)}...` : string;
    }
    return "?";
};

export const formatTime = (seconds: number): string => {
    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;

    if (seconds >= secondsInWeek) {
        const weeks = Math.floor(seconds / secondsInWeek);
        const days = Math.floor((seconds % secondsInWeek) / secondsInDay);
        return `${weeks}w ${days}d`;
    } else if (seconds >= secondsInDay) {
        const days = Math.floor(seconds / secondsInDay);
        const hours = Math.floor((seconds % secondsInDay) / secondsInHour);
        return `${days}d ${hours}h`;
    } else if (seconds >= secondsInHour) {
        const hours = Math.floor(seconds / secondsInHour);
        const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute);
        return `${hours}h ${minutes}m`;
    } else if (seconds >= secondsInMinute) {
        const minutes = Math.floor(seconds / secondsInMinute);
        const remainingSeconds = seconds % secondsInMinute;
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        return `${seconds}s`;
    }
}