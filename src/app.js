/**
 * Shopping List Application
 * A simple, elegant shopping list manager with local storage persistence
 */

class ShoppingList {
  constructor() {
    this.items = this.loadFromStorage();
    this.currentFilter = 'all';
    
    // DOM elements
    this.form = document.getElementById('addForm');
    this.input = document.getElementById('itemInput');
    this.list = document.getElementById('shoppingList');
    this.emptyState = document.getElementById('emptyState');
    this.footer = document.getElementById('footer');
    this.itemCount = document.getElementById('itemCount');
    this.clearBtn = document.getElementById('clearCompleted');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    
    this.bindEvents();
    this.render();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Add item form
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addItem();
    });

    // Clear completed button
    this.clearBtn.addEventListener('click', () => {
      this.clearCompleted();
    });

    // Filter buttons
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setFilter(btn.dataset.filter);
      });
    });

    // Delegate events for list items
    this.list.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const itemId = e.target.closest('.shopping-item').dataset.id;
        this.toggleItem(itemId);
      }
    });

    this.list.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-btn');
      if (deleteBtn) {
        const itemId = deleteBtn.closest('.shopping-item').dataset.id;
        this.deleteItem(itemId);
      }
    });

    // Double-click to edit item
    this.list.addEventListener('dblclick', (e) => {
      const itemText = e.target.closest('.item-text');
      if (itemText) {
        const itemElement = itemText.closest('.shopping-item');
        const itemId = itemElement.dataset.id;
        this.startEdit(itemId);
      }
    });
  }

  /**
   * Start editing an item
   */
  startEdit(id) {
    const item = this.items.find(item => item.id === id);
    if (!item) return;

    const itemElement = this.list.querySelector(`[data-id="${id}"]`);
    if (!itemElement) return;

    const textSpan = itemElement.querySelector('.item-text');
    if (!textSpan) return;

    // Create edit input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = item.text;
    
    // Replace text with input
    textSpan.style.display = 'none';
    textSpan.insertAdjacentElement('afterend', input);
    itemElement.classList.add('editing');
    
    // Focus and select all text
    input.focus();
    input.select();

    // Handle save on Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.saveEdit(id, input.value);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.cancelEdit(id);
      }
    });

    // Handle save on blur (click outside)
    input.addEventListener('blur', () => {
      // Small delay to allow for cancel action
      setTimeout(() => {
        if (itemElement.classList.contains('editing')) {
          this.saveEdit(id, input.value);
        }
      }, 100);
    });
  }

  /**
   * Save edited item text
   */
  saveEdit(id, newText) {
    const trimmedText = newText.trim();
    
    // Don't save empty text
    if (!trimmedText) {
      this.cancelEdit(id);
      return;
    }

    const item = this.items.find(item => item.id === id);
    if (item) {
      item.text = trimmedText;
      this.saveToStorage();
    }
    
    this.render();
  }

  /**
   * Cancel editing and restore original text
   */
  cancelEdit(id) {
    const itemElement = this.list.querySelector(`[data-id="${id}"]`);
    if (itemElement) {
      itemElement.classList.remove('editing');
      const input = itemElement.querySelector('.edit-input');
      const textSpan = itemElement.querySelector('.item-text');
      if (input) input.remove();
      if (textSpan) textSpan.style.display = '';
    }
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Add a new item to the list
   */
  addItem() {
    const text = this.input.value.trim();
    if (!text) return;

    const item = {
      id: this.generateId(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.items.unshift(item);
    this.saveToStorage();
    this.render();
    
    this.input.value = '';
    this.input.focus();
  }

  /**
   * Toggle item completion status
   */
  toggleItem(id) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.completed = !item.completed;
      this.saveToStorage();
      this.render();
    }
  }

  /**
   * Delete an item
   */
  deleteItem(id) {
    const itemElement = this.list.querySelector(`[data-id="${id}"]`);
    if (itemElement) {
      itemElement.style.animation = 'slideIn 0.2s ease reverse';
      setTimeout(() => {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToStorage();
        this.render();
      }, 200);
    }
  }

  /**
   * Clear all completed items
   */
  clearCompleted() {
    this.items = this.items.filter(item => !item.completed);
    this.saveToStorage();
    this.render();
  }

  /**
   * Set the current filter
   */
  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update active button
    this.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    this.render();
  }

  /**
   * Get filtered items based on current filter
   */
  getFilteredItems() {
    switch (this.currentFilter) {
      case 'active':
        return this.items.filter(item => !item.completed);
      case 'completed':
        return this.items.filter(item => item.completed);
      default:
        return this.items;
    }
  }

  /**
   * Render the shopping list
   */
  render() {
    const filteredItems = this.getFilteredItems();
    
    // Show/hide empty state
    if (filteredItems.length === 0) {
      this.list.innerHTML = '';
      this.emptyState.classList.add('visible');
    } else {
      this.emptyState.classList.remove('visible');
      this.list.innerHTML = filteredItems.map(item => this.renderItem(item)).join('');
    }

    // Update footer
    const activeCount = this.items.filter(item => !item.completed).length;
    const completedCount = this.items.filter(item => item.completed).length;
    
    if (this.items.length === 0) {
      this.footer.classList.add('hidden');
    } else {
      this.footer.classList.remove('hidden');
      this.itemCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
      this.clearBtn.disabled = completedCount === 0;
    }
  }

  /**
   * Render a single item
   */
  renderItem(item) {
    const escapedText = this.escapeHtml(item.text);
    return `
      <li class="shopping-item ${item.completed ? 'completed' : ''}" data-id="${item.id}">
        <label class="checkbox">
          <input type="checkbox" ${item.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <span class="item-text">${escapedText}</span>
        <button class="delete-btn" aria-label="Delete item">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </li>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Save items to local storage
   */
  saveToStorage() {
    try {
      localStorage.setItem('shoppingList', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  /**
   * Load items from local storage
   */
  loadFromStorage() {
    try {
      const data = localStorage.getItem('shoppingList');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
      return [];
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ShoppingList();
});
