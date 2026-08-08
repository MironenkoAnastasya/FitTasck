
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProgressPhotoGallery = () => {
  return (
    <View>
      <Text>Фотогалерея</Text>
    </View>
  );
}

const styles = StyleSheet.create({})

export default ProgressPhotoGallery;



{/*
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Пример интерфейса для объекта фотографии
interface PhotoItem {
  id: string;
  uri: string;
}

export const ProgressPhotoGallery = () => {
  // 1. Состояние для списка фотографий
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  // Функция добавления нового фото (тут потом подключишь выбор из галереи/камеры)
  const handleAddPhoto = () => {
    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      // Временная заглушка для теста
      uri: 'https://via.placeholder.com/150',
    };
    setPhotos((prev) => [...prev, newPhoto]);
  };

  // Функция удаления фото по id
  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Галерея прогресу</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPhoto}>
          <Text style={styles.addButtonText}>+ Додати</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        // Отображение каждого элемента сетки
        renderItem={({ item }) => (
          <View style={styles.photoCard}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePhoto(item.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        // Порожній стан з підказкою (выводится, если массив photos пуст)
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Галерея порожня</Text>
            <Text style={styles.emptySubText}>
              Натисніть кнопку "+ Додати", щоб додати перше фото
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
  },
  photoCard: {
    flex: 1,
    margin: 6,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8e8e93',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#aeaeb2',
    textAlign: 'center',
  },
});

*/}