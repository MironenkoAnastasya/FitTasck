import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useAddProgressPhoto,
  useDeleteProgressPhoto,
  usePhotoSourcePicker,
  useProgressPhotos,
} from "@/src/hooks/useProgressPhotos";

import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
} from "@/src/constants/theme";

export default function ProgressPhotoGallery() {
  const { data: photos = [], isLoading } = useProgressPhotos();
  const { chooseSource } = usePhotoSourcePicker();
  const addPhotoMutation = useAddProgressPhoto();
  const deletePhotoMutation = useDeleteProgressPhoto();

  const handleAddPhoto = async () => {
    const selectedUri = await chooseSource();
    if (!selectedUri) return;
    addPhotoMutation.mutate(selectedUri);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <Text style={styles.loading}>Завантаження фото...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Фото прогресу</Text>

        <Pressable onPress={handleAddPhoto} style={styles.addButton}>
          <Ionicons name="camera-outline" size={18} color={COLORS.surface} />
          <Text style={styles.addButtonText}>Додати</Text>
        </Pressable>
      </View>

      {photos.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="camera-outline" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>Немає фото</Text>
          <Text style={styles.emptyText}>Фотографуй прогрес раз на тиждень щоб бачити зміни</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.photoWrapper}>
              <View style={styles.photoCard}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.image}
                  contentFit="cover"
                  transition={200}
                />

                <Pressable
                  style={styles.deleteButton}
                  onPress={() =>
                    deletePhotoMutation.mutate({
                      id: item.id,
                      uri: item.uri,
                    })
                  }
                >
                  <Ionicons name="trash-outline" size={16} color={COLORS.surface} />
                </Pressable>
              </View>
              {item.createdAt && (
                <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
    gap: 6,
  },
  addButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  photoWrapper: {
    width: "48%",
  },
  photoCard: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: BORDER_RADIUS.sm,
    overflow: "hidden",
    backgroundColor: COLORS.border,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 6,
    borderRadius: BORDER_RADIUS.full,
  },
  dateText: {
    marginTop: 4,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  emptyCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  loading: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textSecondary,
  },
});