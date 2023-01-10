import React, { useState } from 'react'
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDeleteUserMutation } from '../../gql/mutations/DeleteUser.generated'
import { useAllUsersQuery } from '../../gql/queries/AllUsers.generated'
import { User } from '../User'

export interface UserList {
    dimensions?: { width: number; height: number }
}

export const UserList: React.FC<UserList> = () => {
    const { data: { allUsers } = {}, refetch: refetchUsers } = useAllUsersQuery()
    const [deleteUser] = useDeleteUserMutation()

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
                    deleteUser({ variables: { id } }).then((res) => res && refetchUsers())
                },
                style: 'destructive'
            }
        ])
    }

    return (
        <View style={styles.container}>
            {allUsers?.map(({ name, age, id }) => (
                <User name={name} age={age} id={id} key={id} handleDelete={handleDelete} />
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
