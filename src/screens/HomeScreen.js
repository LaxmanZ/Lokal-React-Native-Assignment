import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import colors from '../constants';
import JobList from '../components/JobList';

const HomeScreen = () => {
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobDetails', {job: item})}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.primary_details?.Place}</Text>
      <Text style={styles.salaryText}>{item.primary_details?.Salary}</Text>
      <Text style={styles.salaryText}>{item.custom_link}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeaderContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            source={require('../assets/zoro_profile.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileNameText}>Laxman</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconStyle}>
          <SettingsIcon name="settings" color="black" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Available Jobs</Text>

        <JobList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  topHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 13,
    backgroundColor: colors.primary,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  profileNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.bigText,
  },
  iconStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.bigText,
    marginBottom: 10,
  },
});

export default HomeScreen;
