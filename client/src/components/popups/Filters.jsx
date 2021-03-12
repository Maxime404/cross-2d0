import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import Dialog, { ScaleAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'

import styles from '../../../assets/css/popups/filters'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      id: 0,
      filter: '',
    }
    this.navigation = this.props.navigation
    this.handler = this.props.handler
  }

  DATA = [
    {
      id: 1,
      title: "Date d'ajout",
      name: 'Date',
    },
    {
      id: 2,
      title: 'Note du troquer',
      name: 'Note',
    },
    {
      id: 3,
      title: 'Proximité',
      name: 'Proximite',
    },
    {
      id: 4,
      title: 'Rank du troquer',
      name: 'Rank',
    },
  ]

  handleChange = item => {
    const id = item.id

    let items = [...this.state.tab]

    let check = { ...items[id - 1] }

    check.value = !check.value

    items[id - 1] = check

    this.setState({ tab: items, filter: item.name })
  }

  reset = () => {
    this.setState({
      id: 0,
    })
  }

  renderRow() {
    return (
      <FlatList
        data={this.DATA}
        renderItem={({ item }) => (
          <View style={styles.filters}>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.id === item.id ? true : false}
              onPress={() => this.setState({ id: item.id, filter: item.name })}
            />
            <Text style={styles.filterText}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
      />
    )
  }

  search = filter => {
    // console.log(filter)
  }

  render() {
    return (
      <View style={styles.container}>
        <Dialog
          width={300}
          visible={this.props.visible}
          dialogTitle={
            <View style={styles.dialogHead}>
              <DialogTitle textStyle={styles.white} title="Filtres" style={styles.titleContainer} />
              <Icon name="close-box" color="#fff" type="material-community" size={30} onPress={() => this.handler()} />
            </View>
          }
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0,
              useNativeDriver: true,
            })
          }
          footer={
            <DialogContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <DialogButton text="RÉINITIALISER" onPress={() => this.reset()} />
              <DialogButton text="APPLIQUER" onPress={() => this.search(this.state.filter)} />
            </DialogContent>
          }
          onTouchOutside={() => this.handler()}
        >
          <DialogContent>{this.renderRow()}</DialogContent>
        </Dialog>
      </View>
    )
  }
}

Filters.propTypes = { visible: PropTypes.bool.isRequired, handler: PropTypes.func.isRequired }
