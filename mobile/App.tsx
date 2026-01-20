/**
 * Shopping List React Native App
 * A mobile shopping list manager with gesture support
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ShoppingItem,
  AddItemForm,
  FilterBar,
  EmptyState,
  Footer,
} from './src/components';
import { useShoppingList } from './src/hooks/useShoppingList';
import { colors, spacing, borderRadius, fontSize } from './src/theme';
import { ShoppingItem as ShoppingItemType } from './src/types';

export default function App() {
  const {
    filter,
    setFilter,
    isLoading,
    addItem,
    toggleItem,
    deleteItem,
    updateItem,
    clearCompleted,
    getFilteredItems,
    activeCount,
    completedCount,
    items,
  } = useShoppingList();

  const filteredItems = getFilteredItems();

  const renderItem = ({ item }: { item: ShoppingItemType }) => (
    <ShoppingItem
      item={item}
      onToggle={toggleItem}
      onDelete={deleteItem}
      onUpdate={updateItem}
    />
  );

  if (isLoading) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.app}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Shopping List</Text>
              <Text style={styles.subtitle}>Keep track of what you need</Text>
            </View>

            {/* Main Content */}
            <View style={styles.main}>
              <AddItemForm onAdd={addItem} />
              <FilterBar currentFilter={filter} onFilterChange={setFilter} />

              {/* List or Empty State */}
              {filteredItems.length === 0 ? (
                <EmptyState />
              ) : (
                <FlatList
                  data={filteredItems}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  keyboardShouldPersistTaps="handled"
                />
              )}

              {/* Footer (only show if there are items) */}
              {items.length > 0 && (
                <Footer
                  activeCount={activeCount}
                  completedCount={completedCount}
                  onClearCompleted={clearCompleted}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  app: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  main: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.xxl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  listContent: {
    flexGrow: 1,
  },
});
