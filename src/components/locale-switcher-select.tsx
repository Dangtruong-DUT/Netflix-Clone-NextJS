"use client";

import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import useLanguage from "@/hooks/shared/useLanguage";
import { LANGUAGES } from "@/i18n/i18n-config";

export default function SelectLanguage() {
    const t = useTranslations("SwitchLanguage");
    const locale = useLocale();

    const { onChange, isPending } = useLanguage();

    return (
        <Select value={locale} onValueChange={onChange} disabled={isPending}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={t("label")} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t("label")}</SelectLabel>
                    {LANGUAGES.map(({ value, labelKey }) => (
                        <SelectItem key={value} value={value}>
                            {t(labelKey as "en" | "vi")}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
