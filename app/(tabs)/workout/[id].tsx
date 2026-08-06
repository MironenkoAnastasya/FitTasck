import DraggableExerciseList from '@/src/components/DraggableExerciseList';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SHADOW, SPACING } from '@/src/constants/theme';
import { useWorkoutStore } from '@/src/store/workoutStore';
import { WorkoutCategory } from '@/src/types/workout';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const CATEGORY_COLORS: Record<WorkoutCategory, string> = {
  strength: COLORS.strength,
  cardio: COLORS.cardio,
  flexibility: COLORS.flexibility,
};

const WorkoutDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workout = useWorkoutStore(state => state.workouts.find(w => w.id === id));
  const reorderExercises = useWorkoutStore(state => state.reorderExercises);  

  const toggleExerciseComplete = useWorkoutStore(state => state.toggleExerciseComplete); // 👈 Добавляем


  
  
  // ✅ СТАЛО (массив выбранных ID):
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

    if (!workout) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText}>Тренування не знайдено</Text>
        </View>
      );
    }

    const accentColor = CATEGORY_COLORS[workout.category];
    const isCompleted = !!workout.completedAt;



    const uncompletedExercises = workout.exercises.filter(e => !e.completed);
    const completedExercises = workout.exercises.filter(e => e.completed);



    const handleSelectExercise = (exerciseId: string) => {
    setSelectedExerciseIds(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) // если уже было выбрано — убираем
        : [...prev, exerciseId]                // если не было — добавляем
      );
  };


   return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Статус виконання */}
        {isCompleted && (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.completedText}>
              Виконано {new Date(workout.completedAt!).toLocaleDateString('uk-UA')}
            </Text>
          </View>
        )}

        {/* Інфо-блок */}
        <View style={[styles.infoBlock, { borderTopColor: accentColor }]}>
          <View style={styles.infoRow}>
            <InfoItem icon="time-outline" label="Тривалість" value={`${workout.duration} хв`} color={accentColor} />
            <View style={styles.infoDivider} />
            <InfoItem icon="list-outline" label="Вправ" value={String(workout.exercises.length)} color={accentColor} />
          </View>
        </View>

        {/* Список вправ */}
        {workout.exercises.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Програма</Text>
            
            <DraggableExerciseList
              exercises={uncompletedExercises}
              accentColor={accentColor}
              onReorder={(exercises) => reorderExercises(workout.id, [...exercises, ...completedExercises])}
              selectedExerciseIds={selectedExerciseIds}
              onSelectExercise={handleSelectExercise} // 👈 ТЕПЕРЬ ТУТ ВЫЗЫВАЕТСЯ НАША ФУНКЦИЯ ВЫБОРА!
            />
              
              
             

            {/* 👇 ДОБАВЬ ВОТ ЭТОТ КУСОЧЕК НИЖЕ: */}
            {completedExercises.length > 0 && (
              <View style={{ marginTop: SPACING.xl }}>
                <Text style={[styles.sectionTitle, { color: COLORS.textSecondary }]}>
                  Виконані
                </Text>
                <DraggableExerciseList
                  exercises={completedExercises}
                  accentColor={accentColor}
                  onReorder={(exercises) => {
                    reorderExercises(workout.id, [...uncompletedExercises, ...exercises]);
                  }}
                  selectedExerciseIds={selectedExerciseIds}
                  onSelectExercise={(exerciseId) => {
                    toggleExerciseComplete(workout.id, exerciseId);
                  }}
                />
              </View>
            )}
            {/* 👆 КОНЕЦ ДОБАВЛЕНИЯ */}


          </>
        ) : (
          <View style={styles.noExercises}>
            <Text style={styles.noExercisesText}>
              Вправи ще не додані{'\n'}(додамо на тижні 6)
            </Text>
          </View>
        )}

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.startBtn,
            { backgroundColor: isCompleted ? COLORS.success : accentColor },
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => {
    // Проходим по всем выделенным и меняем им статус
          selectedExerciseIds.forEach((exerciseId) => {
            toggleExerciseComplete(workout.id, exerciseId);
          });
          // Очищаем выбор
          setSelectedExerciseIds([]);
        }}
        disabled={isCompleted}
      >
          <Ionicons name={isCompleted ? 'checkmark' : 'play'} size={20} color="#fff" />
          <Text style={styles.startBtnText}>
            {isCompleted ? 'Виконано' : 'Позначити як виконане'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}


function InfoItem({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  errorText: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary },
  backBtn: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
  },
  backBtnText: { color: "#fff", fontWeight: "600" },

  completedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.success + "15",
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  completedText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.success,
    fontWeight: "500",
  },

  infoBlock: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderTopWidth: 3,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOW.sm,
  },
  infoRow: { flexDirection: "row", alignItems: "center" },
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  infoItem: { flex: 1, alignItems: "center", gap: SPACING.xs },
  infoValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  infoLabel: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary },

  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },

  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    marginTop: SPACING.xl,
  },
  startBtnText: { color: "#fff", fontSize: FONT_SIZE.md, fontWeight: "600" },

  noExercises: { alignItems: "center", paddingVertical: SPACING.xl },
  noExercisesText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: 20,
  },
});


export default WorkoutDetailScreen;