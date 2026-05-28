import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Index = () => {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<any>([]);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const isDark = darkMode;

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  function addNotes() {
    if (!title.trim() || !content.trim())
      return alert("Enter Title and content");

    const NewNotes = {
      id: Date.now().toString(),
      title,
      content,
      Date: new Date().toDateString(),
    };

    setList([...list, NewNotes]);
    setTitle("");
    setContent("");
  }

  function searchNote() {
    const filtered = list.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredList(filtered);
  }

  function deleteNotes(id: any) {
    setList(list.filter((item) => item.id !== id));
  }

  function editNote(item: any) {
    setTitle(item.title);
    setContent(item.content);
    setEditId(item.id);
  }

  function updateNotes() {
    setList(
      list.map((item) =>
        item.id === editId ? { ...item, title, content } : item
      )
    );

    setTitle("");
    setContent("");
    setEditId(null);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ✅ FIXED STATUS BAR */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        }}
        style={{ flex: 1 }}
        resizeMode="cover">
        {/* OVERLAY */}
        <View style={styles.overlay}>
          <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.heading}>BMW Notes</Text>

              <Switch value={darkMode} onValueChange={toggleTheme} />
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="Enter Note Title"
              placeholderTextColor="#aaa"
              value={title}
              onChangeText={setTitle}
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#222" : "#fff",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
            />

            <TextInput
              placeholder="Enter Note Content"
              placeholderTextColor="#aaa"
              value={content}
              onChangeText={setContent}
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#222" : "#fff",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
              multiline
            />

            {/* ADD / UPDATE */}
            <Pressable
              style={styles.addBtn}
              onPress={editId ? updateNotes : addNotes}>
              <Text style={styles.btnText}>
                {editId ? "Update Note" : "Add Note"}
              </Text>
            </Pressable>

            {/* SEARCH */}
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#aaa"
                value={search}
                onChangeText={setSearch}
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: isDark ? "#222" : "#fff",
                    color: isDark ? "#fff" : "#000",
                  },
                ]}
              />

              <Pressable style={styles.searchBtn} onPress={searchNote}>
                <Text style={styles.btnText}>Search</Text>
              </Pressable>
            </View>

            {/* LIST */}
            <FlatList
              data={filteredList.length > 0 ? filteredList : list}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 30 }}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.card,
                    { backgroundColor: isDark ? "#222" : "#fff" },
                  ]}>
                  <Text style={{ color: isDark ? "#fff" : "#111" }}>
                    {item.title}
                  </Text>

                  <Text style={{ color: "#888" }}>{item.content}</Text>

                  <Text style={{ color: "#888", fontSize: 12 }}>
                    {item.Date}
                  </Text>

                  <View style={styles.row}>
                    <Pressable
                      style={styles.editBtn}
                      onPress={() => editNote(item)}>
                      <Text style={styles.btnText}>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={styles.deleteBtn}
                      onPress={() => deleteNotes(item.id)}>
                      <Text style={styles.btnText}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)", // ✅ FIXED visibility
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  input: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  addBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  searchBox: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
  },

  searchBtn: {
    backgroundColor: "#10B981",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10,
  },

  card: {
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  editBtn: {
    flex: 1,
    backgroundColor: "#F59E0B",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
