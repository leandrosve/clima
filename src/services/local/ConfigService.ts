interface LocalConfig {
  theme: "light" | "dark";
}

export default class ConfigService {
  static DEFAULT_CONFIG: LocalConfig = {
    theme: "dark",
  };

  static localConfig: LocalConfig = this.getLocalConfig();

  static initialize() {
    const config = this.getLocalConfig();
    if (config.theme == "dark") {
      document.documentElement.setAttribute("data-mode", "dark");
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
    this.localConfig.theme = theme;
    this.saveLocalConfig(this.localConfig);
    return this.localConfig.theme;
  }
}
