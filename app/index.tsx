import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
  Linking,
} from "react-native";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletSymbol}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function Button({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const programDescription =
    "I am currently taking Bachelor of Science in Information Technology (BSIT), a program that focuses on learning how computer systems and technology work in real-world applications. As a student, I study programming, web and mobile development, database management, networking, and system analysis. The course helps me develop problem-solving skills and logical thinking while building software and managing information systems. Through hands-on projects and practical activities, I gain experience in creating applications and technical solutions. This program prepares me to become a skilled IT professional capable of adapting to fast-changing technologies in today’s digital world. It builds my confidence for work.";

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.name}>Cyril Inego Dayak</Text>
          <Text style={styles.subtitle}>Bachelor of Science in Information Technology Student</Text>
        </View>

        <Section title="Profile Photo">
          <Image
            source={require("../assets/images/image.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </Section>

        <Section title="About Me">
          <Text style={styles.paragraph}>
            Hi! I’m Cyril Inego Dayak, a BSIT student who is interested in technology, learning,
            and improving my skills through practice and real projects.
          </Text>
        </Section>

        <Section title="Basic Information">
          <Bullet text="Age: 22" />
          <Bullet text="Course: BS Information Technology" />
          <Bullet text="School: USTP (3rd Year, 2023–Present)" />
        </Section>

        <Section title="Hobbies & Interests">
          <Bullet text="Long rides to relax and clear my mind" />
          <Bullet text="Reading comics and enjoying creative stories" />
          <Bullet text="Learning programming and technology" />
          <Bullet text="Casual gaming during free time" />
        </Section>

        <Section title="Contact">
          <Bullet text="Phone: +639 6641 92876" />
          <Bullet text="Email: cyrildayak03@gmail.com" />
          <View style={styles.buttonRow}>
            <Button
              label="GitHub"
              onPress={() => Linking.openURL("https://github.com/supr-inego")}
            />
            <Button
              label="Email"
              onPress={() => Linking.openURL("mailto:cyrildayak03@gmail.com")}
            />
          </View>
        </Section>

        <Section title="More About Me">
          <Bullet text="Born and raised in Malaybalay" />
          <Bullet text="Currently residing in Manolo San Miguel" />
          <Bullet text="Creative, friendly, and open to collaboration" />
        </Section>

        <Section title="Goals & Core Values">
          <Bullet text="Become a competent IT professional" />
          <Bullet text="Improve technical and personal skills" />
          <Bullet text="Discipline, respect, integrity, and growth mindset" />
        </Section>

        <Section title="Program Description">
          <Text style={styles.programText}>{programDescription}</Text>
        </Section>

        <View style={{ height: 18 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f1115" },
  container: { padding: 16, gap: 12 },

  header: { paddingVertical: 6 },
  name: { color: "#ffffff", fontSize: 20, fontWeight: "800" },
  subtitle: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 },

  card: {
    backgroundColor: "rgba(20,20,20,0.92)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 14,
  },
  cardTitle: {
    color: "#57e6ff",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
  },
  cardBody: { gap: 8 },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
  },

  paragraph: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 14,
    lineHeight: 20,
  },

  bulletRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  bulletSymbol: { color: "#57e6ff", fontWeight: "900", marginTop: 2 },
  bulletText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },

  buttonRow: { flexDirection: "row", gap: 10, marginTop: 6, flexWrap: "wrap" },
  button: {
    backgroundColor: "#57e6ff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#0f1115", fontWeight: "900", fontSize: 13 },

  programText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "justify",
  },
});
