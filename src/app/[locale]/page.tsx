import SelectLanguage from "@/components/locale-switcher-select";
import { ModeToggle } from "@/components/mode-toggle";
import { localesType } from "@/i18n/i18n-config";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function Home({ params }: { params: Promise<{ locale: localesType }> }) {
    const { locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations("HomePage");

    return (
        <div>
            <h1>{t("title")}</h1>
            <div>{locale}</div>
            <Image src="/images/Netflix_Logo.png" alt="Netflix Logo" width={72} height={16} priority />
            <ModeToggle />
            <SelectLanguage />
        </div>
    );
}
