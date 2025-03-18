import React from 'react';

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)} // Filtra se o valor não for vazio
      placeholder={`Filter ${column.id}`}
    />
  );
};
