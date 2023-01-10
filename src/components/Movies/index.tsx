import { RouteProp, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Button, TextInput, View, Text, StyleSheet } from 'react-native'
import { useUpdateUserMutation } from '../../gql/mutations/UpdateUser.generated'
import { User } from '../../types'
import { Movie } from './types'

export const Movies = () => {
    const OMDB_API_KEY = 'fffe9ebd'

    const route: RouteProp<{ params: { user: User } }> = useRoute()
    const [title, setTitle] = useState<string | null>(null)
    const [movie, setMovie] = useState<Movie | null>(null)
    const [updateUser] = useUpdateUserMutation({ refetchQueries: ['AllUsers'] })

    const handleSubmit = () => {
        fetch(`http://www.omdbapi.com/?t=${title.replace(' ', '+')}&apikey=${OMDB_API_KEY}`)
            .then((response) => response.json())
            .then((data: Movie) => setMovie(data))
    }

    useEffect(() => {
        if (route?.params?.user?.id && movie?.imdbID) {
            updateUser({
                variables: { data: { id: route?.params?.user?.id, movie: movie?.imdbID } }
            })
        }
    }, [movie])

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Your name"
            />
            <Button title="submit" onPress={handleSubmit} />

            {movie ? <Text>{movie?.Title}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
})
