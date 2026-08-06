import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProgressPhoto, getAllProgressPhoto, insertProgressPhoto } from "../db/queires/progressPhotos";
import { queryClient } from "../providers/QueryProvider";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const useProgressPhotos = () => {
    return useQuery({
        queryKey: ["progress-photos"],
        queryFn: () => getAllProgressPhoto(),
    });
}


export const useAddProgressPhoto = () => {
    return useMutation({
        mutationFn: (uri: string) => {


          // 📍 СТАВИМ СЮДА: проверяем, долетает ли URI фото до базы
        console.log("ПЫТАЕМСЯ СОХРАНИТЬ В БД URI:", uri);


        const newPhoto = {
            id: Date.now().toString(),
            uri,
            createdAt: new Date().toISOString(),
        };
        return insertProgressPhoto(newPhoto);
        },

        onSuccess: () => {
            // 📍 СТАВИМ СЮДА: проверяем, успешно ли база сохранила фото
            console.log("ФОТО УСПЕШНО ДОБАВЛЕНО В БД!");
            queryClient.invalidateQueries({ queryKey: ["progress-photos"] });
        }
        
    })
}

export const useDeleteProgressPhoto = () => {
    return useMutation({
        mutationFn: (id: string) => deleteProgressPhoto(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["progress-photos"] });
        },
    });
}

const getImageFromPicker = async (source: 'camera' | 'gallery') => {
  const isCamera = source === 'camera';


  // 📍 СТАВИМ СЮДА: узнать, что за функцию вызвали
  console.log("ЗАПРОШЕН ИСТОЧНИК:", source);
  
  const permission = isCamera 
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();


    // 📍 СТАВИМ СЮДА: узнать, есть ли разрешение от телефона
  console.log("РАЗРЕШЕНИЕ ПОЛУЧЕНО?:", permission.granted);



  if (!permission.granted) return null;

  const result = isCamera 
    ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8 })
    : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8 });


    // 📍 СТАВИМ СЮДА: посмотреть, что вернула галерея
  console.log("РЕЗУЛЬТАТ ИЗ ГАЛЕРЕИ:", result);

  if (result.canceled || !result.assets[0]?.uri) return null;

  return result.assets[0].uri;
}

export const usePhotoSourcePicker = () => {
  const { mutate: addPhoto } = useAddProgressPhoto();

  const handlePick = async (source: 'camera' | 'gallery') => {
    const uri = await getImageFromPicker(source);
    if (uri) addPhoto(uri);
  }

  const pickImage = () => {
    Alert.alert("Додати фото", "Оберіть джерело", [
      { text: "Камера", onPress: () => handlePick('camera') },
      { text: "Галерея", onPress: () => handlePick('gallery') },
      { text: "Скасувати", style: "cancel" },
    ]);
  };

  return { pickImage };
}