import AddWorkoutModal from '@/src/components/addWorkoutModal';
import WorkoutCard from '@/src/components/WorkoutCard';
import { MOCK_WORKOUTS } from '@/src/constants/mockData';
import { useUIStore } from '@/src/store/uiStore';
import type { Workout } from '@/src/types/workout';
import { useWorkoutStore } from '@/src/workoutStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {

    const { workouts } = useWorkoutStore();

    const router = useRouter();

    const handleWorkoutPress = (workout: Workout) => {
        router.push({ pathname: "/workout/[id]", params: { id: workout.id } });
    }

    const isModalOpen = useUIStore(state => state.isAddWorkoutModalOpen);
    const ModalOpen = useUIStore(state => state.closeAddWorkoutModal);


    return (
        <View>
            <Text>Home</Text>

            <FlatList
            data={workouts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <WorkoutCard workout={item}
            onPress={handleWorkoutPress} />}
            />

            <AddWorkoutModal visible={isModalOpen} onClose={ModalOpen} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
