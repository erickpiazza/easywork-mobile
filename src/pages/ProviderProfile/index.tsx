import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import {
  Container,
  AvatarCoverWrapper,
  Cover,
  AvatarWrapper,
  Avatar,
  TextNameProvider,
  TextPhoneProvider,
  ContainerInformations,
  BoxInformations,
  TitleBox,
  TextContent,
  ContainerEditImage,
  Image,
} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';

interface IListImage {
  id: string;
  image_url: string;
}

interface IProvider {
  about: string;
  avatar: string;
  avatar_url: string;
  city: string;
  cover: string;
  cover_url: string;
  email: string;
  name: string;
  phone: string;
  state: string;
  street: string;
  zipcode: string;
}

type StackParamsList = {
  A: undefined;
  B: {
    providerId?: string;
  };
};
const ProviderProfile: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, 'B'>>();
  const [provider, setProvider] = useState<IProvider>();
  const [imagensProvider, setImagensProvider] = useState<IListImage[]>([]);

  useEffect(() => {
    api
      .get(`providers/provider-id/${route.params.providerId}`)
      .then((response) => {
        setProvider(response.data);
      });
  }, [route.params.providerId]);

  useEffect(() => {
    api.get(`providers/imagens/${route.params.providerId}`).then((response) => {
      setImagensProvider(response.data);
    });
  }, [route.params.providerId]);

  return (
    <Container>
      <AvatarCoverWrapper>
        <View>
          <Cover
            source={{
              uri: provider?.cover_url,
            }}
          />
        </View>

        <AvatarWrapper>
          <Avatar
            source={{
              uri: provider?.avatar_url,
            }}
          />
        </AvatarWrapper>
      </AvatarCoverWrapper>
      <TextNameProvider>{provider?.name}</TextNameProvider>
      <TextPhoneProvider>{provider?.phone}</TextPhoneProvider>

      <ContainerInformations>
        <TitleBox>Endereço</TitleBox>
        <BoxInformations>
          <TextContent>
            {provider?.street &&
            provider?.city &&
            provider?.state &&
            provider?.zipcode
              ? `${provider.street} ${provider.city} ${provider.state} ${provider.zipcode}`
              : 'Este usuario ainda não atualizou seu endereço'}
          </TextContent>
        </BoxInformations>
      </ContainerInformations>

      <ContainerInformations>
        <TitleBox>Sobre Nos</TitleBox>
        <BoxInformations>
          {provider?.about ? (
            <TextContent style={{textAlign: 'justify'}}>
              {provider.about}
            </TextContent>
          ) : (
            <TextContent style={{textAlign: 'justify'}}>
              Este usuario não informou nenhuma informção sobre seu ramo de
              negocio
            </TextContent>
          )}
          <TextContent style={{textAlign: 'justify'}}>
            monta armario
          </TextContent>
        </BoxInformations>
      </ContainerInformations>
      <ContainerEditImage>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <TitleBox>Meus trabalhos</TitleBox>
          <Icon style={{marginLeft: 8}} size={16} name="image" />
        </View>
      </ContainerEditImage>

      <FlatList
        data={imagensProvider}
        renderItem={({item}) => (
          <Image key={item.id} source={{uri: item.image_url}} />
        )}
        numColumns={3}
      />
    </Container>
  );
};

export default ProviderProfile;
