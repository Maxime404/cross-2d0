import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import ModalSelector from 'react-native-modal-selector'
import Icon from 'react-native-vector-icons/FontAwesome'
import TranslatableText from '../components/TranslatableText'
import styles from '../../assets/styles/styles'
import Layout from '../layouts/Layout'

export default class Profil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            token: '',
            appLanguage: 'en',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            glutenLevel: '',
            glutenLevelSelection: [
                {
                    key: 1,
                    label: 'Allergique',
                    value: 'Allergique',
                    component: (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="user" size={20} style={styles.icon} />
                            <Text style={{ marginLeft: 10 }}>Allergique</Text>
                        </View>
                    ),
                },
                {
                    key: 2,
                    label: 'Intolérant',
                    value: 'Intolérant',
                    component: (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="user" size={20} style={styles.icon} />
                            <Text style={{ marginLeft: 10 }}>Intolérant</Text>
                        </View>
                    ),
                },
                {
                    key: 3,
                    label: 'Sensible',
                    value: 'Sensible',
                    component: (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="user" size={20} style={styles.icon} />
                            <Text style={{ marginLeft: 10 }}>Sensible</Text>
                        </View>
                    ),
                },
            ],
            error: '',
        }
        this.lang = null
    }

    async componentDidMount() {
        this.setDataStorage()
        this.getAppLanguage()
    }

    getAppLanguage = async () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('appLanguage')
                .then(appLanguage => {
                    this.lang = appLanguage
                    resolve('Done.')
                })
                .catch(e => {
                    reject(e)
                })
        })
    }

    setDataStorage = async () => {
        const data = JSON.parse(await AsyncStorage.getItem('data'))
        const appLanguage = await AsyncStorage.getItem('appLanguage')

        console.log(appLanguage)

        if (!data.user || !data.meta.token) {
            this.props.navigation.navigate('SignIn')
        } else {
            this.setState({
                user: data.user,
                token: data.meta.token,
                appLanguage: appLanguage.appLanguage,
            })
        }
    }

    updateUser = async () => {
        const { user, token, firstname, lastname, email, phone, glutenLevel } = this.state
        if (!firstname && !lastname && !email && !phone && !glutenLevel) {
            this.setState({ error: 'You need to modify a minimum of one field' })
        } else {
            const req = await fetch(`https://glutendb.herokuapp.com/api/users/${user.uuid}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstname: firstname ? firstname.trim() : user.firstname,
                    lastname: lastname ? lastname.trim() : user.lastname,
                    email: email ? email.trim() : user.email,
                    phone: phone ? phone.trim() : user.phone,
                    glutenLevel: glutenLevel ? glutenLevel.trim() : user.glutenLevel,
                }),
            })
            try {
                const json = await req.json()
                if (json.err) {
                    this.setState({ error: json.err.description })
                } else {
                    //console.log(json.data)
                    await this._storeData({
                        user: json.data.user,
                        meta: { token },
                    })
                    this.setState({
                        user: json.data.user,
                        error: '',
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: '',
                    })
                    Alert.alert('Profil mis-à-jour !')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    _storeData = async data => {
        try {
            console.log(data)
            await AsyncStorage.setItem('data', JSON.stringify(data))
        } catch (error) {
            console.log('Local storage data Error : ', error)
        }
    }

    render() {
        const { user, error, glutenLevelSelection } = this.state
        if (this.lang != undefined && this.lang != null) {
            return (
                <Layout title="Mon profil">
                    <View style={styles.profilView}>
                        <TextInput
                            style={styles.profilInput}
                            placeholder={user.firstname}
                            onChangeText={firstname => this.setState({ firstname })}
                        />
                        <TextInput
                            style={styles.profilInput}
                            placeholder={user.lastname}
                            onChangeText={lastname => this.setState({ lastname })}
                        />
                        <TextInput
                            style={styles.profilInput}
                            placeholder={user.email}
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style={styles.profilInput}
                            placeholder={user.phone}
                            onChangeText={phone => this.setState({ phone })}
                        />
                        <ModalSelector
                            data={glutenLevelSelection}
                            onChange={option => {
                                this.setState({ glutenLevel: option.value })
                            }}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.select}>
                                    <TranslatableText lang={this.lang} style={{ color: '#fff' }}>
                                        Sensibilité au gluten..
                                    </TranslatableText>
                                    <Icon name="sort-down" size={30} style={{ color: 'white', marginLeft: 5, marginBottom: 12 }} />
                                </View>
                            </View>
                        </ModalSelector>
                        <Text style={{ marginTop: 60, marginBottom: 10 }}>{error}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.updateUser()}>
                            <Text style={styles.textButton}>
                                <TranslatableText lang={this.lang} style={{ color: '#fff' }}>
                                    Mettre à jour mon profil
                                </TranslatableText>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Layout>
            )
        } else {
            return <View></View>
        }
    }
}
