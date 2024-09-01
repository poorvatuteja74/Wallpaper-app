import { Dimensions } from "react-native";

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export const wp =percentage=> {
    const width = deviceWidth;
    return (percentage*width/100);
}

export const hp =percentage=> {
    const height = deviceHeight;
    return (percentage*height/100);
}

export const getColumnCount =()=>{

    if (deviceWidth>=1024){
        return 4;
    } else if (deviceWidth>=768){
        return 3;
    }
    else {
        return 2;
    }
}