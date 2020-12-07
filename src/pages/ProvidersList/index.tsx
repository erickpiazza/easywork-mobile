import React, {useEffect, useState} from 'react';
import {Button, FlatList, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Image,
  ContainerListProvider,
  ContainerInformationProvider,
  InformationProvider,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import NoCover from '../../assets/userNoCover.png';

interface IListProviders {
  id: string;
  name: string;
  avatar_url: string;
  cover_url: string;
}

const Home: React.FC = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation();
  const [listProviders, setListProviders] = useState<IListProviders[]>([]);

  useEffect(() => {
    api.get('providers').then((response) => {
      setListProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <FlatList
        data={listProviders}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProviderProfile', {providerId: item.id})
              }>
              <ContainerListProvider>
                <View style={{width: '30%'}}>
                  {item.cover_url ? (
                    <Image source={{uri: item.cover_url}} />
                  ) : (
                    <Image source={NoCover} />
                  )}
                </View>

                <ContainerInformationProvider>
                  <InformationProvider>{item.name}</InformationProvider>
                </ContainerInformationProvider>
              </ContainerListProvider>
            </TouchableOpacity>
          </>
        )}
        numColumns={1}
      />
      <Button title="sair" onPress={signOut} />
    </Container>
  );
};

export default Home;
