import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/store/dataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMenu } from "@/api";
import { PayloadMenuDataType } from "@/Type/MenuType";
import { formatRupiah } from "@/helper/formatRupiah";
import HeadersTab from "@/components/HeadersTab";
import { useRouter } from "expo-router";

export default function MenuScreen() {
  const router = useRouter();

  const dataCtx = useContext(DataContext);
  const menuData = dataCtx?.menuData;

  const [filteredData, setFilteredData] = useState(menuData);

  const getAllMenu = async (show: number) => {
    try {
      const tokenType = await AsyncStorage.getItem("type");
      const tokenValue = await AsyncStorage.getItem("token");
      const data: PayloadMenuDataType = await getMenu(
        tokenType,
        tokenValue,
        show
      );
      if (data?.status === "success") {
        dataCtx?.setMenuData(data.result.categories);
      }
    //   return router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenu(1);
  }, []);

  const handleFilterChange = (category: string) => {
    const filtered = menuData?.filter(
      (item) => item.category_name === category
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView>
      <HeadersTab categories={menuData} onFilterChange={handleFilterChange} />
      <FlatList
        data={!filteredData?.length ? menuData : filteredData}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={{ padding: 15 }}>{item.category_name}</Text>

              <FlatList
                data={item.menu}
                renderItem={({ item: d }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        padding: 20,
                        borderBottomColor: "#c4c4c479",
                        borderBottomWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 20,
                          alignItems: "center",
                        }}
                      >
                        <View style={{ width: 50, height: 50 }}>
                          <Image
                            source={{ uri: d.photo }}
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={{ fontWeight: "700" }}>{d.name}</Text>
                          <Text style={{ maxWidth: 180, color: "#adadad" }}>
                            {d.description}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text>{formatRupiah(d.price)}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
