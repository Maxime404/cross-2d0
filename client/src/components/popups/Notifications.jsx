import React from 'react'
import { View, FlatList, YellowBox } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { List } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import Dialog, { ScaleAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import PropTypes from 'prop-types'
import _ from 'lodash'

import styles from '../../../assets/css/popups/notifications'

YellowBox.ignoreWarnings(['componentWillMount'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('componentWillMount') <= -1) {
    _console.warn(message)
  }
}

export default class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.navigation = this.props.navigation
    this.handler = this.props.handler
  }

  componentWillMount = async () => {
    await this.setDataStorage()
    this.fetchMsg()
  }

  async setDataStorage() {
    let user = await AsyncStorage.getItem('data')
    if (!user) {
      this.props.navigation.navigate('SignIn')
    } else {
      let data = JSON.parse(user)
      this.setState({ user: data, token: data.meta.token })
      data.customer
        ? this.setState({
            typeUser: 'customer',
            id: data.customer.id,
            latitude: data.customer.latitude,
            longitude: data.customer.longitude,
          })
        : this.setState({
            typeUser: 'association',
            id: data.association.id,
            latitude: data.association.latitude,
            longitude: data.association.longitude,
          })
    }
  }

  fetchMsg = async () => {
    const { token } = this.state
    return fetch(`https://trocify.herokuapp.com/api/users/3f38ec56-7757-42d7-8f13-cca1df2f780c/messages`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json.data.message,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderRow() {
    const { data } = this.state
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ overflow: 'scroll' }}
        renderItem={({ item }) => (
          <List.Item
            // onPress={() => console.log('item pressed!')}
            title={item.sender.firstname + ' ' + item.sender.lastname}
            descriptionNumberOfLines={1}
            description={item.content}
            left={() => (
              <List.Icon
                icon={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
                style={styles.roundedFull}
              />
            )}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Dialog
          width={300}
          height={300}
          containerStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          visible={this.props.visible}
          dialogTitle={
            <View style={styles.dialogHead}>
              <DialogTitle textStyle={styles.white} title="Notifications" style={styles.titleContainer} />
              <Icon name="close-box" color="#fff" type="material-community" size={30} onPress={() => this.handler()} />
            </View>
          }
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0,
              useNativeDriver: true,
            })
          }
          onTouchOutside={() => this.handler()}
        >
          <DialogContent>{this.renderRow()}</DialogContent>
        </Dialog>
      </View>
    )
  }
}

Notifications.propTypes = { visible: PropTypes.bool.isRequired, handler: PropTypes.func.isRequired }
