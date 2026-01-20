/**
 * Add Item Form Component
 * Input form for adding new shopping list items
 */

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface Props {
  onAdd: (text: string) => void;
}

export const AddItemForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
      // Keep keyboard open for quick additions
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Add an item..."
        placeholderTextColor={colors.textMuted}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        autoCapitalize="sentences"
        autoCorrect
        accessibilityLabel="New item text"
        accessibilityHint="Enter the name of the item to add to your shopping list"
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!text.trim()}
        accessibilityLabel="Add item"
        accessibilityRole="button"
        accessibilityState={{ disabled: !text.trim() }}
      >
        <Text style={styles.buttonIcon}>+</Text>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.md,
    color: colors.text,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.sm,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonIcon: {
    color: colors.cardBackground,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  buttonText: {
    color: colors.cardBackground,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
