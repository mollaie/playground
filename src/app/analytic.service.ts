import { FirebaseAnalytics } from '@capacitor-firebase/analytics';

export const setUserId = async () => {
  await FirebaseAnalytics.setUserId({
    userId: '123',
  });
};

export const setUserProperty = async () => {
  await FirebaseAnalytics.setUserProperty({
    key: 'language',
    value: 'en',
  });
};

export const setCurrentScreen = async () => {
  await FirebaseAnalytics.setCurrentScreen({
    screenName: 'Login',
    screenClassOverride: 'LoginPage',
  });
};

export const logEvent = async () => {
  await FirebaseAnalytics.logEvent({
    name: 'sign_up',
    params: { method: 'password' },
  });
};

export const setSessionTimeoutDuration = async () => {
  await FirebaseAnalytics.setSessionTimeoutDuration({
    duration: 120,
  });
};

export const setEnabled = async () => {
  await FirebaseAnalytics.setEnabled({
    enabled: true,
  });
};

export const isEnabled = async () => {
  const { enabled } = await FirebaseAnalytics.isEnabled();
  return enabled;
};

export const resetAnalyticsData = async () => {
  await FirebaseAnalytics.resetAnalyticsData();
};
