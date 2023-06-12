import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
  Appearance,
} from 'react-native';

const App = () => {
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  const [todoItems, setTodoItems] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
      setTodoItems((prevTodoItems) => [...prevTodoItems, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoItems(updatedItems);
  };

  const deleteTodo = (id) => {
    const updatedItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(updatedItems);
  };

  const renderTodoItem = ({ item }) => (
    <View style={[styles.todoItem, isDarkMode && styles.todoItemDark]}>
      <Switch
        value={item.completed}
        onValueChange={() => toggleTodo(item.id)}
        trackColor={{ false: 'black', true: 'mediumslateblue' }}
        thumbColor={item.completed ? 'white' : 'dimgray'}
        ios_backgroundColor="#3e3e3e"
      />
      <Text
        style={[
          styles.todoText,
          item.completed && styles.completedTodoText,
          isDarkMode && styles.todoTextDark,
        ]}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteButton}>삭제하기</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>TODO LIST</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          placeholder="할일 추가 하기!"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todoItems}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  containerDark: {
    backgroundColor: '#303030',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'mediumslateblue',
    paddingTop : 40,
  },
  titleDark: {
    color: 'mediumslateblue',
    fontSize : 50
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
  flex: 1,
  borderWidth: 1,
  borderColor: 'lightsteelblue',
  borderRadius: 4,
  paddingHorizontal: 8,
  marginRight: 8,
  backgroundColor: 'silver',
  },
  inputDark: {
  backgroundColor: 'mediumslateblue',
  color: 'mediumslateblue',
  },
  addButton: {
  backgroundColor: 'mediumslateblue',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 4,
  justifyContent: 'center',
  },
  addButtonText: {
  color: 'white',
  fontWeight: 'bold',
  },
  todoItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'silver',
  padding: 16,
  marginBottom: 8,
  borderRadius: 4,
  },
  todoItemDark: {
  backgroundColor: '#444',
  },
  todoText: {
  flex: 1,
  marginLeft: 8,
  fontSize: 16,
  color: 'black',
  },
  todoTextDark: {
  color: 'white',
  },
  completedTodoText: {
  textDecorationLine: 'line-through',
  },
  deleteButton: {
  color: 'red',
  marginLeft: 8,
  },
  });
  
  export default App;
