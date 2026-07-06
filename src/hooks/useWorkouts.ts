import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllWorkouts, getExercisesByWorkoutId, getWorkoutById, insertWorkoutWithExercises } from "../db/queires/workouts";
import { queryClient } from "../providers/QueryProvider";
import { NewExercise, NewWorkout } from "../db/schema";

export const useWorkouts = () => { 
    return useQuery({
      queryKey: ["workouts"],
      queryFn: () => getAllWorkouts()
    });
}

export const useWorkoutDetail = (id: string) => { 
    return useQuery({
        queryKey: ["workout", id],
        queryFn: async() => { 
            const workout = getWorkoutById(id);
            if (!workout) return null;
            const exs = await getExercisesByWorkoutId(id);
            return { ...workout, exercises: exs };
        },
        enabled: !!id 
    })
}
