import { CreateUser } from '../../components/CreateUser'
import { ScreenWrapper } from '../../components/ScreenWrapper'

export const CreateUserScreen = ({ navigation }) => {
    return (
        <ScreenWrapper navigation={navigation}>
            <CreateUser />
        </ScreenWrapper>
    )
}
