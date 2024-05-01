import useLocalStorage from "use-local-storage";
import { useEffect } from "react";

export function useTheme () {

    const [theme, setTheme] = useLocalStorage('dark', window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])


    return { theme, setTheme }
}