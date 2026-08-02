import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const News = () => {

    const NEWS_DATA = [
  {
    id: '1',
    title: 'Оля Полякова назвала три правила своєї ідеальної форми',
    description: "Регулярні фізичні навантаження: Оля Полякова підтримує форму завдяки постійним тренуванням — бігу, силовим вправам та фітнесу. Контроль харчування та гідратація: Співачка відмовляється від шкідливої ​​їжі, солодощів та алкоголю перед важливими зйомками, а також п'є багато чистої води. Дисципліна та активність: Головний секрет фігури артистки – не разові дієти, а системний підбір корисних звичок та постійний рух у повсякденному житті. ",
    image: 'https://duflu.org.ua/wp-content/uploads/2026/03/olya-polyakova-fygura.jpg', 
  },

  {
    id: '2',
    title: "Чому в сезон малини її потрібно їсти щодня",
    description: "Малина багата на вітамін C та антиоксиданти, які зміцнюють імунітет та поліпшують травлення. Проте людям із захворюваннями нирок слід споживати її з обережністю.",
    image: 'https://img.tsn.ua/cached/458/tsn-2caa9e2b3b3790ab31ffc1dec16b4315/thumbs/1200x630/eb/fd/53aa188d5e9893c2336025de1055fdeb.jpeg',
}, 
{
    id: '3',
    title: "Вівсянка на ніч покращує роботу мозку",
    description: "Вівсянка, приготовлена на ніч, зберігає повільні вуглеводи та полегшує засвоєння мікроелементів, що покращує пам'ять та концентрацію.",
    image: 'https://focus.ua/static/storage/thumbs/1840x920/5/e4/i4kz6n---c5472x2736x0sx156s--8bd41d2194770f8023232809c109de45.webp?v=7540_1',
},
{
    id: '4',
    title: "Вчені назвали найкорисніший вид спорту",
    description:      "Найкорисніший вид спорту: Вчені назвали плавання найкориснішим спортом на планеті, оскільки воно перевершує за користю навіть біг та ходьбу. Зниження ризику смерті на 50%: Тривале 32-річне дослідження за участю 40 тисяч чоловіків показало, що у плавців рівень ризику передчасної смерті удвічі нижчий, ніж у любителів бігу чи ходьби. Здоров'я серця та реабілітація: Плавання чудово тренує серцево-судинну систему, підвищує витривалість і є ідеальним вибором для людей з хронічними хворобами чи під час відновлення після травм.",
    image: 'https://img.tsn.ua/cached/112/tsn-87394d020f46df1bdfb04b5785c6f4e0/thumbs/1200x630/1c/66/2b71fc878d27a1e0c4e010130b8f661c.jpeg'
}

];

const [openedNewsId, setOpenedNewsId] = useState<string | null>(null);
    return (
        
        <ScrollView style={{ padding: 16 }}>
        {NEWS_DATA.map((item) => (
            <Pressable 
            key={item.id} 
            onPress={() => setOpenedNewsId(openedNewsId === item.id ? null : item.id)}
            style={styles.card}
            >
            <Image source={{ uri: item.image }} style={styles.image} />
            
           
            <Text style={styles.title}>{item.title}</Text>

            {openedNewsId !== item.id && (
                <Text style={styles.dots}>...</Text>
            )}

            {openedNewsId === item.id && (
                <Text style={styles.description}>{item.description}</Text>
            )}
            </Pressable>
        ))}
</ScrollView>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  dots: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#888',
  marginTop: 4,
},
});

export default News;

