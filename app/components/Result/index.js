import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, Dimensions } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';



export default function Result(props) {

    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.titleStyle}>{props.title.toUpperCase()}</Text>

            <View style={{ backgroundColor: 'white', height: 5, width: Dimensions.get('screen').width * 0.92, marginRight: 15, }}>
                <View style={{ backgroundColor: '#3c8ebc', height: 5, width: Dimensions.get('screen').width * props.percentage }}>

                </View>
            </View>
            <Text style={{ paddingTop: 5, color: 'black' }}>{props.percentage * 100}%</Text>

            <Text style={styles.division}>Cause</Text>
            <Text style={styles.detailText}>{props.cause}</Text>
            <Text style={styles.division}>Recommendation</Text>
            <Text style={styles.detailText}>{props.recommendation}</Text>
            <Text style={styles.division}>Symptom</Text>
            <FlatList
                data={props.symptoms}
                keyExtractor={item => item._id}
                numColumns={2}
                renderItem={(symptom) =>
                    <View style={styles.symptomStyle}>
                        <Text style={styles.symptomText}>{symptom.item}</Text>
                    </View>
                }
            />


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    symptomText: {
        color: 'white'
    },
    detailText: {
        color: 'black'
    },
    symptomStyle: {
        backgroundColor: '#3c8ebc',
        padding: 5,
        marginRight: 5,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: '#fff',
        marginBottom: 5

    },
    division: {
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'

    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black'
    },
    container: {
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
        paddingLeft: 15,
        width: Dimensions.get('screen').width,
        marginTop: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 0.5,
        paddingTop: 5,
        paddingBottom: 5
    },
});
