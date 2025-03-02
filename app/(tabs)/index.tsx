import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { UserService } from '@/apis';
import { useGlobalContext } from '@/context/GlobalContext';

const Index = () => {
  const { setUserinfo } = useGlobalContext();
  useEffect(() => {
    UserService()
      .avatars()
      .then((res) => {
        setUserinfo({ nickname: res.nickname, profileImage: res.image.url });
      });
  }, [setUserinfo]);

  return <Redirect href="/(tabs)/(home)" />;
};

export default Index;

// import React, { useState } from 'react';
// import { Text, ScrollView, RefreshControl, View } from 'react-native';

// const Card = () => {
//   const [now] = useState(new Date().toLocaleString());

//   return (
//     <View style={{ flex: 1 }}>
//       {Array.from({ length: 100 }).map((_, index) => (
//         <Text key={index} style={{ textAlign: 'center', justifyContent: 'center', fontSize: 16 }}>{`${now}`}</Text>
//       ))}
//     </View>
//   );
// };

// const List = () => {
//   const [key, setKey] = useState(new Date().getTime());
//   const [refreshing, setRefreshing] = useState(false);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setKey(new Date().getTime());
//       setRefreshing(false);
//     }, 1000);
//   };

//   return (
//     <ScrollView
//       key={key}
//       style={{ flex: 1, backgroundColor: 'white', padding: 20 }}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['blue', 'red', 'green']} />
//       }
//     >
//       <View style={{ flex: 1, flexDirection: 'row' }}>
//         <Card key={key} />
//         <Card />
//       </View>
//     </ScrollView>
//   );
// };

// export default List;
