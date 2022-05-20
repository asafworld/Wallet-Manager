const editAction = (payload, id) => ({ type: 'edit', payload, id: id || 0 });

export default editAction;
