import { dictionaries } from '@/i18n/dictionaries';
import { useSettings } from '@/state/settings';

export const useTranslation = () => dictionaries[useSettings().lang];
