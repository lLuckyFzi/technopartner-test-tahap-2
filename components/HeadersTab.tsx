import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

interface HeaderProps {
  categories: any[] | null | undefined;
  onFilterChange: (category: string) => void;
}

const HeadersTab: React.FC<HeaderProps> = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories?.[0]
  );

  const handleCategoryPress = (category: string | undefined) => {
    setSelectedCategory(category!);
    onFilterChange(category!);
  };

  return (
    <View style={styles.headerContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tab,
              item?.category_name === selectedCategory && styles.activeTab,
            ]}
            onPress={() => handleCategoryPress(item?.category_name)}
          >
            <Text
              style={[
                styles.tabText,
                item?.category_name === selectedCategory &&
                  styles.activeTabText,
              ]}
            >
              {item?.category_name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.category_name!}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  tab: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#000000",
  },
  tabText: {
    color: "#757575",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "700",
  },
});

export default HeadersTab;
