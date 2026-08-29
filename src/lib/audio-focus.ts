export const AUDIO_FOCUS_EVENT = "myway:audio-focus";

export function requestAudioFocus(source: string) {
  window.dispatchEvent(
    new CustomEvent<string>(AUDIO_FOCUS_EVENT, { detail: source }),
  );
}
