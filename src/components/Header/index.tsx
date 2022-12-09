import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./styles";

type Props = {
  showBackButton?: boolean
}

export default function Header({ showBackButton = false }: Props) {

  const navigation = useNavigation()

  function handleGoBack(){
    navigation.goBack()
  }

  return (
    <Container>
      {showBackButton &&
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={require('../../assets/logo.png')} />
    </Container>
  )
}