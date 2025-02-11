import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { colors } from '@/theme';
import CardList from '@/components/molecules/CardList';
import { ViewsService } from '@/apis';

function RecentlyStudiesScreen() {
  const [studies, setStudies] = useState<StudyResponse.StudyInfo[]>([]);

  useEffect(() => {
    ViewsService()
      .getViews({ pageNumber: 0, pageSize: 10 })
      .then((res) => {
        setStudies(res.content);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <CardList data={studies} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default RecentlyStudiesScreen;
