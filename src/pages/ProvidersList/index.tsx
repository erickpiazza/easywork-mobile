import React, {useEffect, useState} from 'react';
import {Button, FlatList, TouchableOpacity, View, Text} from 'react-native';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  AvatarCoverWrapper,
  AvatarWrapper,
  Avatar,
  Cover,
  InformationProvider,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import NoAvatar from '../../assets/userNoAvatar.png';
import NoCover from '../../assets/userNoCover.png';

interface IListProviders {
  id: string;
  name: string;
  phone: string;
  about: string;
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
              <View style={{marginVertical: 24}}>
                <AvatarCoverWrapper>
                  <View>
                    {item?.cover_url ? (
                      <>
                        <Cover
                          source={{
                            uri: item?.cover_url,
                          }}
                        />
                        <InformationProvider>{item.name}</InformationProvider>
                      </>
                    ) : (
                      <>
                        <Cover source={NoCover} />
                        <InformationProvider>{item.name}</InformationProvider>
                      </>
                    )}
                  </View>

                  <AvatarWrapper>
                    {item?.avatar_url ? (
                      <Avatar
                        source={{
                          uri: item?.avatar_url,
                        }}
                      />
                    ) : (
                      <Avatar source={NoAvatar} />
                    )}
                  </AvatarWrapper>
                </AvatarCoverWrapper>
              </View>
            </TouchableOpacity>
          </>
        )}
        numColumns={1}
      />
    </Container>
  );
};

export default Home;
