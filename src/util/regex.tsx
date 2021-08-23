const regex: { [key: string]: string; } = {
    whitespaces: '^([!-~\\p{L}]+\\s(?!$)|[!-~\\p{L}]+$)+$',
}

export default regex;