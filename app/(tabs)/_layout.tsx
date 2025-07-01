import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="daily"
                options={{
                    title: 'Daily',
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="notes"
                options={{
                    title: 'Notes',
                    tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="reader/[book]/[chapter]"
                options={{
                    href: null, // ✅ hide this screen from tab bar
                }}
            />
        </Tabs>
    );
}
