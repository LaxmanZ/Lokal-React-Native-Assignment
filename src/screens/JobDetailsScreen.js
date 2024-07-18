import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import colors from '../constants';
import BookmarkIcon from 'react-native-vector-icons/FontAwesome';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import PhoneCallIcon from 'react-native-vector-icons/Feather';
import WhatsAppIcon from 'react-native-vector-icons/FontAwesome';

const JobDetailsScreen = () => {
  const route = useRoute();
  const {job} = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const existingBookmarks = await AsyncStorage.getItem('bookmarks');
        if (existingBookmarks) {
          const bookmarks = JSON.parse(existingBookmarks);
          const isBookmarked = bookmarks.some(
            bookmark => bookmark.id === job.id,
          );
          setIsBookmarked(isBookmarked);
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };

    checkBookmarkStatus();
  }, [job.id]);

  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const handleBookmark = async () => {
    try {
      let bookmarks = [];
      const existingBookmarks = await AsyncStorage.getItem('bookmarks');
      if (existingBookmarks) {
        bookmarks = JSON.parse(existingBookmarks);
      }

      const alreadyBookmarked = bookmarks.some(
        bookmark => bookmark.id === job.id,
      );

      if (!alreadyBookmarked) {
        bookmarks.push(job);
        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        setIsBookmarked(true);
        showToast('Job bookmarked successfully!');
      } else {
        const updatedBookmarks = bookmarks.filter(
          bookmark => bookmark.id !== job.id,
        );
        await AsyncStorage.setItem(
          'bookmarks',
          JSON.stringify(updatedBookmarks),
        );
        setIsBookmarked(false);
        showToast('Job removed from bookmarks!');
      }
    } catch (error) {
      console.error('Error bookmarking job:', error);
      showToast('Failed to bookmark job');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {job.creatives && job.creatives.length > 0 && (
        <Image source={{uri: job.creatives[0].file}} style={styles.image} />
      )}
      <View style={styles.mainContainer}>
        <View style={styles.fistContainer}>
          <View style={styles.mainHeader}>
            <View>
              <Text style={styles.title}>{job.job_role}</Text>
              <Text style={styles.noramlText}>{job.company_name}</Text>
              <View style={styles.vacancyView}>
                <Text style={styles.vacancyText}>
                  {job.job_tags?.map(tag => tag.value).join(', ')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.grayLine} />
          <View style={styles.bookmarkContainer}>
            <View style={styles.mainHeaderContainer}>
              <View style={{alignItems: 'center'}}>
                <LikeIcon name="eye" size={24} color={colors.bigText} />
                <Text style={{color: 'black'}}>{job.views}</Text>
              </View>
              <TouchableOpacity onPress={handleLike}>
                <LikeIcon
                  name={isLiked ? 'like1' : 'like2'}
                  size={24}
                  color={isLiked ? colors.primary : 'black'}
                />
                <Text style={styles.likeText}>
                  {isLiked ? 'Liked' : 'Like'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.bookmarkTouchable}
              onPress={handleBookmark}>
              <BookmarkIcon
                name={isBookmarked ? 'bookmark' : 'bookmark-o'}
                size={24}
                color={isBookmarked ? colors.primary : 'black'}
              />
              <Text style={styles.likeText}>
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.noramlText}>
              <Text style={styles.headerText}>Posted On: </Text>
              {moment(job.created_on).format('MMM DD, YYYY')}
            </Text>
            <View style={styles.fbShareView}>
              <Text style={styles.headerText}>Applicants:</Text>
              <Text style={styles.noramlText}>{job.num_applications}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.jobDetailsView}>
            <Text style={styles.sectionTitle}>Job Details</Text>
            <LikeIcon name="infocirlceo" color={colors.bigText} size={24} />
          </View>
          <View style={styles.grayLine} />

          <Text style={styles.sectionSubTitle}>Description:</Text>
          <Text style={styles.detailsText}>{job.title}</Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Location: </Text>
            {job.primary_details?.Place}
          </Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Job Type: </Text>
            {job.job_hours}
          </Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Job Category: </Text>
            {job.job_category}
          </Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Salary: </Text>
            {job.primary_details?.Salary}
          </Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Experience: </Text>
            {job.primary_details?.Experience}
          </Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Qualification: </Text>
            {job.primary_details?.Qualification}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Company</Text>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Name:</Text> {job.company_name}
          </Text>
          <Text style={styles.highlightedText}>Contact HR:</Text>
          <View style={styles.phoenMainView}>
            <View style={styles.phoneDataView}>
              <PhoneCallIcon
                name="phone-call"
                size={20}
                color={colors.accent}
              />
              <Text style={styles.phoneNumberText}>{job.custom_link}</Text>
            </View>
            <View style={styles.phoneDataView}>
              <WhatsAppIcon
                name="whatsapp"
                size={20}
                color={colors.secondary}
              />
              <Text style={styles.phoneNumberText}>{job.whatsapp_no}</Text>
            </View>
          </View>
          <Text style={styles.noramlText}>
            <Text style={styles.highlightedText}>Available Timings: </Text>
            {job.contact_preference?.preferred_call_start_time} AM to{' '}
            {job.contact_preference?.preferred_call_end_time} PM
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Details</Text>
          {job.contentV3?.V3.map((item, index) => (
            <View key={index}>
              <Text style={styles.noramlText}>
                {item.field_name}: {item.field_value}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={styles.bookmarkButtonText}>Apply Job</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDE3',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  mainContainer: {
    padding: 20,
  },
  fistContainer: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 10,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  mainHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bookmarkTouchable: {
    alignItems: 'center',
    gap: 3,
  },
  likeText: {
    color: colors.bigText,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.bigText,
    // width: 200,
  },
  noramlText: {
    color: colors.text,
  },
  highlightedText: {
    color: 'black',
    fontWeight: '400',
    marginTop: 5,
  },
  section: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 10,
  },
  jobDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.bigText,
    marginBottom: 5,
  },
  bookmarkButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  bookmarkButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grayLine: {
    height: 1,
    backgroundColor: colors.text,
    marginVertical: 10,
  },
  sectionSubTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.bigText,
    marginTop: 3,
    marginBottom: 3,
  },
  detailsText: {
    lineHeight: 20,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  fbShareView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
  },
  vacancyView: {
    backgroundColor: '#E7F3FE',
    padding: 3,
    alignSelf: 'flex-start',
  },
  vacancyText: {
    color: '##0E56A8',
  },
  phoenMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  phoneDataView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 5,
  },
});

export default JobDetailsScreen;
