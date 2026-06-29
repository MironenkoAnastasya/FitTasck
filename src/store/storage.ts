import AcyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    setItem : (key: string, value: string) => AcyncStorage.setItem(key, value),
    getItem : (key: string) => AcyncStorage.getItem(key),
    removeItem : (key: string) => AcyncStorage.removeItem(key),
}