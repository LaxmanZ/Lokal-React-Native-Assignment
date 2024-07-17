import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import colors from '../constants';
import LocationIcon from 'react-native-vector-icons/FontAwesome6';
import PhoneCallIcon from 'react-native-vector-icons/Feather';
import WhatsAppIcon from 'react-native-vector-icons/FontAwesome';

const JobList = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'https://testapi.getlokalapp.com/common/jobs?page=1',
        );
        console.log('API Response:', response.data);

        if (typeof response.data === 'object') {
          setJobData(response.data.results);
        } else {
          console.error('Unexpected response format:', response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setErrors(error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="orange" size="large" />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={jobData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

export default JobList;

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
    paddingBottom: 30,
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
});
