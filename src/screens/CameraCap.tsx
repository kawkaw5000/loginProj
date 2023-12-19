import {
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
  
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { FAB, Button } from '@rneui/themed';
import { AuthStackParamList } from '../route/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type CameraCapScreenNavigationProp = NativeStackScreenProps<AuthStackParamList, "CameraCap">

const MyPhoto = ({navigation}: CameraCapScreenNavigationProp) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef<Camera>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoStatus, setPhotoStatus] = useState<boolean>(true);
  const [tagInputVisible, setTagInputVisible] = useState<boolean>(false);
  const [tag, setTag] = useState<string>('');

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    if (newCameraPermission == null) {
      ToastAndroid.show('Camera is not ready', ToastAndroid.LONG);
    }
    if (newMicrophonePermission == null) {
      ToastAndroid.show('Mic is not ready', ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  if (device == null) {
    return <ActivityIndicator />;
  }

  const showTagInput = () => {
    setTagInputVisible(true);
  };

  const hideTagInput = () => {
    setTagInputVisible(false);
  };

  const takePhoto = async () => {
    if (cameraRef != null) {
      const photo = await cameraRef.current?.takePhoto({
        qualityPrioritization: 'quality',
      });
  
      if (photo?.path) {
        setPhotos((prevPhotos) => [...prevPhotos, photo.path.toString()]);
        setPhotoStatus(true);
      } else {
        ToastAndroid.show('Error taking photo', ToastAndroid.LONG);
      }
    }
  };
  const savePhotoWithTag = async () => {
    if (photos.length > 0) {
      if (tag.trim() === '') {
        ToastAndroid.show('Please enter a tag for the photo', ToastAndroid.SHORT);
        return;
      }

      try {
        await Promise.all(
          photos.map(async (photoPath) => {
            await CameraRoll.save(`file://${photoPath}`, {
              type: 'photo',
              album: tag,
            });
          })
        );
        ToastAndroid.show('Photos saved to Camera Roll with tag: ' + tag, ToastAndroid.SHORT);
        setTag('');
        hideTagInput();
        setPhotos([]);
      } catch (error) {
        ToastAndroid.show(
          'Error saving photos to Camera Roll',
          ToastAndroid.LONG
        );
        console.error(error);
      }
    } else {
      ToastAndroid.show('No photos to save', ToastAndroid.SHORT);
    }
  };
  
  // const savePhotoToCameraRoll = async () => {
  //   if (photos.length > 0) {
  //     try {
  //       await Promise.all(
  //         photos.map(async (photoPath) => {
  //           await CameraRoll.save(`file://${photoPath}`, {
  //             type: 'photo'
  //           });
  //         })
  //       );
  //       ToastAndroid.show('Photos saved to Camera Roll', ToastAndroid.SHORT);
        
  //       // Clear the list of photos after saving
  //       setPhotos([]);
  //     } catch (error) {
  //       ToastAndroid.show(
  //         'Error saving photos to Camera Roll',
  //         ToastAndroid.LONG
  //       );
  //       console.error(error);
  //     }
  //   } else {
  //     ToastAndroid.show('No photos to save', ToastAndroid.SHORT);
  //   }
  // };
  
  // const savePhotoToCameraRoll = async () => {
  //   if (photos.length > 0) {
  //     try {
  //       await Promise.all(
  //         photos.map(async (photoPath) => {
  //           await CameraRoll.save(`file://${photoPath}`, {
  //             type: 'photo',
  //           });
  //         })
  //       );
  //       ToastAndroid.show('Photos saved to Camera Roll', ToastAndroid.SHORT);
  //     } catch (error) {
  //       ToastAndroid.show(
  //         'Error saving photos to Camera Roll',
  //         ToastAndroid.LONG
  //       );
  //       console.error(error);
  //     }
  //   } else {
  //     ToastAndroid.show('No photos to save', ToastAndroid.SHORT);
  //   }
  // };

  const viewPhotoTaken = () => {
    if (photoStatus) {
      setPhotoStatus(false);
      ToastAndroid.show('Capture', ToastAndroid.SHORT);
    }
  };
  const renderItem = ({ item }: { item: string }) => (
    <Image style={styles.image} source={{ uri: 'file://' + item }} />
  );

  return (
    <View style={styles.container}>
      {photoStatus ? (
        <View style={styles.container}>
          <FlatList
            data={photos}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={3}
          />
          <FAB
            placement="right"
            color="#f02e65"
            size="large"
            title="save"
            icon={{ name: 'save', color: '#FFFFFF' }}
            onPress={showTagInput}
          />
          <TouchableOpacity
            style={styles.openButton}
            onPress={viewPhotoTaken}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>

          {/* Tag Input Modal */}
          <Modal visible={tagInputVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.tagInput}
                  placeholder="Enter Tag"
                  placeholderTextColor="gray"
                  value={tag}
                  onChangeText={(text) => setTag(text)}
                />
                <Button title="Save" onPress={savePhotoWithTag} />
                <Button title="Cancel" onPress={hideTagInput} />
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <TouchableOpacity style={styles.button} onPress={takePhoto} />
        </View>
      )}
    </View>
  );
};

export default MyPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    borderRadius: 30,
  },
  image: {
    width: '32%', 
    aspectRatio: 1, 
    margin: '1%', 
  },
  openButton:  {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'flex-start',
    borderRadius: 5,
    width: '50%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  text:{
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  tagInput: {
    height: 40,
    borderColor: 'gray',
    color: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});