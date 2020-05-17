

import React, { useEffect, useState } from 'react';
import { Modal, FlatList, TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, Button, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import { getCategories } from '../../services/category'
import { getSymptoms } from '../../services/symptoms'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as actions } from '../../modules/symptoms/actionCreators'
import { actionCreators as userActions } from '../../modules/local/actionCreators'
import App from '../../../App';

function Item({ _id, title, selected, onSelect }) {
    return (
        <TouchableOpacity
            onPress={() => { onSelect(_id) }}
            style={[
                styles.symptomContainer,
                { backgroundColor: selected ? '#d3d3d3' : null },
            ]}
        >
            <Text style={{ fontSize: 15, fontWeight: '600' }}>{title}</Text>
        </TouchableOpacity>
    );
}

function HomeScreen({ symptoms, setSymptoms, navigation, state, setUserSelectedSymtpoms, userSelectedSymptoms }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => seeResults()} style={{ marginRight: 10 }}>
                    <Text>See Results</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    //this will contain the list of fetched categories
    const [categories, setCategories] = useState([])
    //this determines whether or not the loading indicator is supposed to be shown
    const [isLoading, setIsLoading] = useState(true)
    //error message
    const [message, setMessage] = useState('The server returns nothing. Please Try Again')
    //this determines whether the modal (list of symptoms to choose from) expected to be shown
    const [modalVisible, setModalVisible] = useState(false);
    //this contains the selected category
    const [selectedCategory, setSelectedCategory] = useState({
        item: {
            name: ''
        }
    })

    //
    const seeResults = () => {
        // selectedSymptoms.length === 0 ? alert('Please specify your symptoms') :
        navigation.navigate('Results')
    }
    //this contains the symptoms to be displayed
    const [displayedSymptoms, setDisplayedSymptoms] = useState([]);
    //this contains all the selected symptoms of the user
    const [selectedSymptoms, setMySelectedSymptoms] = useState([])
    const [selected, setSelected] = React.useState(new Map());
    //fetching Categories from API
    const setCategoryList = async () => {
        try {
            const response = await getCategories();
            setCategories(response)
        }
        catch (error) {
            console.error(error.message)
        }
    }
    //fetching Symptoms from the API
    const fetchAllSymptoms = async () => {
        try {
            const response = await getSymptoms();
            setSymptoms(response)
        }
        catch (error) {
            console.error(error.message)
        }
    }
    //this sets all the initial data
    const initializeData = async () => {
        setIsLoading(true)
        try {
            await setCategoryList();
            await fetchAllSymptoms();
        }
        catch (error) {
            setMessage(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }
    const FlatListItemSeparator = () => {
        return (
            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 0.7 }}>
            </View>
        )
    }
    //when a category is selected
    const onCategorySelect = (category) => {
        try {
            setModalVisible(true)
            setSelectedCategory(category)
            var tempSymptoms = [];
            symptoms.map(symptom =>
                symptom.category === category.item.name ?
                    tempSymptoms.push(symptom)
                    : null
            )
            setDisplayedSymptoms(tempSymptoms)
        }
        catch (error) {
            console.error(error.message)
        }
    }

    //this function executes whenever the user chooses a symptom from the options
    const onSelect = React.useCallback(
        _id => {
            const newSelected = new Map(selected);
            newSelected.set(_id, !selected.get(_id));
            setSelected(newSelected);
        },
        [selected],
    );

    const allSelectedSymptoms = async () => {
        setModalVisible(false)
        // console.log('These are the keys', ...selected.keys())
        var tempSelectedSymptoms = [...selected.keys()]
        var tempSelectedSymptomsValue = [...selected.values()]
        var assignedSymptoms = []
        tempSelectedSymptoms.map((symp, key) => {
            if (tempSelectedSymptomsValue[key]) {
                assignedSymptoms.push(symp)
                console.log(symp, '', tempSelectedSymptomsValue[key])
            }
        })
        setMySelectedSymptoms(assignedSymptoms)
        console.log('these are the symptoms', selectedSymptoms)
        await setUserSelectedSymtpoms(assignedSymptoms)


    }

    //this function takes place every time the Home screen is being rendered
    useEffect(() => {
        initializeData()
        console.log('hello', state)
    }, [])



    return (
        <View style={styles.container}>
            <Modal
                animationType="slide" keyExtractor={item => item.id}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}>
                <View style={styles.modalContainer} >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>{selectedCategory.item.name}</Text>
                        {/* Close */}
                        <TouchableOpacity style={styles.closeButtonContainer}
                            onPress={() => { allSelectedSymptoms() }}>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontWeight: 'bold' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {displayedSymptoms.length === 0 ?
                        // fix this one
                        <View styles={{ padding: 100, flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                            <Text styles={{ textAlign: 'center', textAlignVertical: 'center' }}>No Symptoms</Text>
                        </View>
                        :
                        //List of Symptoms to Choose From
                        <FlatList
                            keyExtractor={item => item._id}
                            data={displayedSymptoms}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            renderItem={({ item }) =>
                                (<Item
                                    _id={item.name}
                                    title={item.name}
                                    selected={!!selected.get(item.name)}
                                    onSelect={onSelect}

                                />
                                )}
                            extraData={selected} />}
                </View>
            </Modal>


            {isLoading ? <ActivityIndicator /> :
                categories.length === 0 ? <Text style={{ textAlign: 'center' }}>{message}</Text> :
                    <FlatList
                        keyExtractor={item => item._id}
                        numColumns={2}
                        data={categories}
                        renderItem={category =>
                            <TouchableOpacity style={styles.categoryContainer} onPress={() => onCategorySelect(category)}>
                                <ImageBackground
                                    style={{ height: Dimensions.get('screen').height * 0.20, alignItems: 'center', justifyContent: 'center' }}  >
                                    <Text style={{ padding: 20, color: 'black', fontWeight: 'bold', fontSize: 20 }}>{category.item.name}</Text>
                                </ImageBackground>

                            </TouchableOpacity>
                        }
                    />}
        </View>

    );
}



const styles = StyleSheet.create({
    symptomContainer: {
        width: Dimensions.get('window').width,
        paddingLeft: 10,
        paddingTop: 10,
    },
    closeButtonContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: 'white',
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 50,
        borderWidth: 0,
        shadowColor: 'black',
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    },
    modalHeaderTitle: {
        flex: 2,
        textAlignVertical: 'bottom',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignItems: 'stretch'
    },
    modalContainer: {
        paddingTop: Platform.OS === 'ios' ? 35 : 10,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    categoryContainer: {
        width: Dimensions.get('window').width * 0.5,
        flex: 1,
        marginLeft: 5,
        marginRight: 3,
        marginBottom: 5,
        borderRadius: 4,
        opacity: 0.7,
        height: Dimensions.get('screen').height * 0.20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});

function mapStateToProps(state) {
    const { symptoms } = state.symptoms
    const { userSelectedSymptoms } = state.userSelectedSymptoms
    return { state, symptoms, userSelectedSymptoms }
    // return { symptoms }
}

function mapDispatchToProps(dispatch) {
    return {
        setSymptoms: bindActionCreators(actions.setSymptoms, dispatch),
        setUserSelectedSymtpoms: bindActionCreators(userActions.setSelectedSymptoms, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)