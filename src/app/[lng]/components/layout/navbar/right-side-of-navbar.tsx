import LangageDropdown from "@/app/[lng]/components/layout/navbar/langage-dropdown";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { translate } from "@/app/i18n";

const RightSideOfNavbar = async ({ lng }: { lng: string }) => {
  const { t } = await translate(lng);

  return (
    <div
      className={styles.buttons}
      data-scroll
      data-scroll-speed="3"
      data-scroll-position="top"
    >
      <button className={styles.contact}>
        {t("navbar.buttons.contact-me")}
      </button>
      <LangageDropdown />
    </div>
  );
};

export default RightSideOfNavbar;
