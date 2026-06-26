import { useCallback, useRef, useState } from 'react';

const RESET_DELAY = 1300;

const fallbackCopy = (text: string): void => {
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-9999px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    document.execCommand('copy');
    document.body.removeChild(area);
  } catch {
    return;
  }
};

const writeClipboard = (text: string): void => {
  try {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      return;
    }
  } catch {
    fallbackCopy(text);
    return;
  }
  fallbackCopy(text);
};

export const useCopy = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback((text: string, key: string) => {
    writeClipboard(text);
    setCopied(key);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), RESET_DELAY);
  }, []);

  return { copied, copy };
};
