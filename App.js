import React from 'react';
import { AsyncStorage,Button, Image, View,ImagePickerIOS } from 'react-native';
import { ImagePicker,Permissions } from 'expo';

export default class ImagePickerExample extends React.Component {

  state = {
    image: null,
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
};

  render() {
    let {image} = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image&&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    const data = new FormData();
     data.append('username', 'ram simran');
     data.append('tagline', 'avatar');
     data.append('uploadImage', {
      uri : result.uri,
      type: result.type,
      name: "Hello Upload",
     });
     const config = {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
       },
       body: data,
      };
     fetch("http://192.168.201.69:3000/" + "upload-image", config)
      .then((checkStatusAndGetJSONResponse)=>{
        console.log(checkStatusAndGetJSONResponse);
        console.log("done");
      }).catch((err)=>{console.log(err)});

    console.log(result);


  };
}
