import { ScreenWrapper } from '../../components/ScreenWrapper'
import { UserList } from '../../components/UserList'

export const UsersScreen = ({ navigation }) => {
    return (
        <ScreenWrapper navigation={navigation}>
            <UserList />
        </ScreenWrapper>
    )
}
