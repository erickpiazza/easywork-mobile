import React, {useEffect, useState} from 'react';
import {Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {Container, Image, ContainerListProvider} from './styles';
import {useNavigation} from '@react-navigation/native';

interface IListProviders {
  id: string;
  name: string;
  avatar_url: string;
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
      <Text>Home</Text>
      <FlatList
        data={listProviders}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProviderProfile', {providerId: item.id})
              }>
              <ContainerListProvider
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.22,

                  elevation: 3,
                }}>
                <Image source={{uri: item.avatar_url}} />
                <Text>{item.name}</Text>
                <Text>{item.id}</Text>
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
