import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants';
import LocationIcon from 'react-native-vector-icons/FontAwesome6';
import PhoneCallIcon from 'react-native-vector-icons/Feather';
import WhatsAppIcon from 'react-native-vector-icons/FontAwesome';

const BookmarkScreen = () => {
  const navigation = useNavigation();
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = useCallback(async () => {
    try {
      const existingBookmarks = await AsyncStorage.getItem('bookmarks');
      if (existingBookmarks) {
        const parsedBookmarks = JSON.parse(existingBookmarks);
        setBookmarks(parsedBookmarks);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarks();
    }, [fetchBookmarks]),
  );

  const renderItem = ({item}) => {
    const hasValidData = item.title && item.primary_details?.Place;
    const imageUrl = hasValidData
      ? item.creatives[0]?.thumb_url
      : item.creatives[0]?.image_url;

    const isDefaultImage =
      !imageUrl || imageUrl === item.creatives[0]?.image_url;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('JobDetails', {job: item})}>
        <View style={styles.jobDetailsContainer}>
          <View>
            <Image
              source={{uri: imageUrl}}
              style={[styles.thumbnail, isDefaultImage && styles.defaultImage]}
            />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          {item.primary_details?.Place ? (
            <View style={styles.headingDescription}>
              <View style={styles.locatonView}>
                <LocationIcon
                  name="location-dot"
                  size={24}
                  color={colors.text}
                />
                <Text style={styles.description}>
                  {item.primary_details?.Place}
                </Text>
              </View>
              <View style={styles.vacancyView}>
                <Text style={styles.vacancyText}>
                  {item.job_tags?.map(tag => tag.value).join(', ')}
                </Text>
              </View>
            </View>
          ) : (
            ''
          )}

          {item.primary_details?.Salary ? (
            <Text style={styles.salaryText}>
              Salary:{' '}
              {item.primary_details?.Salary
                ? item.primary_details.Salary
                : 'Not Disclosed'}
            </Text>
          ) : (
            ''
          )}
          {item.custom_link ? (
            <View style={styles.phoenMainView}>
              <View style={styles.phoneDataView}>
                <PhoneCallIcon
                  name="phone-call"
                  size={20}
                  color={colors.accent}
                />
                <Text style={styles.phoneNumberText}>{item.custom_link}</Text>
              </View>
              <View style={styles.phoneDataView}>
                <WhatsAppIcon
                  name="whatsapp"
                  size={20}
                  color={colors.secondary}
                />
                <Text style={styles.phoneNumberText}>{item.whatsapp_no}</Text>
              </View>
            </View>
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookmarkHeading}>
        <Text style={styles.bookmarkheadingTitle}>Bookmarked Jobs</Text>
      </View>
      <FlatList
        data={bookmarks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 60}}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 7,
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.bigText,
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  flatListContainer: {
    flexGrow: 1,
  },
  salaryText: {
    color: colors.text,
    marginTop: 5,
  },
  phoneNumberText: {
    color: colors.text,
  },
  vacancyView: {
    backgroundColor: '#E7F3FE',
    padding: 3,
  },
  vacancyText: {
    color: '##0E56A8',
  },
  jobDetailsContainer: {},
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  headingDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locatonView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  phoenMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneDataView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 5,
  },
  defaultImage: {
    resizeMode: 'contain',
  },
  bookmarkHeading: {
    backgroundColor: colors.primary,
    padding: 10,
  },
  bookmarkheadingTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
});

export default BookmarkScreen;
