import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Linking} from 'react-native';

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
  ContainerTextPhone,
  IconPhone,
} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';

import NoAvatar from '../../assets/userNoAvatar.png';
import NoCover from '../../assets/userNoCover.png';
import IconTeste from '../../assets/whatsappIcon.png';

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

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=55${provider?.phone}&text=Olá ${provider?.name} visualizei seu perfil na plataforma Easy Work gostaria de saber mais sobre seus trabalhos`,
    );
  }

  return (
    <Container>
      <AvatarCoverWrapper>
        <View>
          {provider?.cover_url ? (
            <Cover
              source={{
                uri: provider?.cover_url,
              }}
            />
          ) : (
            <Cover source={NoCover} />
          )}
        </View>

        <AvatarWrapper>
          {provider?.avatar_url ? (
            <Avatar
              source={{
                uri: provider?.avatar_url,
              }}
            />
          ) : (
            <Avatar source={NoAvatar} />
          )}
        </AvatarWrapper>
      </AvatarCoverWrapper>
      <TextNameProvider>{provider?.name}</TextNameProvider>
      <ContainerTextPhone>
        {provider?.phone ? (
          <>
            <TextPhoneProvider>{provider?.phone}19981694099</TextPhoneProvider>
            <TouchableOpacity onPress={handleWhatsapp}>
              <IconPhone source={IconTeste} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextPhoneProvider>telefone não registrado </TextPhoneProvider>
            <Icon name="phone-off" />
          </>
        )}
      </ContainerTextPhone>

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
