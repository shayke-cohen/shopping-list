/**
 * Footer Component
 * Shows item count and clear completed button
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface Props {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  const itemText = activeCount === 1 ? 'item' : 'items';

  return (
    <View style={styles.container}>
      <Text style={styles.count} accessibilityLabel={`${activeCount} ${itemText} left`}>
        {activeCount} {itemText} left
      </Text>
      <TouchableOpacity
        style={[styles.clearButton, completedCount === 0 && styles.clearButtonDisabled]}
        onPress={onClearCompleted}
        disabled={completedCount === 0}
        accessibilityLabel="Clear completed items"
        accessibilityRole="button"
        accessibilityState={{ disabled: completedCount === 0 }}
      >
        <Text
          style={[
            styles.clearButtonText,
            completedCount === 0 && styles.clearButtonTextDisabled,
          ]}
        >
          Clear completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    marginTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  count: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  clearButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  },
  clearButtonDisabled: {
    opacity: 0.5,
  },
  clearButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.danger,
  },
  clearButtonTextDisabled: {
    color: colors.textMuted,
  },
});
