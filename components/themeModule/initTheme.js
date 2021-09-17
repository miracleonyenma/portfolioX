const initTheme = () => {
    const savedTheme = localStorage.theme;
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const newTheme = {}

    console.log(savedTheme, userPrefersDark);
    (!savedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) ||
        (savedTheme && JSON.parse(savedTheme).mode === 'dark')
        ? (newTheme.mode = 'dark')
        : (newTheme.mode = 'light')

    localStorage.theme = JSON.stringify(newTheme)

    return { newTheme }
}

const setThemeClass = ({mode, el, className}) => {
    mode === 'dark'
    ? el.classList.add(className)
    : el.classList.remove(className)


}

export {initTheme, setThemeClass}