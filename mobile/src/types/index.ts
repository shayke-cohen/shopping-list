/**
 * Shopping List Types
 */

export interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface ShoppingListState {
  items: ShoppingItem[];
  filter: FilterType;
}
