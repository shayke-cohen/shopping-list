/**
 * Empty State Component
 * Displayed when the shopping list is empty
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.container} accessibilityLabel="Your shopping list is empty">
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>+</Text>
      </View>
      <Text style={styles.title}>Your shopping list is empty</Text>
      <Text style={styles.subtitle}>Add items above to get started</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl * 2,
    paddingHorizontal: spacing.xxl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 32,
    color: colors.border,
    fontWeight: '300',
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
