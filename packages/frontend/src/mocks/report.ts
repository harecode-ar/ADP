export const PROJECT_COUNT_BY_STATE = {
  new: 2,
  inProgress: 3,
  completed: 4,
  cancelled: 1,
  count: 10,
}

export const PROJECT_COST_BY_STATE = {
  new: PROJECT_COUNT_BY_STATE.new * 1000000,
  inProgress: PROJECT_COUNT_BY_STATE.inProgress * 1000000,
  completed: PROJECT_COUNT_BY_STATE.completed * 1000000,
  cancelled: PROJECT_COUNT_BY_STATE.cancelled * 1000000,
  count: PROJECT_COUNT_BY_STATE.count * 1000000,
}
