import { Button } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  {  AnimatedCircularProgress  }  from  'react-native-circular-progress' ;
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const WaterTraker = () => {

    const [water, setwater] = useState(0);
    const [fill, setfill] = useState(0);
    const [modal, setmodal] = useState(false);
    
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>WaterTraker</Text>

       

        <AnimatedCircularProgress
            size={200}
            width={15}
            fill={fill} // Процент заполнения круга (от 0 до 100)
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
        />

         <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{water} ml</Text>
        <Button onPress={() => setmodal(true)} >Add</Button>

       {/*
        <Modal visible={modal} transparent={true} animationType="slide" style={styles.modal}>

        <Button onPress={() => {
            setwater(water + 100);
             setfill(fill + 10);
        }}>1</Button>

        <Button onPress={() => {
            setwater(water + 200);
             setfill(fill + 20);
        }}>2</Button>

        <Button onPress={() => {
            setwater(water + 300);
             setfill(fill + 30);
        }}>3</Button>
        
        </Modal>*/}



        <Modal visible={modal} transparent={true} animationType="fade">
  
  {/* СЛОЙ 1: Внешний контейнер (Тёмный фон на весь экран) */}
  <View style={styles.modalOverlay}>
    
    {/* СЛОЙ 2: Внутренний контейнер (Белое окошко по центру) */}
    <View style={styles.modalContent}>
      
      {/* Сюда ты будешь складывать свои тексты, иконки и кнопки */}
      <Text style={styles.modalTitle}>Виберіть кількість</Text>


      <TouchableOpacity onPress={() => {
            setwater(water + 100);
             setfill(fill + 10);
        }}><FontAwesome6 name="glass-water" size={24} color="black" />
        <Text>100 ml</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => {
            setwater(water + 200);
             setfill(fill + 20);
        }}>
            <FontAwesome6 name="bottle-droplet" size={24} color="black" />
            <Text>200 ml</Text>
        </TouchableOpacity>




        <TouchableOpacity onPress={() => {
            setwater(water + 300);
             setfill(fill + 30);
        }}>
            
            <FontAwesome6 name="bottle-water" size={24} color="black" />
            <Text>300 ml</Text>
        </TouchableOpacity>


      
      {/* Кнопка закрытия для теста */}
      <Button onPress={() => setmodal(false)} >Закрыть</Button>
      <Button style={{borderColor: '#0bc8c8'}} >Ок</Button>

    </View>

  </View>
</Modal>

    </View>




);
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,                           // Занимает 100% высоты и ширины экрана
        justifyContent: 'center',          // Выравнивает внутреннее белое окошко строго по вертикальному центру
        alignItems: 'center',              // Выравнивает внутреннее белое окошко строго по горизонтальному центру
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Тот самый полупрозрачный серый фон (черный цвет с прозрачностью 40%)
    },
        modalContent: {
        width: '85%',                      // Окошко не должно прилипать к краям экрана, делаем его чуть уже (85% от ширины)
        backgroundColor: 'white',          // Белый фон карточки
        borderRadius: 20,                  // Красивые скругленные уголки, как у тебя на макете
        padding: 25,                       // Внутренние отступы, чтобы текст и кнопки не прижимались к краям белого пластика
        alignItems: 'center',              // Чтобы весь текст и элементы внутри карточки автоматически выстраивались по центру
        
    // Добавим мягкую тень, чтобы окошко казалось объемным и «летало» над экраном:
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,    
                         // Тень для Android
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,                  // Отступ снизу, чтобы иконки не прилипали к заголовку
        color: '#000000',
        flexDirection: 'row',
    },
    
})

export default WaterTraker;
