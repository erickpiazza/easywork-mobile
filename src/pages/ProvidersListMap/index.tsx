import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {Avatar, InformationProvider} from './styles';
import NoAvatar from '../../assets/userNoAvatar.png';
import Geolocation from '@react-native-community/geolocation';

interface IListProviders {
  id: string;
  name: string;
  avatar_url: string;
  cover_url: string;
  latitude: number;
  longitude: number;
}

interface ICoords {
  latitude: number;
  longitude: number;
}

const ProviderListMap: React.FC = () => {
  const navigation = useNavigation();

  const [listProviders, setListProviders] = useState<IListProviders[]>([]);
  const [coords, setCoords] = useState<ICoords>({latitude: 0, longitude: 0});

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => setCoords(info.coords));
  }, []);

  useEffect(() => {
    api.get('providers').then((response) => {
      setListProviders(response.data);
    });
  }, []);

  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }}
      showsUserLocation
      loadingEnabled={true}
      loadingBackgroundColor="#000000"
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
