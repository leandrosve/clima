import { useState } from "react";
import Dropdown from "../common/Dropdown";
import LangIcon from "../../icons/LangIcon";
import Button, { LinkButton } from "../common/Button";
import ConfigService from "../../services/local/ConfigService";
import { useTranslation } from "react-i18next";
import MoonIcon from "../../icons/MoonIcon";
import SunIcon from "../../icons/SunIcon";
import { languages } from "../../model/static/languages";
import LinkedinIcon from "../../icons/LinkedinIcon";
import GithubIcon from "../../icons/GithubIcon";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    ConfigService.localConfig.theme
  );
  const { i18n } = useTranslation();
  return (
    <div className="my-2 flex justify-between">
      <div className="flex gap-1">
        <LinkButton
          href="https://www.linkedin.com/in/leandro-svetlich"
          target="_blank"
          className="bg-transparent text-content-300"
        >
          <LinkedinIcon />
        </LinkButton>
        <LinkButton
          href="https://github.com/leandrosve/clima"
          target="_blank"
          className="bg-transparent text-content-300"
        >
          <GithubIcon />
        </LinkButton>
      </div>
      <div className="flex gap-0 border-borders border dark:border-none rounded-md">
        <Dropdown
          options={languages.map((l) => l.code)}
          value={i18n.language}
          renderOption={(code) => languages.find((l) => l.code == code)?.name}
          label={
            <>
              <LangIcon className="size-4" />
              {i18n.language}
            </>
          }
          buttonProps={{
            "aria-label": "select language",
            className:
              "w-12 h-10 justify-center rounded-r-none border-r border-borders",
          }}
          onChange={(l) =>
            i18n.changeLanguage(l, () => ConfigService.changeLanguage(l))
          }
        />
        <Button
          className="w-12 h-10 justify-center rounded-l-none"
          aria-label="switch color theme"
          onClick={() => setTheme(ConfigService.switchTheme())}
        >
          {theme == "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </div>
  );
};

export default Header;
