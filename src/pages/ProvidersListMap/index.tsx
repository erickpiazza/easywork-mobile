import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {Avatar, InformationProvider} from './styles';
import NoAvatar from '../../assets/userNoAvatar.png';

interface IListProviders {
  id: string;
  name: string;
  avatar_url: string;
  cover_url: string;
  latitude: number;
  longitude: number;
}

const ProviderListMap: React.FC = () => {
  const navigation = useNavigation();

  const [listProviders, setListProviders] = useState<IListProviders[]>([]);

  useEffect(() => {
    api.get('providers').then((response) => {
      setListProviders(response.data);
    });
  }, []);

  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: -22.930213,
        longitude: -47.124883,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }}
      showsUserLocation
      loadingEnabled
      zoomEnabled>
      {listProviders?.map((provider) => {
        return (
          provider.latitude &&
          provider.longitude && (
            <Marker
              key={provider.id}
              onPress={() =>
                navigation.navigate('ProviderProfile', {
                  providerId: provider.id,
                })
              }
              coordinate={{
                latitude: Number(provider.latitude),
                longitude: Number(provider.longitude),
              }}>
              <View>
                {provider?.avatar_url ? (
                  <>
                    <Avatar
                      source={{
                        uri: provider?.avatar_url,
                      }}
                    />
                    <InformationProvider>{provider.name}</InformationProvider>
                  </>
                ) : (
                  <>
                    <Avatar source={NoAvatar} />
                    <InformationProvider>{provider.name}</InformationProvider>
                  </>
                )}
              </View>
            </Marker>
          )
        );
      })}
    </MapView>
  );
};

export default ProviderListMap;
