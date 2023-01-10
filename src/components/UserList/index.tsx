import { useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useDeleteUserMutation } from '../../gql/mutations/DeleteUser.generated'
import { useAllUsersQuery } from '../../gql/queries/AllUsers.generated'
import { User as UserType } from '../../types'

import { RouteProp } from '@react-navigation/native'
import { User } from '../User'

export interface UserList {
    dimensions?: { width: number; height: number }
}

export const UserList: React.FC<UserList> = () => {
    const { data: { allUsers } = {}, refetch: refetchUsers } = useAllUsersQuery()
    const [deleteUser] = useDeleteUserMutation({ refetchQueries: ['AllUsers'] })
    const route: RouteProp<{ params: { newUser: UserType } }> = useRoute()

    useEffect(() => {
        refetchUsers()
    }, [])

    const handleDelete = (id: number) => {
        Alert.alert('Delete User', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => {
                    deleteUser({ variables: { deleteUserId: id } }).then(
                        (res) => res && refetchUsers()
                    )
                },
                style: 'destructive'
            }
        ])
    }

    return (
        <View style={styles.container}>
            {allUsers?.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    handleDelete={handleDelete}
                    newUser={route?.params?.newUser?.id === user?.id}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    }
})
