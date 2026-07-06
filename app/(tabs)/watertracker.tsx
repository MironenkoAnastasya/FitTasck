import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const WaterTraker = () => {
    const [water, setwater] = useState(0);
    const [fill, setfill] = useState(0);
    const [modal, setmodal] = useState(false);
    const [tempSelected, setTempSelected] = useState(0); 
    const [history, setHistory] = useState<{ id: string; amount: number; time: string }[]>([]);
    
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>WaterTraker</Text>

            <AnimatedCircularProgress
                size={200}
                width={15}
                fill={fill} // Процент заполнения круга (от 0 до 100)
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
            >
                {(currentFill: number) => (
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#3d5875' }}>
                        {water} / 1500 ml
                    </Text>
                )}
            </AnimatedCircularProgress>

           
            <Pressable 
                onPress={() => setmodal(true)} 
                style={({ pressed }) => [styles.primaryButton, { width: '50%' }, pressed && { opacity: 0.8 }]}
            >
                <Text style={styles.primaryButtonText}>Додати</Text>
            </Pressable>


            

            <View style={{ marginTop: 20, width: '70%', alignItems: 'flex-start' }}>
                {history.map((item) => (
                    <Text key={item.id} style={{ fontSize: 16, color: '#000', marginVertical: 4 }}>
                        +{item.amount} ml o {item.time}
                    </Text>
                ))}
            </View>





            <Modal visible={modal} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Виберіть кількість</Text>

                        <View style={styles.rowContainer}>


                            {/* Стаканчик 100 мл */}
                            <TouchableOpacity 
                                onPress={() => setTempSelected(100)}
                                style={[styles.volumeItem, tempSelected === 100 && styles.activeBorder]}
                            >
                                <FontAwesome6 name="glass-water" size={24} color="black" />
                                <Text style={styles.volumeText}>100 ml</Text>
                            </TouchableOpacity>



                            {/* Бутылочка 200 мл */}
                            <TouchableOpacity 
                                onPress={() => setTempSelected(200)}
                                style={[styles.volumeItem, tempSelected === 200 && styles.activeBorder]}
                            >
                                <FontAwesome6 name="bottle-droplet" size={24} color="black" />
                                <Text style={styles.volumeText}>200 ml</Text>
                            </TouchableOpacity>




                            {/* Большая бутылка 300 мл */}
                            <TouchableOpacity 
                                onPress={() => setTempSelected(300)}
                                style={[styles.volumeItem, tempSelected === 300 && styles.activeBorder]}
                            >
                                <FontAwesome6 name="bottle-water" size={24} color="black" />
                                <Text style={styles.volumeText}>300 ml</Text>
                            </TouchableOpacity>

                        </View>





                        <Pressable 
                           onPress={() => {
                            if (tempSelected > 0) {
                                setwater(water + tempSelected);
                                setfill(fill + (tempSelected / 15)); 

                               
                                const now = new Date();
                                const timeString = now.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                });

                               
                                const newLog = {
                                    id: Math.random().toString(), 
                                    amount: tempSelected,
                                    time: timeString
                                };

                                
                                setHistory([newLog, ...history]);

                                setTempSelected(0);
                                setmodal(false);
                            } else {
                                setmodal(false);
                            }
                        }}
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && { opacity: 0.8 }
                            ]}
                        >
                            <Text style={styles.primaryButtonText}>Ок</Text>
                        </Pressable>





                       
                        <Pressable 
                            onPress={() => {
                                setmodal(false);
                                setTempSelected(0); 
                            }}
                            style={{ marginTop: 15 }}
                        >
                            <Text style={{ color: '#777', fontSize: 16 }}>Закрити</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,                          
        justifyContent: 'center',          
        alignItems: 'center',              
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },
    modalContent: {
        width: '85%',                     
        backgroundColor: 'white',         
        borderRadius: 20,                  
        padding: 25,                      
        alignItems: 'center',              
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,                      
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#000000',
    },
    
    rowContainer: {
        flexDirection: 'row',              
        justifyContent: 'space-around',     
        width: '100%',
        marginBottom: 25,
    },
    
    volumeItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        borderRadius: 14,                  
        borderWidth: 2,
        borderColor: 'transparent',       
        backgroundColor: '#f5f5f5',        
    },
    
    activeBorder: {
        borderColor: '#00e0ff',            
    },
    volumeText: {
        fontSize: 12,
        marginTop: 4,
    },
    
    primaryButton: {
        width: '100%',
        backgroundColor: '#049ae5',        
        paddingVertical: 10,
        borderRadius: 10,                 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    primaryButtonText: {
        color: 'white',                   
        fontSize: 16,
        fontWeight: '600',
    }
});

export default WaterTraker;