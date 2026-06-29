import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkoutStore } from '../workoutStore';

type Props = {
    visible: boolean;
    onClose: () => void;
}

const AddWorkoutModal = ({visible, onClose}: Props) => {

    const [activeCategory, setActiveCategory] = useState('Сила');

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');




    const handleSave = () => {
    addWorkout({
        id: Math.random().toString(), 
        title: name,
        duration: Number(duration),
        category: activeCategory as any,
        exercises: [],
        scheduledAt: new Date().toISOString(),
    });

   
    setName('');
    setDuration('');
    onClose();
};




    const addWorkout = useWorkoutStore(state => state.addWorkout);
    
    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle='pageSheet'
            onRequestClose={onClose}>

            
            <SafeAreaView style={styles.container}>
           
            <Pressable onPress={onClose}>
                <Ionicons name="close" size={27} color="black" style={{marginRight: 10, marginTop: 10, alignSelf: 'flex-end'}} />
                <Text style={styles.text1}>Нове тренування</Text>
            </Pressable>

            <View>
                <Text style={styles.text2}>Назва</Text>
                <TextInput 
                    placeholder="Наприклад: Силове тренування А" 
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    value={name} 
                    onChangeText={setName}
                />
            </View>

            <View>
                <Text style={styles.text2}>Тривалість (хвилини)</Text>
                <TextInput 
                    placeholder="60" 
                    style={styles.input}
                    keyboardType="numeric"
                    placeholderTextColor="#aaaaaa" 
                    value={duration} 
                    onChangeText={setDuration}
                />
            </View>


             <Text style={styles.text2}>Категорія</Text>

            <View style={styles.button_all}>
               
                <Pressable style={[styles.button, activeCategory === 'Сила' && styles.buttonActive]} onPress={() => setActiveCategory('Сила')} >
                    <Text style={[styles.button_text, activeCategory === 'Сила' && styles.textActive]}  >Сила</Text>
                </Pressable>

                <Pressable style={[styles.button, activeCategory === 'Кардіо' && styles.buttonActive]} onPress={() => setActiveCategory('Кардіо')}>
                    <Text  style={[styles.button_text, activeCategory === 'Кардіо' && styles.textActive]}>Кардіо</Text>
                </Pressable>

                <Pressable style={[styles.button, activeCategory === 'Гнучкість' && styles.buttonActive]} onPress={() => setActiveCategory('Гнучкість')}>
                    <Text  style={[styles.button_text, activeCategory === 'Гнучкість' && styles.textActive]}>Гнучкість</Text>
                </Pressable>
            </View>

           <Pressable style={styles.button_add} onPress={handleSave}>
                <Text style={styles.text_add}>Додати тренування</Text>
            </Pressable>

            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text1: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        marginLeft: 10,
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#919191',
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 20
    },
    input: {
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: '#e0e0e0',
        backgroundColor: 'white',
    },
    button: {
        height: 45,
        width: 120,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#e0e0e0',
        backgroundColor: 'white', 
    },
    button_text: {
        fontSize: 14,
        color: '#8f8f8f',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button_all: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,                     
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdbfe',
    paddingHorizontal: 15,        
},
button_add: {
    height: 45,
    width: '90%', 
    alignSelf: 'center',       
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#7452f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,    
},
text_add:{
    fontSize: 14,
        color: '#fffafa',
        textAlign: 'center',
        fontWeight: 'bold'
},
buttonActive: {
    backgroundColor: '#7452f0',
    borderColor: '#7452f0',
},
textActive: {
    color: 'white',
},

})

export default AddWorkoutModal;