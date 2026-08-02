import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

type PedometerState = {
    steps: number;
    isAvailable: boolean;
    isPermissionGranted: boolean;
    error: string | null;
}


const UsePedometer = () => {
    const [state, setState] = useState<PedometerState>({
        steps: 0,
            isAvailable: false,
        isPermissionGranted: false,
        error: null
    });
    

    useEffect(() => {
        let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;
        let isMounted = true;

        const setup = async () => {
            const available = await Pedometer.isAvailableAsync().catch(() => false);
            if (!available) {
                setState({...state, isAvailable: false, error: 'Крокомір не доступний на цьому пристрою'});
                return;
            }

            const {status} = Platform.OS === 'android' 
                ? await Pedometer.requestPermissionsAsync()
                : {status: 'granted'};

            if(status !== 'granted') {
                setState({...state, 
                    isPermissionGranted: false, 
                    isAvailable: true,
                    error: 'Дозвіл на використання крокоміра відмовлено'});
                return;
            }

            setState({...state, isPermissionGranted: true, isAvailable: true, error: null});

            if(Platform.OS === 'ios') {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - 1);

                const pastStepCountResult = await Pedometer.getStepCountAsync(
                    start, 
                    end
                ).catch(() => ({ steps: 0}))

                setState((prev) => ({
                    ...prev, 
                    steps: pastStepCountResult.steps
                }));
                    
            }

            subscription = Pedometer.watchStepCount((result) => {
                setState((prev) => ({...prev, steps: prev.steps + result.steps}));
                
            });


        }

        setup();

        return () => subscription?.remove()

     }, []);

    return state
}
export default UsePedometer;
