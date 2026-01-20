/**
 * Shopping Item Component
 * Displays a single shopping list item with swipe-to-delete
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { ShoppingItem as ShoppingItemType } from '../types';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface Props {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = -80;

export const ShoppingItem: React.FC<Props> = ({
  item,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const translateX = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow left swipe (negative dx)
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          // Swipe far enough - delete
          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onDelete(item.id);
          });
        } else {
          // Snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 10,
          }).start();
        }
      },
    })
  ).current;

  const handleDoublePress = () => {
    setIsEditing(true);
    setEditText(item.text);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate(item.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(item.text);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Delete background */}
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>

      {/* Main item */}
      <Animated.View
        style={[styles.item, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggle(item.id)}
          accessibilityLabel={`Mark ${item.text} as ${item.completed ? 'incomplete' : 'complete'}`}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.completed }}
        >
          <View
            style={[
              styles.checkboxInner,
              item.completed && styles.checkboxChecked,
            ]}
          >
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        {/* Item text or edit input */}
        {isEditing ? (
          <TextInput
            ref={inputRef}
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={handleSaveEdit}
            onBlur={handleSaveEdit}
            returnKeyType="done"
            autoFocus
            selectTextOnFocus
            accessibilityLabel="Edit item text"
          />
        ) : (
          <TouchableOpacity
            style={styles.textContainer}
            onPress={handleDoublePress}
            accessibilityLabel={`${item.text}. Double tap to edit.`}
            accessibilityHint="Double tap to edit this item"
          >
            <Text
              style={[styles.text, item.completed && styles.textCompleted]}
              numberOfLines={2}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        )}

        {/* Delete button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
          accessibilityLabel={`Delete ${item.text}`}
          accessibilityRole="button"
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  deleteBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 100,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: spacing.lg,
    borderRadius: borderRadius.sm,
  },
  deleteText: {
    color: colors.cardBackground,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
    gap: spacing.md,
  },
  checkbox: {
    padding: spacing.xs,
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: colors.cardBackground,
    fontSize: 14,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  editInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.cardBackground,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 6,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 24,
    color: colors.textMuted,
    fontWeight: '300',
  },
});
