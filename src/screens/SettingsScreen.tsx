import { useNavigate } from 'react-router-dom';

import { explorerName } from '@/config';
import { useTranslation } from '@/i18n/use-translation';
import { isTelegram } from '@/lib/platform';
import type { Explorer, Lang, Theme } from '@/types';
import { useSettings } from '@/state/settings';
import { NavBar } from '@/ui/NavBar';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { ChevronLeft } from '@/ui/icons';

export function SettingsScreen() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { theme, lang, explorer, setTheme, setLang, setExplorer } = useSettings();

  return (
    <>
      <NavBar
        title={t.settings}
        left={
          isTelegram() ? undefined : (
            <button type="button" className="ts-nav__side ts-nav__side--left" onClick={() => navigate(-1)}>
              <ChevronLeft />
              {t.back}
            </button>
          )
        }
      />

      <div className="ts-scroll">
        <div className="ts-field-hint" style={{ marginTop: 18 }}>
          {t.appearance}
        </div>
        <SegmentedControl<Theme>
          options={[
            { value: 'light', label: t.light },
            { value: 'dark', label: t.dark },
          ]}
          value={theme}
          onChange={setTheme}
          height={38}
          fontSize={14.5}
        />

        <div className="ts-field-hint" style={{ marginTop: 22 }}>
          {t.language}
        </div>
        <SegmentedControl<Lang>
          options={[
            { value: 'en', label: 'English' },
            { value: 'ru', label: 'Русский' },
          ]}
          value={lang}
          onChange={setLang}
          height={38}
          fontSize={14.5}
        />

        <div className="ts-field-hint" style={{ marginTop: 22 }}>
          {t.explorerLabel}
        </div>
        <SegmentedControl<Explorer>
          options={(['tonviewer', 'tonscan'] as Explorer[]).map((value) => ({
            value,
            label: explorerName[value],
          }))}
          value={explorer}
          onChange={setExplorer}
          height={38}
          fontSize={14.5}
        />
      </div>
    </>
  );
}
