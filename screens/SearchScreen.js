import React from 'react';
import { Text, View,FlatList,TextInput,TouchableOpacity, Touchable } from 'react-native';
import db from '../config';

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allTransactions:[],
      lastVisibleTransaction:null,
      search:""
    }
  }
  componentDidMount=async()=>{
    const query = await db.collection("transactions").get()
    query.docs.map((docs)=>{
      allTransactions:[...this.state.allTransactions,doc.data()]

    })
  }
  searchTransaction=async(text)=>{
    var entertext = text.split("")
    if(entertext[0].toUpperCase()==='B'){

    }
  }
  fetchMoreTransaction=async()=>{
    const query = await db.collection("transactions").startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((docs)=>{
      allTransactions:[...this.state.allTransactions,doc.data()]
      lastVisibleTransaction:doc

    })
  }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <TextInput
            placeholder="bookIdorstudentId"
            onChangeText={(text)=>{this.setState({search:text})}}
            />
            <TouchableOpacity onPress={()=>{this.searchTransaction(this.state.search)}}>
              <Text>search</Text>
            </TouchableOpacity>
          </View>
          <FlatList 
          data={this.state.allTransactions}
          renderItem={({item})=>{
            <view>
              <Text>{"book ID : "+item.bookId}</Text>
              <Text>{"studen ID :"+item.studentId}</Text>
              <Text>{"transactiontype:"+item.transactionType}</Text>
              <Text>{"date:"+item.date.toDate()}</Text>
            </view>
          }}
          keyExtractor={(item,index)=>{index.toString()}}
          onEndReached={this.fetchMoreTransaction}
          onEndReachedThreshold={0.7}

          />
        </View>
      );
    }
  }