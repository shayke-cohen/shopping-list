/**
 * Shopping List Hook
 * Manages shopping list state with AsyncStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingItem, FilterType } from '../types';

const STORAGE_KEY = 'shoppingList';

/**
 * Generate a unique ID for new items
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load items from AsyncStorage on mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setItems(JSON.parse(stored));
        }
      } catch (error) {
        console.warn('Failed to load items from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadItems();
  }, []);

  // Save items to AsyncStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      const saveItems = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
          console.warn('Failed to save items to storage:', error);
        }
      };
      saveItems();
    }
  }, [items, isLoading]);

  /**
   * Add a new item to the list
   */
  const addItem = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newItem: ShoppingItem = {
      id: generateId(),
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);
  }, []);

  /**
   * Toggle item completion status
   */
  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  /**
   * Delete an item from the list
   */
  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /**
   * Update item text
   */
  const updateItem = useCallback((id: string, newText: string) => {
    const trimmedText = newText.trim();
    if (!trimmedText) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: trimmedText } : item
      )
    );
  }, []);

  /**
   * Clear all completed items
   */
  const clearCompleted = useCallback(() => {
    setItems((prev) => prev.filter((item) => !item.completed));
  }, []);

  /**
   * Get filtered items based on current filter
   */
  const getFilteredItems = useCallback((): ShoppingItem[] => {
    switch (filter) {
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }, [items, filter]);

  /**
   * Get count of active (uncompleted) items
   */
  const activeCount = items.filter((item) => !item.completed).length;

  /**
   * Get count of completed items
   */
  const completedCount = items.filter((item) => item.completed).length;

  return {
    items,
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
  };
};
