import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const SettingsScreen = () => {

    const [sms, setsms] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();

    

    return (
        
        <SafeAreaView style={styles.container}>
            <Drawer.Screen 
            options={{ 
                headerShown: true, 
                title: 'Налаштування' 
            }} 
            />


            <Text style={{ fontSize: 12, marginBottom: 4 , marginTop: 16, color: "#aaaaaa", fontWeight: "bold"}}>ЗАГАЛЬНІ</Text>


            <View style={styles.all}>
                <TouchableOpacity style={styles.button1}>
        <View style={styles.leftContainer}>
            <Fontisto name="bell" size={20} color="#967fa5" />
            <Text style={styles.text}>Нагадування тренувань</Text>
        </View>
        <Switch
            value={sms}
            onValueChange={(newValue) => setsms(newValue)} 
        />
    </TouchableOpacity>


    <TouchableOpacity style={[styles.button1, { borderBottomWidth: 0 }]}>
        <View style={styles.leftContainer}>
            <FontAwesome name="moon-o" size={20} color="#967fa5" />
            <Text style={styles.text}>Темна тема</Text>
        </View>
        <Switch
            value={isDarkMode}
            onValueChange={(newValue) => setIsDarkMode(newValue)} 
        />
    </TouchableOpacity>


            </View>

            <Text style={{ fontSize: 12, marginBottom: 4 , marginTop: 16, color: "#aaaaaa", fontWeight: "bold"}}>АКАУНТ</Text>
           
            <View style={styles.all}>
                
            <TouchableOpacity style={[styles.button1, { borderBottomWidth: 0 }]} onPress={() => router.push('/profile')}>
            <View style={styles.leftContainer}>
            <FontAwesome6 name="user" size={20} color="#967fa5" />
             <Text style={styles.text}>Профіль</Text>
             <Ionicons name="chevron-forward" size={20} color="#aaaaaa" />
            
        </View>
       
    </TouchableOpacity>
    </View>

    <View style={styles.all}>
                
            <TouchableOpacity style={[styles.button1, { borderBottomWidth: 0 }]} onPress={() => router.push('/privacy')}>
            <View style={styles.leftContainer}>
            <Ionicons name="shield-outline" size={20} color="#967fa5" />
             <Text style={styles.text}>Конфіденціальність</Text>
             <Ionicons name="chevron-forward" size={20} color="#aaaaaa" />
            
        </View>
       
    </TouchableOpacity>
    </View>

            
               



            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,    
        backgroundColor: '#f5f5f5' 
    },
    all: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,        
        marginTop: 4,              
        width: '100%',             
        borderRadius: 15,
    },
    button1: {
        flexDirection: 'row',
        alignItems: 'center',        
        justifyContent: 'space-between', 
        paddingVertical: 14,         
        borderBottomWidth: 0.5,           
        borderBottomColor: '#dbdbdbfe',     
    },
    leftContainer: {
        flexDirection: 'row',             
        alignItems: 'center',             
    },
    text: {
        fontSize: 16,
        marginLeft: 15,                   
        color: '#333',
    }
})

export default SettingsScreen;
