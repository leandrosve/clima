interface LocalConfig {
  theme: "light" | "dark";
  lang: string;
}

// Utilizo esta clase para manejar lo referente a la configuracion local del sitio
export default class ConfigService {
  static DEFAULT_CONFIG: LocalConfig = {
    theme: "dark",
    lang: "es",
  };

  static localConfig: LocalConfig = this.getLocalConfig();

  static initialize() {
    const config = this.getLocalConfig();
    if (config.theme == "dark") {
      document.documentElement.setAttribute("data-mode", "dark");
      document.documentElement.classList.add("dark");
    }
    return config;
  }

  static getLocalConfig(): LocalConfig {
    try {
      const stringConfig = localStorage.getItem("config");
      if (!stringConfig) return this.DEFAULT_CONFIG;
      return JSON.parse(stringConfig);
    } catch {
      localStorage.removeItem("config");
      return this.DEFAULT_CONFIG;
    }
  }

  static saveLocalConfig(config: LocalConfig) {
    localStorage.setItem("config", JSON.stringify(config));
  }

  static switchTheme() {
    const theme = this.localConfig.theme == "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-mode", theme);
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    this.localConfig.theme = theme;
    this.saveLocalConfig(this.localConfig);
    return this.localConfig.theme;
  }

  static changeLanguage(lang: string) {
    this.localConfig.lang = lang;
    this.saveLocalConfig(this.localConfig);
    return this.localConfig.lang;
  }
}
