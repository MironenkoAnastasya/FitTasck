import { ConfigContext, ExpoConfig } from '@expo/config';


// !!! process.env.APP_VARIANT
const APP_VARIANT = process.env.APP_VARIANT || 'production'; //варіант збірки (production, preview, development)
const isDev = APP_VARIANT === 'development';
const isPreview = APP_VARIANT === 'preview';

const appName = isDev ? 'Fit dev' : isPreview ? 'Fit preview' : 'Fit';
const bundleId = isDev ? "com.fit.dev" : isPreview ? "com.fit.preview" : "com.fit";

const EAS_PROJECT_ID = 'a76c335d-ef59-4e5d-b40b-3d4b95767a14' // реальний ID проекту EAS

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config, //app.json
    name: appName,
    slug: 'fit-track',
    version: '1.0.0',
    orientation : "portrait",
    icon: "./assets/images/icon.png",
    scheme: "fittrack", // потрібно для deep linking та expo-updates
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleId,
    },
    android: {
        package: bundleId,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png"
      },
    },
    //////// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

    extra: {
      router: {},
      eas: {
        projectId: EAS_PROJECT_ID
      },
    apiUrl: process.env.API_URL || 'http://api.fittrack.com', // URL API для сервера бекенду
    variant: APP_VARIANT,
    }

})