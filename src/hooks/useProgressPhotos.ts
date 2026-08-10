import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { Directory, File, Paths } from "expo-file-system";
import { nanoid } from "nanoid/non-secure";
import { deleteProgressPhoto, getAllProgressPhotos, insertProgressPhoto } from "@/src/db/queires/progressPhotos";
import type { NewProgressPhoto } from "@/src/db/schema";

const TRACKER_PHOTOS_TAG = ["progressPhotos"];

export function useProgressPhotos() {
  return useQuery({
    queryKey: TRACKER_PHOTOS_TAG,
    queryFn: async () => {
      return await getAllProgressPhotos();
    },
  });
}

export function usePhotoSourcePicker() {
  const openCameraCapture = async () => {
    const camPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (!camPerm.granted) {
      Alert.alert("Помилка доступу", "Будь ласка, надайте дозвіл на використання камери");
      return null;
    }
    const snap = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.75,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (snap.canceled) {
      return null;
    }
    return snap.assets[0].uri;
  };

  const openGallerySelect = async () => {
    const galPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!galPerm.granted) {
      Alert.alert("Помилка доступу", "Будь ласка, дозвольте доступ до галереї фотографій");
      return null;
    }
    const pick = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.75,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (pick.canceled) {
      return null;
    }
    return pick.assets[0].uri;
  };

  const chooseSource = () => {
    return new Promise<string | null>((resolve) => {
      Alert.alert("Нове фото", "Звідки бажаєте додати знімок?", [
        {
          text: "Камера",
          onPress: async () => {
            resolve(await openCameraCapture());
          },
        },
        {
          text: "Галерея",
          onPress: async () => {
            resolve(await openGallerySelect());
          },
        },
        {
          text: "Скасувати",
          style: "cancel",
          onPress: () => resolve(null),
        },
      ]);
    });
  };

  return {
    chooseSource,
  };
}

export function useAddProgressPhoto() {
  const clientManager = useQueryClient();

  return useMutation({
    mutationFn: async (photoUri: string) => {
      const targetFolder = new Directory(Paths.document, "my-workout-images");
      if (!targetFolder.exists) {
        targetFolder.create();
      }
      const targetFile = new File(targetFolder, `photo_${Date.now()}.jpg`);
      const originFile = new File(photoUri);
      await originFile.copy(targetFile);
      
      const recordItem: NewProgressPhoto = {
        id: nanoid(),
        uri: targetFile.uri,
        createdAt: new Date().toISOString(),
      };
      
      await insertProgressPhoto(recordItem);
      return recordItem;
    },
    onSuccess: () => {
      clientManager.invalidateQueries({
        queryKey: TRACKER_PHOTOS_TAG,
      });
    },
  });
}

export function useDeleteProgressPhoto() {
  const clientManager = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, uri }: { id: string; uri: string }) => {
      const targetFile = new File(uri);
      if (targetFile.exists) {
        targetFile.delete();
      }
      await deleteProgressPhoto(id);
    },
    onSuccess: () => {
      clientManager.invalidateQueries({
        queryKey: TRACKER_PHOTOS_TAG,
      });
    },
  });
}