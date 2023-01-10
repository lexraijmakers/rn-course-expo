import { RouteProp, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Button, TextInput, View, Text, StyleSheet, Modal } from 'react-native'
import { useUpdateUserMutation } from '../../gql/mutations/UpdateUser.generated'
import { User } from '../../types'
import { Movie, Movies as MoviesType } from './types'
import * as Speech from 'expo-speech'
import { Picker } from '@react-native-picker/picker'

export const Movies = () => {
    const OMDB_API_KEY = 'fffe9ebd'

    const [selectedMovie, setSelectedMovie] = useState<string | null>(null)
    const route: RouteProp<{ params: { user: User } }> = useRoute()
    const [title, setTitle] = useState<string | null>(null)
    const [movies, setMovies] = useState<MoviesType | null>(null)
    const [movie, setMovie] = useState<Movie | null>(null)
    const [updateUser] = useUpdateUserMutation({ refetchQueries: ['AllUsers'] })
    const [modalVisible, setModalVisible] = useState(false)

    const speak = (text: string) => {
        Speech.speak(text, { language: 'en-EN' })
    }

    const openModal = () => {
        fetch(`http://www.omdbapi.com/?s=${title.replace(' ', '+')}&apikey=${OMDB_API_KEY}`)
            .then((response) => response.json())
            .then((data: MoviesType) => {
                setMovies(data)
                setModalVisible(true)
            })
    }

    const handleSubmit = () => {
        const { user } = route?.params

        setModalVisible(false)
        fetch(`http://www.omdbapi.com/?i=${selectedMovie}&apikey=${OMDB_API_KEY}&plot=full`)
            .then((response) => response.json())
            .then((data: Movie) => {
                setMovie(data)
                setTitle(data.Title)

                updateUser({ variables: { data: { id: user?.id, movie: data?.imdbID } } })
                speak(`${user.name} is ${user.age} years old and likes the movie ${data.Title}`)
            })
    }

    useEffect(() => {
        const { movie } = route?.params?.user

        if (movie) {
            fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${OMDB_API_KEY}`)
                .then((response) => response.json())
                .then((data: Movie) => {
                    setMovie(data)
                    setTitle(data.Title)
                })
        }

        return () => {
            Speech.stop()
        }
    }, [])

    useEffect(() => {
        if (movies?.Search?.[0]?.imdbID) setSelectedMovie(movies?.Search?.[0]?.imdbID)
    }, [movies])

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Your name"
            />
            <Button title="submit" onPress={openModal} />
            <Button title="Press to hear the plot" onPress={() => speak(movie?.Plot)} />

            {movie ? <Text>{movie?.Title}</Text> : null}

            <Modal animationType="slide" visible={modalVisible} transparent={true}>
                <View
                    style={{
                        height: '40%',
                        marginTop: 'auto',
                        backgroundColor: 'white'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'space-around',
                            flex: 1,
                            flexDirection: 'row'
                        }}
                    >
                        <Button
                            title="cancel"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                        />

                        <Button title="confirm" onPress={handleSubmit} />
                    </View>

                    <Picker
                        selectedValue={selectedMovie}
                        onValueChange={(itemValue) => setSelectedMovie(itemValue)}
                    >
                        {movies?.Search?.map((movie) => (
                            <Picker.Item
                                key={movie.imdbID}
                                label={`${movie.Title} (${movie.Year})`}
                                value={movie.imdbID}
                            />
                        ))}
                    </Picker>
                </View>
            </Modal>
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
