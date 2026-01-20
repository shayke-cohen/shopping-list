/**
 * Filter Bar Component
 * Filter buttons for All/Active/Completed views
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FilterType } from '../types';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface Props {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export const FilterBar: React.FC<Props> = ({ currentFilter, onFilterChange }) => {
  return (
    <View style={styles.container}>
      {FILTERS.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[styles.button, currentFilter === key && styles.buttonActive]}
          onPress={() => onFilterChange(key)}
          accessibilityLabel={`Filter by ${label}`}
          accessibilityRole="button"
          accessibilityState={{ selected: currentFilter === key }}
        >
          <Text
            style={[
              styles.buttonText,
              currentFilter === key && styles.buttonTextActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  buttonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  buttonTextActive: {
    color: colors.cardBackground,
  },
});
