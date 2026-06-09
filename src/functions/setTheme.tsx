export default function setTheme(mode?: string) {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    let theme = mode ?? localStorage.getItem('web_app_theme_mode') ?? "system"
    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        root.classList.add(systemTheme)
    } else {
        root.classList.add(theme)
    }

    // Save selected theme so when reload it still the same choice
    if (mode) {
        localStorage.setItem('web_app_theme_mode', mode)
    }

}