import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { supabase } from '../lib/supabase';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

export default function HomeScreen() {
  // ── State ────────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // ── Load tasks from Supabase on first render ─────────────
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not load tasks', text2: error.message });
      return;
    }

    setTasks(data ?? []);
  }

  // ── Handlers (Supabase CRUD) ─────────────────────────────

  async function handleSubmitTask(title) {
    const { error } = await supabase
      .from('tasks')
      .insert([{ title, completed: false }]);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not add task', text2: error.message });
      return;
    }

    setModalVisible(false);
    await loadTasks();
    Toast.show({ type: 'success', text1: 'Task added' });
  }

  async function handleToggleTask(item) {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !item.completed })
      .eq('id', item.id);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not update task', text2: error.message });
      return;
    }

    await loadTasks();
  }

  async function handleDeleteTask(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not delete task', text2: error.message });
      return;
    }

    await loadTasks();
    Toast.show({ type: 'success', text1: 'Task deleted' });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TaskFlow</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="task-alt" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Tap + to add your first task</Text>
          </View>
        }
      />

      {/* Add Task Modal */}
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#2E5BBA',
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#2E5BBA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2A44',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#5A6472',
    marginTop: 6,
  },
});
