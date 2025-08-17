import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HamburgerIcon from './Hamburger';

const CircleLogo = () => (
  <View style={styles.circleLogo}>
    <Image
    source={require('./assets/logo.png')} // path to your logo image file
    style={styles.logoImage}
    resizeMode="contain"
  />
  </View>
);

const genres = [
  'Fiction',
  'Non-fiction',
  'Mystery',
  'Fantasy',
  'Science Fiction',
  'Biography',
  'Romance',
  'Thriller',
];

const Navbar = ({ title, onHamburgerPress }) => (
    <View style={styles.navbar}>
      {/* Logo on left */}
      <CircleLogo />
      {/* Title in center */}
      <Text style={styles.navTitle}>{title}</Text>
      {/* Hamburger on right */}
      <HamburgerIcon onPress={onHamburgerPress} />
    </View>
  );

  // Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Navbar
        title="Book Company"
        onHamburgerPress={() => Alert.alert('Press "Add a New Book"!')}
      />
      <View style={styles.homeContent}>
        <Text style={styles.welcomeText}>Welcome to Book Company!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BookEntry')}
        >
          <Text style={styles.buttonText}>Add a New Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Book Entry Screen
function BookEntryScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState(genres[0]);
  const [pages, setPages] = useState('');
  const [books, setBooks] = useState([]);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter the book title.');
      return;
    }
    if (!author.trim()) {
      Alert.alert('Validation', 'Please enter the author name.');
      return;
    }
    if (!pages.trim() || isNaN(pages) || Number(pages) <= 0) {
      Alert.alert('Validation', 'Please enter a valid number of pages.');
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      genre,
      pages: pages.trim(),
    };

    setBooks([newBook, ...books]); // Add new book at the start

    // Clear inputs
    setTitle('');
    setAuthor('');
    setGenre(genres[0]);
    setPages('');
  };

  return (
    <View style={styles.container}>
      <Navbar
        title="Add Book"
        onHamburgerPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter book title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Author</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter author name"
          value={author}
          onChangeText={setAuthor}
        />

        <Text style={styles.label}>Genre</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={genre}
            onValueChange={(itemValue) => setGenre(itemValue)}
            style={styles.picker}
          >
            {genres.map((g) => (
              <Picker.Item key={g} label={g} value={g} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Number of Pages</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of pages"
          value={pages}
          onChangeText={setPages}
          keyboardType="numeric"
        />

        {/* {title.trim() !== '' && (
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryTitle}>Book Details Entered:</Text>
            <Text><Text style={styles.summaryLabel}>Title:</Text> {title}</Text>
            <Text><Text style={styles.summaryLabel}>Author:</Text> {author || '-'}</Text>
            <Text><Text style={styles.summaryLabel}>Genre:</Text> {genre}</Text>
            <Text><Text style={styles.summaryLabel}>Pages:</Text> {pages || '-'}</Text>
          </View>
        )} */}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Book</Text>
        </TouchableOpacity>

        {books.length > 0 && (
          <View style={styles.booksList}>
            <Text style={styles.listTitle}>Books Entered:</Text>
            {books.map((book) => (
              <View key={book.id} style={styles.bookItem}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text>Author: {book.author}</Text>
                <Text>Genre: {book.genre}</Text>
                <Text>Pages: {book.pages}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }} // Hide default header to use custom navbar
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookEntry" component={BookEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
  },
  navbar: {
    height: 60,
    backgroundColor: '#000000ff', // charcoal color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  circleLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d3d3d3', // light grey circle
  },
  navTitle: {
    color: '#000000ff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  hamburger: {
    padding: 5,
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  summaryBlock: {
    marginTop: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    backgroundColor: '#e6f0ff',
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#007AFF',
  },
  summaryLabel: {
    fontWeight: '600',
  },
  submitButton: {
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  borderRadius: 8,
  marginTop: 25,
  alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  booksList: {
    marginTop: 30,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bookItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#311c80ff',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#e6f0ff',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default App;