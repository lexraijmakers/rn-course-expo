import { Movies } from '../../components/Movies'
import { ScreenWrapper } from '../../components/ScreenWrapper'

export const MoviesScreen = ({ navigation }) => {
    return (
        <ScreenWrapper navigation={navigation}>
            <Movies />
        </ScreenWrapper>
    )
}
