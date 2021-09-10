import React, { useEffect, useState, useRef } from 'react';
import {
  Text, View, Button, Slider,
  Dimensions, TouchableOpacity
} from 'react-native';
import { Audio } from 'expo-av';
import { styles } from './styles';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
export default function App() {
  const [recording, setRecording] = useState('');
  const [path, setPath] = useState('');
  const [sounds, setSound] = useState('');
  const [time, settime] = useState(0);
  const [see, setsee] = useState(false);
  const [runtime, setruntime] = useState(0);
  const [start, setstart] = useState(false);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setsee(true);
    } catch (e) {
      console.log('Failed to start recording');
    }
  }


  useEffect(
    () => {
      let counts = 0;
      if (start) {
        const intervalnew = setInterval(() => {
          setruntime(counts = counts + 0.1);
        }, 100);
        return () => clearInterval(intervalnew);
      }
    }, [start]);



  useEffect(() => {
    if (runtime > time) {
      console.log('here53', runtime, time);
      setstart(false);
      settime(0);
      setruntime(0);
      setPath('')
    }
  }, [runtime])

  async function stopRecording() {
    console.log('stoprun');
    try {
      setRecording(null);
      const res = await recording.stopAndUnloadAsync();
      settime(parseInt(res.durationMillis.toString().split('')[0]));
      const uri = recording.getURI();
      setPath(uri);
      setsee(false);
    } catch (error) {
      console.log('err64');
    }
  }

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: path });
      setSound(sound);
      const re = await sound.playAsync();
      setstart(true);
    } catch (error) {
      console.log('err71')
    }
  }


  return (
    <View style={{
      ...styles.container,
      display: 'flex'
    }}>
      <TouchableOpacity
        title={recording ? 'Stop Recording' : 'Start Recording'}
        style={{ margin: 0, backgroundColor: 'lightblue', padding: 7, }}
        onPress={recording ? stopRecording : startRecording}>
        <Text style={{ color: 'white' }}>{recording ? 'Stop Recording' :
          'Start Recording'}</Text>
      </TouchableOpacity>
      <Slider
        value={start ? runtime : 0}
        maximumValue={time}
        minimumValue={0}
        step={0.1}
        style={{ width: width, margin: 0 }}
        onSlidingComplete={() => setstart(false)}
        thumbTintColor={start ? 'green' : 'red'}
      />
      <Icon
        title={start ? 'pause' : 'play'}
        color='gray'
        size={40}
        name={start ? 'pause' : 'play'}
        onPress={playSound} />
    </View>
  )
}