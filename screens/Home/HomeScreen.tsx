import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Motif } from "@/theme/Images";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import QRCode from "react-qr-code";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import { getProfileHome } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadProfileType } from "@/Type/ProfileType";
import { DataContext } from "@/store/dataContext";
import { formatRupiah } from "@/helper/formatRupiah";

export default function HomeScreen() {
  const router = useRouter();
  const dataCtx = useContext(DataContext);
  const pagerViewRef = useRef<PagerView>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const getHomeData = async () => {
    try {
      const tokenType = await AsyncStorage.getItem("type");
      const tokenValue = await AsyncStorage.getItem("token");
      const data: PayloadProfileType = await getProfileHome(
        tokenType,
        tokenValue
      );

      console.log(data?.status);
      if (data?.status === "success" || data?.status) {
        dataCtx?.setProfileData(data.result);
      }
    //   return router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  const banners = dataCtx?.profileData?.banner;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <TabBarIcon name="close" color="black" size={42} />
          </Pressable>
          <View style={{ flexDirection: "column", gap: 20 }}>
            <Text>Show the QR Code below to the cashier</Text>
            <QRCode value="Hello" />
          </View>
        </View>
      </Modal>
      <View style={styles.homeContainer}>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={Motif}
            resizeMode="cover"
            style={styles.motifImage}
          >
            <View style={styles.card}>
              <Text>{dataCtx?.profileData?.greeting},</Text>
              <Text style={{ fontWeight: "800", marginTop: 10 }}>
                {dataCtx?.profileData?.name}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.barCode}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <TabBarIcon
                      name="qr-code-outline"
                      color="black"
                      size={42}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.hr} />
                <View style={styles.columnContent}>
                  <View style={styles.rowContent}>
                    <View>
                      <Text>Saldo</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "800" }}>
                        {formatRupiah(dataCtx?.profileData?.saldo || 0)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rowContent}>
                    <View>
                      <Text>Points</Text>
                    </View>
                    <View>
                      <Text style={{ color: "gray" }}>
                        {dataCtx?.profileData?.point}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ height: "40%", width: "100%" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#bbbbbb",
            }}
          >
            <PagerView
              ref={pagerViewRef}
              style={{
                flex: 1,
              }}
              initialPage={0}
              onPageSelected={onPageSelected}
            >
              {banners?.map((d) => {
                return (
                  <View style={styles.page} key="1">
                    <View style={{ width: "100%", height: "100%" }}>
                      <Image
                        source={{ uri: d }}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  </View>
                );
              })}
            </PagerView>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.paginationContainer}>
              {banners?.map((_, index) => (
                <View
                  key={index.toString()}
                  style={[
                    styles.paginationDot,
                    currentPage === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.clear();
                router.replace("/login");
              }}
            >
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    position: "relative",
  },
  motifImage: {
    height: 200,
    width: "100%",
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 30,
  },
  cardFooter: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
    marginTop: 10,
  },
  barCode: {
    flex: 0,
    borderRadius: 99,
  },
  hr: { height: "100%", width: 1, backgroundColor: "#aaaaaa46" },
  columnContent: {
    flex: 1,
    flexDirection: "column",
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },

  page: {
    justifyContent: "center",
    alignItems: "center",
  },

  // modal
  centeredView: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    right: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // Pagination
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#d1d1d1",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000000",
    width: 12,
    height: 12,
  },
});
