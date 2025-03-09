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

// import React, { useEffect, useState } from 'react';
// import { Text, ScrollView, RefreshControl, View, SafeAreaView } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// const Card = () => {
//   const [now, setNow] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setNow(new Date().toLocaleString());
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {isLoading ? (
//         <SkeletonPlaceholder borderRadius={4}>
//           <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
//         </SkeletonPlaceholder>
//       ) : (
//         Array.from({ length: 100 }).map((_, index) => (
//           <Text key={index} style={{ textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>{`${now}`}</Text>
//         ))
//       )}
//     </View>
//   );
// };

// const List = () => {
//   const [key, setKey] = useState(new Date().getTime());
//   const [refreshing, setRefreshing] = useState(false);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setKey(new Date().getTime());
//     setRefreshing(false);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['blue', 'red', 'green']} />
//         }
//       >
//         <View style={{ flex: 1, flexDirection: 'row' }}>
//           <Card key={key} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default List;
