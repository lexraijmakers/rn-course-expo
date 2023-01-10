import { useNavigation, useRoute } from '@react-navigation/native'
import { Text, View, StyleSheet, Button } from 'react-native'
import { UserFragment } from '../../gql/fragments/User.generated'

export interface UserProps {
    user: UserFragment
    handleDelete: (id: number) => void
    newUser: boolean
}

export const User: React.FC<UserProps> = ({ user, handleDelete, newUser = false }) => {
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: newUser ? 'green' : 'white', ...styles.card }}>
            <Text>name: {user?.name}</Text>
            <Text>age: {user?.age}</Text>
            <Text>movie: {user?.movie}</Text>

            <Button title="delete" onPress={() => handleDelete(user.id)} />

            <Button
                title="Edit movie"
                onPress={() => navigation.navigate('MoviesScreen', { user })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        height: 140,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})
