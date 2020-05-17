//this shows the results 
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { getIllnesses } from '../../services/illness'
import Result from '../../components/Result'

function Results({ userSelectedSymptoms }) {


    function getCommon(arr1, arr2) {
        var common = [];
        for (var i = 0; i < arr1.length; ++i) {
            for (var j = 0; j < arr2.length; ++j) {
                if (arr1[i] == arr2[j]) {
                    common.push(arr1[i]);
                }
            }
        }
        return common


    }
    const [isLoading, setIsLoading] = useState(false)

    const [results, setResults] = useState([])


    const initializeData = async () => {
        setIsLoading(true)
        try {
            const response = await getIllnesses(userSelectedSymptoms)
            var responseItems = []
            var responseItemsWithPercentage = []
            var sortedResponseItems = []
            response.map(illness => {
                var itemObject = {
                    ...illness,
                    common: getCommon(illness.symptoms, userSelectedSymptoms)
                }
                responseItems.push(itemObject)
            });

            responseItems.map(illness => {
                var itemObject = {
                    ...illness,
                    percentage: illness.common.length / illness.symptoms.length
                }
                responseItemsWithPercentage.push(itemObject)
            })

            console.log('with Percentage', responseItemsWithPercentage)
            setResults(responseItemsWithPercentage)
        }
        catch (error) {
            console.error("Error while fetching results ", error.message)
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        initializeData()

    }, [])
    return (
        <View style={styles.container}>
            {isLoading ?
                <ActivityIndicator /> :
                userSelectedSymptoms.length === 0 || results.length === 0 ?
                    <View>
                        <Text style={{ color: 'black' }}>You did not specify any symptom yet</Text>
                    </View>
                    :
                    <FlatList
                        keyExtractor={item => item._id}
                        data={results}
                        renderItem={({ item }) =>
                            <Result
                                percentage={item.percentage}
                                title={item.name}
                                cause={item.cause}
                                symptoms={item.symptoms}
                                recommendation={item.recommendation}

                            />
                        }
                    />}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
function mapStateToProps(state) {
    const { userSelectedSymptoms } = state.userSelectedSymptoms;
    return { userSelectedSymptoms }
}

export default connect(mapStateToProps)(Results)
