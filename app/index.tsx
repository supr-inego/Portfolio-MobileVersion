import React, { useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  Modal,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

type ThemeName = "night" | "neo";

type Theme = {
  name: ThemeName;
  bg: string;
  card: string;
  card2: string;
  text: string;
  subText: string;
  accent: string;
  border: string;
  buttonText: string;
  pillBg: string;
  pillBorder: string;
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  url: string;
};

export default function Index() {
  const scrollRef = useRef<ScrollView | null>(null);

  const [themeName, setThemeName] = useState<ThemeName>("night");
  const [toast, setToast] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [openInfo, setOpenInfo] = useState(true);
  const [openHobbies, setOpenHobbies] = useState(true);
  const [openGoals, setOpenGoals] = useState(true);
  const [openSkills, setOpenSkills] = useState(true);

  const [status, setStatus] = useState<"Studying" | "Gaming" | "Gym" | "Chill">("Studying");

  const theme: Theme = useMemo(() => {
    const night: Theme = {
      name: "night",
      bg: "#0f1115",
      card: "rgba(20,20,20,0.92)",
      card2: "rgba(26,28,34,0.92)",
      text: "#ffffff",
      subText: "rgba(255,255,255,0.75)",
      accent: "#57e6ff",
      border: "rgba(255,255,255,0.10)",
      buttonText: "#0f1115",
      pillBg: "rgba(87,230,255,0.12)",
      pillBorder: "rgba(87,230,255,0.28)",
    };

    const neo: Theme = {
      name: "neo",
      bg: "#070b12",
      card: "rgba(9,16,26,0.94)",
      card2: "rgba(12,22,34,0.94)",
      text: "#eaffff",
      subText: "rgba(234,255,255,0.72)",
      accent: "#4dffb5",
      border: "rgba(77,255,181,0.22)",
      buttonText: "#071016",
      pillBg: "rgba(77,255,181,0.14)",
      pillBorder: "rgba(77,255,181,0.28)",
    };

    return themeName === "night" ? night : neo;
  }, [themeName]);

  const info = {
    email: "cyrildayak03@gmail.com",
    phoneDisplay: "+639 6641 92876",
    phoneTel: "+63916708542",
    githubProfile: "https://github.com/supr-inego",
    githubRepo: "https://github.com/supr-inego/Portfolio-MobileVersion",
  };

  const projects: Project[] = [
    {
      title: "Portfolio Mobile Version",
      subtitle: "Expo / React Native",
      description:
        "A personal information mobile application built using Expo and React Native. It presents my profile, skills, hobbies, and projects in a clean and organized mobile interface.",
      tech: ["React Native", "Expo", "TypeScript"],
      url: info.githubRepo,
    },
  ];

  const skills = ["HTML (Beginner)", "CSS (Beginner)", "React Native (Beginner)"];

  const funFacts = [
    "I like random rides without a plan to clear my mind.",
    "I try to balance gaming and gym life.",
  ];

  const miniQuotes = ["One step at a time.", "Progress over perfection.", "Stay consistent.", "Small wins matter."];
  const [quote, setQuote] = useState(miniQuotes[0]);

  async function copy(label: string, value: string) {
    await Clipboard.setStringAsync(value);
    setToast(`${label} copied`);
    setTimeout(() => setToast(""), 1200);
  }

  async function open(url: string) {
    const can = await Linking.canOpenURL(url);
    if (can) await Linking.openURL(url);
  }

  function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.cardTitle, { color: theme.accent }]}>{title}</Text>
        <View style={{ gap: 10 }}>{children}</View>
      </View>
    );
  }

  function Row({ left, right }: { left: string; right: string }) {
    return (
      <View style={styles.row}>
        <Text style={[styles.rowLeft, { color: theme.subText }]}>{left}</Text>
        <Text style={[styles.rowRight, { color: theme.text }]}>{right}</Text>
      </View>
    );
  }

  function Btn({
    label,
    onPress,
    type = "primary",
  }: {
    label: string;
    onPress: () => void;
    type?: "primary" | "secondary";
  }) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          type === "primary"
            ? [styles.btn, { backgroundColor: theme.accent }]
            : [styles.btn2, { borderColor: theme.border }],
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text
          style={
            type === "primary"
              ? [styles.btnText, { color: theme.buttonText }]
              : [styles.btn2Text, { color: theme.text }]
          }
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  function Pill({ text }: { text: string }) {
    return (
      <View style={[styles.pill, { backgroundColor: theme.pillBg, borderColor: theme.pillBorder }]}>
        <Text style={[styles.pillText, { color: theme.text }]}>{text}</Text>
      </View>
    );
  }

  function CollapseHeader({
    title,
    open,
    onToggle,
  }: {
    title: string;
    open: boolean;
    onToggle: () => void;
  }) {
    return (
      <Pressable onPress={onToggle} style={styles.collapseHeader}>
        <Text style={[styles.collapseTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.collapseIcon, { color: theme.subText }]}>{open ? "–" : "+"}</Text>
      </Pressable>
    );
  }

  function StatusOption({ label }: { label: "Studying" | "Gaming" | "Gym" | "Chill" }) {
    const active = status === label;
    return (
      <Pressable
        onPress={() => setStatus(label)}
        style={[
          styles.statusOption,
          {
            borderColor: active ? theme.accent : theme.border,
            backgroundColor: active ? theme.pillBg : "transparent",
          },
        ]}
      >
        <Text style={{ color: active ? theme.text : theme.subText, fontSize: 12, fontWeight: "800" }}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        ref={(r) => (scrollRef.current = r)}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, { color: theme.text }]}>Cyril Inego Dayak</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]}>Professional yearner</Text>
          </View>

          <Pressable
            onPress={() => setThemeName((t) => (t === "night" ? "neo" : "night"))}
            style={[styles.themeBtn, { borderColor: theme.border }]}
          >
            <Text style={[styles.themeBtnText, { color: theme.text }]}>
              {theme.name === "night" ? "NEO" : "NIGHT"}
            </Text>
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={{ gap: 12 }}>
            <Image source={require("../assets/images/image.png")} style={styles.image} resizeMode="cover" />

            <Text style={[styles.text, { color: theme.subText }]}>
              Hi! I’m Cyril, a 21 year's old BSIT student who enjoys technology, gaming, gym workouts, and random rides.
              I’m improving my programming skills while balancing hobbies and academics.
            </Text>

            <View style={[styles.statusBox, { borderColor: theme.border, backgroundColor: theme.card2 }]}>
              <Text style={[styles.statusTitle, { color: theme.text }]}>Current Mode</Text>
              <Text style={[styles.statusValue, { color: theme.subText }]}>{status}</Text>

              <View style={styles.statusGrid}>
                <StatusOption label="Studying" />
                <StatusOption label="Gaming" />
                <StatusOption label="Gym" />
                <StatusOption label="Chill" />
              </View>
            </View>
          </View>
        </View>

        <Card title="Personal Information">
          <CollapseHeader title="Details" open={openInfo} onToggle={() => setOpenInfo((v) => !v)} />
          {openInfo ? (
            <View style={{ gap: 10 }}>
              <Row left="Birthday" right="August 12, 2004" />
              <Row left="Age" right="21 years old" />
              <Row left="Height" right={`5'8"`} />
              <Row left="Civil Status" right="Single" />
              <Row left="Nationality" right="Filipino" />
              <Row left="Course" right="BS Information Technology" />
              <Row left="School" right="USTP (3rd Year)" />
            </View>
          ) : null}
        </Card>

        <Card title="Hobbies & Interests">
          <CollapseHeader title="Show / Hide" open={openHobbies} onToggle={() => setOpenHobbies((v) => !v)} />
          {openHobbies ? (
            <View style={{ gap: 10 }}>
              <Pill text="Valorant" />
              <Pill text="Dota 2" />
              <Pill text="Crossfire" />
              <Pill text="Mobile Legends" />
              <Pill text="Random rides without a plan" />
              <Pill text="Webtoons" />
              <Pill text="Basketball" />
              <Pill text="Gym workouts" />
            </View>
          ) : null}
        </Card>

        <Card title="Goals">
          <CollapseHeader title="Show / Hide" open={openGoals} onToggle={() => setOpenGoals((v) => !v)} />
          {openGoals ? (
            <View style={{ gap: 10 }}>
              <Text style={[styles.text, { color: theme.text }]}>Short Term:</Text>
              <Text style={[styles.text, { color: theme.subText }]}>Graduate on time.</Text>

              <Text style={[styles.text, { color: theme.text, marginTop: 6 }]}>Long Term:</Text>
              <Text style={[styles.text, { color: theme.subText }]}>
                Earn a lot of money and travel across different countries.
              </Text>
            </View>
          ) : null}
        </Card>

        <Card title="Skills">
          <CollapseHeader title="Show / Hide" open={openSkills} onToggle={() => setOpenSkills((v) => !v)} />
          {openSkills ? (
            <View style={{ gap: 10 }}>
              {skills.map((s) => (
                <Pill key={s} text={s} />
              ))}
            </View>
          ) : null}
        </Card>

        <Card title="Fun Facts">
          {funFacts.map((f) => (
            <Text key={f} style={[styles.text, { color: theme.subText }]}>
              • {f}
            </Text>
          ))}

          <View style={[styles.quoteBox, { backgroundColor: theme.card2, borderColor: theme.border }]}>
            <Text style={[styles.quoteTitle, { color: theme.text }]}>Mini Motivation</Text>
            <Text style={[styles.text, { color: theme.subText }]}>{quote}</Text>
            <View style={{ marginTop: 10 }}>
              <Btn
                label="New Quote"
                onPress={() => setQuote(miniQuotes[Math.floor(Math.random() * miniQuotes.length)])}
                type="secondary"
              />
            </View>
          </View>
        </Card>

        <Card title="Projects">
          {projects.map((p) => (
            <Pressable
              key={p.title}
              onPress={() => setSelectedProject(p)}
              style={({ pressed }) => [
                styles.project,
                { backgroundColor: theme.card2, borderColor: theme.border },
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text style={[styles.projectTitle, { color: theme.text }]}>{p.title}</Text>
              <Text style={[styles.projectSub, { color: theme.subText }]}>{p.subtitle}</Text>
              <Text style={[styles.tap, { color: theme.subText }]}>Tap to view</Text>
            </Pressable>
          ))}
        </Card>

        <Card title="Contact">
          <View style={{ gap: 12 }}>
            <View style={[styles.contactBlock, { borderColor: theme.border, backgroundColor: theme.card2 }]}>
              <Row left="Email" right={info.email} />
              <View style={styles.actionRow}>
                <Btn label="Copy Email" onPress={() => copy("Email", info.email)} />
                <Btn label="Send Email" onPress={() => open(`mailto:${info.email}`)} type="secondary" />
              </View>
            </View>

            <View style={[styles.contactBlock, { borderColor: theme.border, backgroundColor: theme.card2 }]}>
              <Row left="Phone" right={info.phoneDisplay} />
              <View style={styles.actionRow}>
                <Btn label="Copy Phone" onPress={() => copy("Phone", info.phoneTel)} />
                <Btn label="Call" onPress={() => open(`tel:${info.phoneTel}`)} type="secondary" />
              </View>
            </View>

            <View style={[styles.contactBlock, { borderColor: theme.border, backgroundColor: theme.card2 }]}>
              <Row left="GitHub" right="supr-inego" />
              <View style={styles.actionRow}>
                <Btn label="Copy Link" onPress={() => copy("GitHub", info.githubProfile)} />
                <Btn label="Open GitHub" onPress={() => open(info.githubProfile)} type="secondary" />
              </View>
            </View>

            {toast ? <Text style={[styles.toast, { color: theme.subText }]}>{toast}</Text> : null}
          </View>
        </Card>

        <View style={{ height: 30 }} />
      </ScrollView>

      <Pressable
        onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
        style={[styles.fab, { backgroundColor: theme.accent }]}
      >
        <Text style={[styles.fabText, { color: theme.buttonText }]}>↑</Text>
      </Pressable>

      <Modal visible={!!selectedProject} transparent animationType="fade" onRequestClose={() => setSelectedProject(null)}>
        <Pressable style={styles.modalBg} onPress={() => setSelectedProject(null)}>
          <Pressable style={[styles.modal, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => null}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>{selectedProject?.title}</Text>
            <Text style={[styles.modalSub, { color: theme.subText }]}>{selectedProject?.subtitle}</Text>

            <Text style={[styles.modalBody, { color: theme.subText }]}>{selectedProject?.description}</Text>

            <View style={styles.modalTech}>
              {selectedProject?.tech.map((t) => (
                <View key={t} style={[styles.modalPill, { backgroundColor: theme.pillBg, borderColor: theme.pillBorder }]}>
                  <Text style={[styles.modalPillText, { color: theme.text }]}>{t}</Text>
                </View>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Btn label="Open GitHub" onPress={() => selectedProject?.url && open(selectedProject.url)} />
              <Btn label="Close" onPress={() => setSelectedProject(null)} type="secondary" />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16, gap: 14 },

  header: { paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 12 },
  name: { fontSize: 20, fontWeight: "800" },
  subtitle: { fontSize: 13, marginTop: 2 },

  themeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeBtnText: { fontSize: 12, fontWeight: "900", letterSpacing: 0.5 },

  card: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 14, fontWeight: "800", marginBottom: 10 },

  image: { width: "100%", height: 230, borderRadius: 12 },

  text: { fontSize: 13, lineHeight: 19 },

  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  rowLeft: { fontSize: 13 },
  rowRight: { fontSize: 13, fontWeight: "700", flexShrink: 1, textAlign: "right" },

  btn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  btnText: { fontWeight: "800", fontSize: 13 },

  btn2: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  btn2Text: { fontWeight: "800", fontSize: 13 },

  toast: { marginTop: 4, fontSize: 12 },

  pill: {
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  pillText: { fontSize: 12, fontWeight: "800" },

  collapseHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  collapseTitle: { fontSize: 13, fontWeight: "800" },
  collapseIcon: { fontSize: 18, fontWeight: "900" },

  statusBox: { borderWidth: 1, borderRadius: 12, padding: 12 },
  statusTitle: { fontSize: 13, fontWeight: "900" },
  statusValue: { fontSize: 12, marginTop: 3 },

  statusGrid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusOption: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  quoteBox: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 8 },
  quoteTitle: { fontSize: 13, fontWeight: "900", marginBottom: 6 },

  project: { padding: 12, borderRadius: 12, borderWidth: 1 },
  projectTitle: { fontWeight: "900", fontSize: 14 },
  projectSub: { fontSize: 12, marginTop: 2 },
  tap: { marginTop: 8, fontSize: 11 },

  contactBlock: { borderWidth: 1, borderRadius: 12, padding: 12 },
  actionRow: { flexDirection: "row", gap: 10, flexWrap: "wrap", marginTop: 10 },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 18,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: { fontSize: 16, fontWeight: "900" },

  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 20 },
  modal: { padding: 18, borderRadius: 16, borderWidth: 1 },

  modalTitle: { fontWeight: "900", fontSize: 16 },
  modalSub: { fontSize: 12, marginTop: 4 },
  modalBody: { fontSize: 13, marginTop: 14, lineHeight: 20 },

  modalTech: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 },
  modalPill: { borderWidth: 1, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  modalPillText: { fontSize: 12, fontWeight: "800" },

  modalButtons: { flexDirection: "row", gap: 12, flexWrap: "wrap", marginTop: 20 },
});