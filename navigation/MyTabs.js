import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { w, h } from "react-native-responsiveness";
import { Icon } from "react-native-elements";
import Home from "../Screens/Home";
import Home2 from "../Screens/Home2";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Slider,
  TextInput,
  Platform,
} from "react-native";

import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const LIMIT_SCREEN = SCREEN_HEIGHT / 2;

const Tab = createBottomTabNavigator();

function MyTabs() {
  const TouchY = useSharedValue(0);
  const TouchX = useSharedValue(0);

  const GestureFunction = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = TouchX.value;
      context.translateY = TouchY.value;
    },
    onActive: (event, context) => {
      if (event.translationY >= 1) {
        event.translationY = 0;
        TouchX.value = event.translationX + context.translateX;
        TouchY.value = event.translationY + context.translateY;
      } else {
        TouchX.value = event.translationX + context.translateX;
        TouchY.value = event.translationY + context.translateY;
      }
    },

    onEnd: (event) => {
      if (event.translationY >= -LIMIT_SCREEN / 2) {
        TouchY.value = withTiming(0);
      } else {
        console.warn(event.translationY);
        TouchY.value = event.translationY;
        TouchY.value = withTiming(-SCREEN_HEIGHT * 0.8);
      }
    },
  });

  const MoveSlider = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: TouchY.value }],
      opacity: interpolate(TouchY.value, [1, -150], [1, 0]),
    };
  });

  const SlideBottomTab = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(TouchY.value, [-10, 0, 10], [10, 0, -5]),
        },
      ],
      opacity: interpolate(TouchY.value, [-5, 0, 5], [0.9, 1, 1]),
    };
  });

  const ScreenPlayerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            TouchY.value,
            [-900, 0, 10],
            [-SCREEN_HEIGHT * 1, 0, SCREEN_HEIGHT * 10]
          ),
        },
      ],
      opacity: interpolate(TouchY.value, [-50, 0, 220], [1, 1, 0]),
    };
  });

  const TopTabStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(TouchY.value, [-350, -750], [0, 1]),
    };
  });

  const MusicScreenSytle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(TouchY.value, [-300, -750], [0, 1]),
    };
  });

  return (
    <>
      {/* animation */}
      <PanGestureHandler onGestureEvent={GestureFunction}>
        {/* mini Player */}
        <Animated.View style={[styles.minPlayer, MoveSlider]}>
          {/* leftContainer */}
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require("../assets/eminem.jpeg")}
            />
          </View>
          {/* MidContainer */}
          <View style={styles.middleContainer}>
            <Text style={styles.txt} numberOfLines={1} ellipsizeMode={"tail"}>
              Love the way you Lie ft (Rihana)
            </Text>
            <Text style={styles.PlayText}>Air pods Connected </Text>
          </View>
          {/* RightContainer */}
          <View style={styles.RightConTainer}>
            <Icon name="bluetooth" type="ionicon" color="green" />
          </View>
          {/* RightContainer 2 */}
          <View style={styles.RightConTainer}>
            <Icon name="play" type="ionicon" color="white" />
          </View>
        </Animated.View>
        {/* mini Player */}
      </PanGestureHandler>

      {/* SCREEN PLAYER */}
      <Animated.View style={[styles.screenPlayer, ScreenPlayerStyles]}>
        {/* TopTab */}
        <Animated.View style={[styles.TopTab, TopTabStyle]}>
          <View style={styles.leftContainer}>
            <Icon name="chevron-down-outline" type="ionicon" color="white" />
          </View>
          <View style={styles.MiddleContainer}>
            <Text style={styles.LikedText}>Liked Song</Text>
          </View>
        </Animated.View>
        {/* TopTab */}

        <Animated.View style={[styles.MainMusicContainer, MusicScreenSytle]}>
          <Image
            style={styles.imges}
            source={require("../assets/eminem.jpeg")}
          />
          <Text numberOfLines={1} style={styles.StartupHeader}>
            Song: Love the way you Lie ft (Rihana)
          </Text>
          <Text style={styles.StartupHeader2}>Library: Recovery</Text>

          {/* slider */}
          <View
            style={{
              height: 40,
              width: "100%",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <Slider
              style={{ width: 300 }}
              step={1}
              minimumValue={18}
              maximumValue={71}
              value={18}
              minimumTrackTintColor={"green"}
              maximumTrackTintColor={"white"}
            />
          </View>
          {/* slider */}

          <View
            style={{
              width: "80%",
              height: "20%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: h("5%"),
              // backgroundColor: "red",
            }}
          >
            <Icon name="caret-back-outline" type="ionicon" color="white" />
            <Icon name="pause-sharp" type="ionicon" color="white" />
            <Icon name="caret-forward-outline" type="ionicon" color="white" />
          </View>
        </Animated.View>
      </Animated.View>
      {/* SCREEN PLAYER */}

      {/* Animtions */}
      <Animated.View
        style={[
          SlideBottomTab,
          {
            // backgroundColor: "red",
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: -2,
            flexDirection: "row",
          },
        ]}
      >
        {/* Tab Navigator */}
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#000",
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Dashbord"
            component={Home2}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
        {/* Tab Navigator */}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
  minPlayer: {
    backgroundColor: "#000",
    width: "100%",
    height: h("8%"),
    position: "absolute",
    bottom: Platform.OS === "ios" ? 75 : 50,
    left: 0,
    zIndex: 1,
    flexDirection: "row",
  },
  imgContainer: {
    width: "20%",
    height: "100%",
    // backgroundColor: "gold",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  middleContainer: {
    // backgroundColor: "red",
    width: "50%",
    height: "100%",
    justifyContent: "center",
    marginLeft: h("1%"),
  },
  txt: {
    color: "white",
    fontSize: h("1.7%"),
  },
  PlayText: {
    color: "green",
    fontSize: h("1.4%"),
  },
  RightConTainer: {
    // backgroundColor: "gold",
    width: "14%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  screenPlayer: {
    backgroundColor: "#000",
    width: "100%",
    height: h("100%"),
    position: "absolute",
    bottom: -SCREEN_HEIGHT / 1.2,
    left: 0,
    zIndex: -2,
    alignItems: "center",
  },
  TopTab: {
    backgroundColor: "black",
    width: "100%",
    height: h("9%"),
    borderBottomWidth: h("0.1%"),
    borderBottomColor: "#fff3",
    flexDirection: "row",
  },
  leftContainer: {
    // backgroundColor: "gold",
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  MiddleContainer: {
    // backgroundColor: "green",
    width: "55%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  LikedText: {
    color: "white",
    fontSize: h("2.2%"),
    fontWeight: "bold",
  },
  MainMusicContainer: {
    // backgroundColor: "white",
    width: "90%",
    height: h("70%"),
    alignItems: "center",
    paddingTop: h("10%"),
  },
  imges: {
    width: "80%",
    height: "50%",
    resizeMode: "contain",
  },
  StartupHeader: {
    color: "white",
    fontSize: h("2.0%"),
    fontWeight: "bold",
    marginTop: h("2%"),
  },
  StartupHeader2: {
    color: "white",
    fontSize: h("1.8%"),
    marginTop: h("1%"),
  },
  FlatlistContainer: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    zIndex: -2,
  },
  Header: {
    backgroundColor: "#000",
    width: "100%",
    height: h("7%"),
    borderBottomWidth: h("0.1%"),
    borderBottomColor: "#fff3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: h("2%"),
  },
  HText: {
    color: "white",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
  Searchbox: {
    // backgroundColor: "red",
    width: "100%",
    height: h("10%"),
    // marginBottom: h("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  Search: {
    backgroundColor: "white",
    width: "90%",
    height: h("6%"),
    borderRadius: h("100%"),
    overflow: "hidden",
    flexDirection: "row",
  },
  icon: {
    width: "20%",
    height: "100%",
    // backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    // backgroundColor: "red",
    width: "80%",
    height: "100%",
  },
  List1: {
    width: "100%",
    height: h("7%"),
    // backgroundColor: "red",
    flexDirection: "row",
    borderColor: "#fff3",
    borderWidth: h("0.2%"),
    alignItems: "center",
    // justifyContent: "center",
  },
  Listicon: {
    width: "20%",
    height: "100%",
    // backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "center",
  },
  Header2: {
    backgroundColor: "#000",
    width: "100%",
    height: h("7%"),
    borderBottomWidth: h("0.1%"),
    borderBottomColor: "#fff3",
    justifyContent: "center",
    alignItems: "center",
  },
  ftext: {
    color: "white",
    fontSize: h("2%"),
    fontWeight: "bold",
  },
});
export default MyTabs;
