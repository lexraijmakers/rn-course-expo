import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import { UserFragment } from '../../gql/fragments/User.generated'
import { Movie } from '../Movies/types'

export interface UserProps {
    user: UserFragment
    handleDelete: (id: number) => void
    newUser: boolean
}

export const User: React.FC<UserProps> = ({ user, handleDelete, newUser = false }) => {
    const navigation = useNavigation()
    const OMDB_API_KEY = 'fffe9ebd'
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        if (user.movie) {
            fetch(`http://www.omdbapi.com/?i=${user.movie}&apikey=${OMDB_API_KEY}`)
                .then((response) => response.json())
                .then((data: Movie) => {
                    setMovie(data)
                })
        }
    }, [user])

    return (
        <View style={{ backgroundColor: newUser ? 'green' : 'white', ...styles.card }}>
            <Text>name: {user?.name}</Text>
            <Text>age: {user?.age}</Text>

            {movie ? (
                <>
                    <Text>movie: {movie?.Title}</Text>
                    <Image style={{ flex: 1, height: 200 }} source={{ uri: movie?.Poster }} />
                </>
            ) : null}

            <View
                style={{
                    justifyContent: 'space-around',
                    flex: 1,
                    flexDirection: 'row'
                }}
            >
                <Button title="delete" onPress={() => handleDelete(user.id)} />

                <Button
                    title="Edit movie"
                    onPress={() => navigation.navigate('MoviesScreen', { user })}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})
